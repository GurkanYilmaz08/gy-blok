import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Home() {
  return (
    <>
      {/* Hero Section with About Me */}
      <div className="relative bg-white overflow-hidden border-b">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:flex lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 lg:flex-1">
              <div className="sm:text-center lg:text-left">
                <h2 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Bilişim Dünyasına</span>
                  <span className="block text-indigo-600">Teknolojik Bir Bakış</span>
                </h2>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Yazılım, donanım ve sistem yönetimi konularında güncel bilgiler, pratik çözümler ve derinlemesine teknik makaleler.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/makaleler"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                    >
                      Makaleleri Keşfet
                    </Link>
                  </div>
                </div>
              </div>
            </main>
            
            {/* About Me Section */}
            <div className="lg:w-96 mt-10 lg:mt-0 px-4 sm:px-6 lg:px-8">
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
                <div className="flex flex-col items-center">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt="Gürkan Yılmaz"
                    className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-indigo-100"
                  />
                  <h3 className="text-xl font-bold text-gray-900">Gürkan Yılmaz</h3>
                  <p className="text-sm text-gray-500 mt-1">Yazılım Geliştirici</p>
                  <div className="mt-4 text-center">
                    <p className="text-gray-600">
                      20+ yıllık deneyimle yazılım/proje geliştirme, sistem yönetimi ve veritabanı optimizasyonu alanlarında uzmanlaşmış bir teknoloji tutkunuyum.
                    </p>
                  </div>
                  <div className="mt-6 flex space-x-4">
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      <Github className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Articles Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Son Makaleler</h2>
            <p className="mt-4 text-lg text-gray-500">En son yayınlanan teknik içerikler ve rehberler.</p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Article Card 1 */}
            <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="text-sm font-medium text-indigo-600">SQL</div>
                <div className="mt-2">
                  <p className="text-xl font-semibold text-gray-900">SQL Veritabanı Optimizasyonu</p>
                  <p className="mt-3 text-gray-500">Veritabanı performansını artırmak için pratik ipuçları ve best practice önerileri.</p>
                </div>
                <div className="mt-6">
                  <Link to="/makaleler/sql-veritabani-optimizasyonu" className="text-indigo-600 hover:text-indigo-500 font-medium">
                    Devamını Oku →
                  </Link>
                </div>
              </div>
            </div>

            {/* Article Card 2 */}
            <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="text-sm font-medium text-indigo-600">Sistem</div>
                <div className="mt-2">
                  <p className="text-xl font-semibold text-gray-900">Linux Sunucu Güvenliği</p>
                  <p className="mt-3 text-gray-500">Linux sunucularınızı güvende tutmak için temel güvenlik önlemleri.</p>
                </div>
                <div className="mt-6">
                  <Link to="/makaleler/linux-sunucu-guvenligi" className="text-indigo-600 hover:text-indigo-500 font-medium">
                    Devamını Oku →
                  </Link>
                </div>
              </div>
            </div>

            {/* Article Card 3 */}
            <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-100 hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="text-sm font-medium text-indigo-600">Yazılım</div>
                <div className="mt-2">
                  <p className="text-xl font-semibold text-gray-900">React Hooks Kullanımı</p>
                  <p className="mt-3 text-gray-500">Modern React uygulamalarında hooks kullanımı ve best practices.</p>
                </div>
                <div className="mt-6">
                  <Link to="/makaleler/react-hooks-kullanimi" className="text-indigo-600 hover:text-indigo-500 font-medium">
                    Devamını Oku →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}