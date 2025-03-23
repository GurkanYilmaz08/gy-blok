import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Articles } from './pages/Articles';
import { ArticleDetail } from './pages/ArticleDetail';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { CV } from './pages/CV';
import { Admin } from './pages/Admin';
import { AdminLogin } from './pages/AdminLogin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="makaleler" element={<Articles />} />
          <Route path="makaleler/:slug" element={<ArticleDetail />} />
          <Route path="hakkimda" element={<About />} />
          <Route path="cv" element={<CV />} />
          <Route path="iletisim" element={<Contact />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;