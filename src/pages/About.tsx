import React from 'react';
import { Github, Linkedin, Mail, Code, Database, Server } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Hakkımda
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Teknoloji tutkunu bir yazılım geliştirici
          </p>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                className="h-96 w-full object-cover md:w-96"
                src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&q=80"
                alt="Gürkan Yılmaz çalışma ortamı"
              />
            </div>
            <div className="p-8">
              <div className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                Yazılım Geliştirici
              </div>
              <h2 className="mt-2 text-3xl font-bold text-gray-900">
                Gürkan Yılmaz
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                10+ yıllık deneyimle yazılım geliştirme, sistem yönetimi ve veritabanı optimizasyonu alanlarında uzmanlaşmış bir teknoloji tutkunuyum. Modern web teknolojileri, bulut sistemleri ve DevOps pratikleri konularında sürekli kendimi geliştirmeye odaklanıyorum.
              </p>

              {/* Skills Section */}
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Uzmanlık Alanları</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Code className="h-6 w-6 text-indigo-600" />
                    <span className="text-gray-700">Web Geliştirme</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Database className="h-6 w-6 text-indigo-600" />
                    <span className="text-gray-700">Veritabanı</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <Server className="h-6 w-6 text-indigo-600" />
                    <span className="text-gray-700">DevOps</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-8 flex space-x-4">
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  <Github className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  <Linkedin className="h-6 w-6" />
                </a>
                <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                  <Mail className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Deneyim</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900">Teknik Yetenekler</h3>
              <ul className="mt-4 space-y-2">
                <li className="text-gray-600">• React, Vue.js, Node.js</li>
                <li className="text-gray-600">• PostgreSQL, MongoDB</li>
                <li className="text-gray-600">• Docker, Kubernetes</li>
                <li className="text-gray-600">• AWS, Azure</li>
                <li className="text-gray-600">• CI/CD, Git</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900">Eğitim & Sertifikalar</h3>
              <ul className="mt-4 space-y-2">
                <li className="text-gray-600">• Bilgisayar Mühendisliği, XYZ Üniversitesi</li>
                <li className="text-gray-600">• AWS Certified Solutions Architect</li>
                <li className="text-gray-600">• Microsoft Certified: Azure Developer</li>
                <li className="text-gray-600">• Docker Certified Associate</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}