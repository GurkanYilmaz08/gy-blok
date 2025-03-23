import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  published_at: string;
  author: {
    full_name: string;
  };
  category: {
    name: string;
  };
}

export function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from('articles')
        .select(`
          *,
          author:profiles(*),
          category:categories(*)
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;
      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Yükleniyor...</div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">Makale bulunamadı.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <span>{article.category?.name}</span>
            <span>•</span>
            <time dateTime={article.published_at}>
              {new Date(article.published_at).toLocaleDateString('tr-TR')}
            </time>
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            {article.title}
          </h1>
          <p className="text-xl text-gray-500 mb-6">
            {article.excerpt}
          </p>
          <div className="flex items-center">
            <div className="text-sm">
              <p className="text-gray-900 font-medium">{article.author?.full_name}</p>
            </div>
          </div>
        </header>

        <div className="prose prose-lg prose-indigo max-w-none">
          <div dangerouslySetInnerHTML={{ __html: article.content }} />
        </div>
      </article>
    </div>
  );
}