import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: {
    name: string;
  };
  featured_image: string;
  published_at: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
}

export function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchArticles();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('name');
    
    if (data) {
      setCategories(data);
    }
  };

  const fetchArticles = async () => {
    let query = supabase
      .from('articles')
      .select(`
        *,
        category:categories(*)
      `)
      .not('published_at', 'is', null)
      .order('published_at', { ascending: false });

    if (selectedCategory) {
      query = query.eq('category_id', selectedCategory);
    }

    const { data } = await query;
    
    if (data) {
      setArticles(data);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Makaleler</h1>
          <p className="mt-4 text-xl text-gray-500">
            Teknoloji, yazılım ve sistem yönetimi üzerine derinlemesine içerikler.
          </p>
        </div>

        {/* Categories */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full ${
              !selectedCategory
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
            }`}
          >
            Tümü
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === category.id
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={article.featured_image || 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {article.category?.name}
                  </span>
                  <span className="text-sm text-gray-500">
                    {new Date(article.published_at).toLocaleDateString('tr-TR')}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {article.excerpt}
                </p>
                <Link
                  to={`/makaleler/${article.slug}`}
                  className="text-indigo-600 hover:text-indigo-500 font-medium inline-flex items-center"
                >
                  Devamını Oku
                  <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </article>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center mt-12">
            <p className="text-gray-500">Bu kategoride henüz makale bulunmuyor.</p>
          </div>
        )}
      </div>
    </div>
  );
}