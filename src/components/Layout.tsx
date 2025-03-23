import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold text-gray-900">GY Blog</Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-gray-900 font-medium">Ana Sayfa</Link>
              <Link to="/makaleler" className="text-gray-700 hover:text-gray-900 font-medium">Makaleler</Link>
              <Link to="/hakkimda" className="text-gray-700 hover:text-gray-900 font-medium">Hakkımda</Link>
              <Link to="/cv" className="text-gray-700 hover:text-gray-900 font-medium">CV</Link>
              <Link to="/iletisim" className="text-gray-700 hover:text-gray-900 font-medium">İletişim</Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-500 hover:text-gray-900 p-2 rounded-md"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">Ana Sayfa</Link>
              <Link to="/makaleler" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">Makaleler</Link>
              <Link to="/hakkimda" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">Hakkımda</Link>
              <Link to="/cv" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">CV</Link>
              <Link to="/iletisim" className="block px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md">İletişim</Link>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-gray-500 transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500 transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500 transition-colors">
              <Mail className="h-6 w-6" />
            </a>
          </div>
          <div className="mt-8 text-center">
            <p className="text-gray-500">&copy; 2024 GY Blog. Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}