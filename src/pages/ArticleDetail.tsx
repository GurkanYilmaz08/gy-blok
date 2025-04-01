import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { marked } from 'marked';

interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  published_at: string;
  seo_title: string;
  seo_description: string;
  seo_keywords: string[];
  featured_image: string;
  author: {
    full_name: string;
  };
  category: {
    name: string;
    slug: string;
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
          author:profiles(full_name),
          category:categories(name, slug)
        `)
        .eq('slug', slug)
        .single();

      if (error) throw error;

      // Update view count
      if (data) {
        await supabase
          .from('articles')
          .update({ views_count: (data.views_count || 0) + 1 })
          .eq('id', data.id);
      }

      setArticle(data);
    } catch (error) {
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (article?.seo_title) {
      document.title = article.seo_title;
      
      // Update meta tags
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', article.seo_description || '');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = article.seo_description || '';
        document.head.appendChild(meta);
      }

      // Update keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', article.seo_keywords?.join(', ') || '');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'keywords';
        meta.content = article.seo_keywords?.join(', ') || '';
        document.head.appendChild(meta);
      }
    }
  }, [article]);

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
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Image */}
        {article.featured_image && (
          <div className="mb-8 rounded-xl overflow-hidden">
            <img
              src={article.featured_image}
              alt={article.title}
              className="w-full h-[400px] object-cover"
            />
          </div>
        )}

        <header className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">
              {article.category?.name}
            </span>
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

        <div 
          className="prose prose-lg prose-indigo max-w-none"
          dangerouslySetInnerHTML={{ __html: marked(article.content) }}
        />
      </article>
    </div>
  );
}