import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  slug: string;
  published_at: string | null;
}

export function Admin() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const logout = useAuthStore(state => state.logout);
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
    fetchArticles();
  }, [isAuthenticated, navigate]);

  const fetchArticles = async () => {
    const { data } = await supabase
      .from('articles')
      .select('id, title, slug, published_at')
      .order('created_at', { ascending: false });
    
    if (data) {
      setArticles(data);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Yönetim Paneli</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Çıkış Yap
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Makaleler</h2>
            <button
              onClick={() => navigate('/admin/articles/new')}
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              Yeni Makale
            </button>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {articles.map((article) => (
                <li key={article.id}>
                  <div className="px-4 py-4 flex items-center justify-between sm:px-6">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {article.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {article.published_at 
                          ? `Yayınlandı: ${new Date(article.published_at).toLocaleDateString('tr-TR')}`
                          : 'Taslak'}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => navigate(`/admin/articles/${article.id}`)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm('Bu makaleyi silmek istediğinizden emin misiniz?')) {
                            await supabase
                              .from('articles')
                              .delete()
                              .eq('id', article.id);
                            fetchArticles();
                          }
                        }}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}