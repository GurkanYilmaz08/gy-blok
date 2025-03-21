import React from 'react';
import { Link } from 'react-router-dom';

const trendingArticles = [
  {
    id: 1,
    title: "ChatGPT ve Yapay Zeka: Geliştiriciler İçin Kapsamlı Rehber",
    excerpt: "ChatGPT ve modern yapay zeka teknolojilerinin yazılım geliştirme süreçlerine entegrasyonu.",
    category: "Yapay Zeka",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    date: "15 Mart 2024"
  },
  {
    id: 2,
    title: "Kubernetes ile Mikroservis Mimarisi",
    excerpt: "Modern uygulamaların ölçeklenebilir ve sürdürülebilir deployment stratejileri.",
    category: "DevOps",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9",
    date: "12 Mart 2024"
  },
  {
    id: 3,
    title: "React Performance Optimizasyonu",
    excerpt: "React uygulamalarında performans iyileştirme teknikleri ve best practices.",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
    date: "10 Mart 2024"
  },
  {
    id: 4,
    title: "TypeScript ile Güvenli Kod Yazımı",
    excerpt: "TypeScript'in güçlü tip sistemi ile daha güvenli ve sürdürülebilir kod geliştirme.",
    category: "Yazılım",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97",
    date: "8 Mart 2024"
  },
  {
    id: 5,
    title: "PostgreSQL Performans Optimizasyonu",
    excerpt: "Veritabanı sorgularının optimizasyonu ve indexleme stratejileri.",
    category: "Veritabanı",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d",
    date: "5 Mart 2024"
  },
  {
    id: 6,
    title: "Next.js 14 ile Modern Web Uygulamaları",
    excerpt: "Server components ve yeni özellikleri ile Next.js 14 rehberi.",
    category: "Frontend",
    image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec",
    date: "3 Mart 2024"
  },
  {
    id: 7,
    title: "Linux Sistem Güvenliği",
    excerpt: "Linux sunucularınızı güvende tutmak için kapsamlı güvenlik önlemleri.",
    category: "Sistem",
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97",
    date: "1 Mart 2024"
  },
  {
    id: 8,
    title: "Docker Container Güvenliği",
    excerpt: "Container güvenliği için best practices ve güvenlik önlemleri.",
    category: "DevOps",
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b",
    date: "28 Şubat 2024"
  },
  {
    id: 9,
    title: "Web API Tasarım Prensipleri",
    excerpt: "RESTful API tasarımında best practices ve güvenlik önlemleri.",
    category: "Backend",
    image: "https://images.unsplash.com/photo-1617042375876-a13e36732a04",
    date: "25 Şubat 2024"
  }
];

export function Articles() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">Makaleler</h1>
          <p className="mt-4 text-xl text-gray-500">Teknoloji, yazılım ve sistem yönetimi üzerine derinlemesine içerikler.</p>
        </div>

        {/* Categories */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button className="px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700">
            Tümü
          </button>
          <button className="px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-50 border border-gray-300">
            Yapay Zeka
          </button>
          <button className="px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-50 border border-gray-300">
            DevOps
          </button>
          <button className="px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-50 border border-gray-300">
            Frontend
          </button>
          <button className="px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-50 border border-gray-300">
            Backend
          </button>
          <button className="px-4 py-2 rounded-full bg-white text-gray-700 hover:bg-gray-50 border border-gray-300">
            Veritabanı
          </button>
        </div>

        {/* Articles Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {trendingArticles.map((article) => (
            <article key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={`${article.image}?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80`}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                    {article.category}
                  </span>
                  <span className="text-sm text-gray-500">{article.date}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {article.excerpt}
                </p>
                <Link
                  to={`/makaleler/${article.id}`}
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

        {/* Pagination */}
        <div className="mt-12 flex justify-center">
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Previous</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </a>
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              1
            </a>
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-50 text-sm font-medium text-indigo-600">
              2
            </a>
            <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              3
            </a>
            <a
              href="#"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}