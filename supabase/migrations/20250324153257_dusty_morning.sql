/*
  # Add initial blog categories and articles

  1. Changes
    - Add technology categories
    - Add SEO-optimized articles
    - Set proper metadata for search engines
*/

-- Insert categories if they don't exist
INSERT INTO categories (name, slug, description)
SELECT 'Yapay Zeka', 'yapay-zeka', 'Yapay zeka teknolojileri, makine öğrenimi ve derin öğrenme konuları'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'yapay-zeka');

INSERT INTO categories (name, slug, description)
SELECT 'Web Geliştirme', 'web-gelistirme', 'Modern web teknolojileri, frontend ve backend geliştirme'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'web-gelistirme');

INSERT INTO categories (name, slug, description)
SELECT 'Siber Güvenlik', 'siber-guvenlik', 'Siber güvenlik, ağ güvenliği ve güvenli yazılım geliştirme'
WHERE NOT EXISTS (SELECT 1 FROM categories WHERE slug = 'siber-guvenlik');

-- Insert articles
DO $$
DECLARE
  admin_id uuid;
  ai_category_id uuid;
  web_category_id uuid;
  security_category_id uuid;
BEGIN
  -- Get admin user ID
  SELECT id INTO admin_id FROM profiles WHERE full_name = 'Admin User' LIMIT 1;
  
  -- Get category IDs
  SELECT id INTO ai_category_id FROM categories WHERE slug = 'yapay-zeka' LIMIT 1;
  SELECT id INTO web_category_id FROM categories WHERE slug = 'web-gelistirme' LIMIT 1;
  SELECT id INTO security_category_id FROM categories WHERE slug = 'siber-guvenlik' LIMIT 1;

  -- Insert AI article
  INSERT INTO articles (
    title,
    slug,
    content,
    excerpt,
    category_id,
    author_id,
    featured_image,
    published_at,
    seo_title,
    seo_description,
    seo_keywords,
    views_count
  )
  SELECT
    'ChatGPT vs Claude: 2024 Yapay Zeka Asistanları Karşılaştırması',
    'chatgpt-vs-claude-2024-yapay-zeka-asistanlari-karsilastirmasi',
    '# ChatGPT vs Claude: 2024''te Hangi Yapay Zeka Asistanı Daha İyi?

## Giriş

Yapay zeka asistanları hayatımızın vazgeçilmez bir parçası haline geldi. Bu makalede, 2024''ün en popüler iki AI asistanı olan ChatGPT ve Claude''u detaylı bir şekilde karşılaştıracağız.

## Temel Özellikler

### ChatGPT
- GPT-4 tabanlı gelişmiş dil modeli
- Geniş kullanıcı tabanı ve topluluk desteği
- Çok sayıda entegrasyon seçeneği
- Code interpreter özelliği

### Claude
- Anthropic''in geliştirdiği Constitutional AI
- Daha uzun bağlam penceresi
- Gelişmiş analiz yetenekleri
- Daha şeffaf kaynak gösterimi

## Performans Karşılaştırması

### Doğal Dil İşleme
ChatGPT, günlük konuşma ve genel bilgi konularında üstün performans gösterirken, Claude teknik ve akademik konularda daha başarılı.

### Kodlama Yetenekleri
Her iki asistan da kod yazma ve hata ayıklama konusunda yetenekli, ancak ChatGPT''nin code interpreter özelliği ona bir adım öne çıkarıyor.

### Doğruluk ve Güvenilirlik
Claude, kaynak gösterme ve belirsizlikleri belirtme konusunda daha şeffaf bir yaklaşım sergiliyor.

## Kullanım Alanları

### İş Dünyası
- Doküman analizi
- Rapor yazımı
- Veri analizi
- Sunum hazırlama

### Eğitim
- Araştırma asistanı
- Öğrenme materyali oluşturma
- Soru-cevap desteği

### Yazılım Geliştirme
- Kod yazma yardımı
- Debug desteği
- Dokümantasyon oluşturma

## Maliyet Karşılaştırması

Her iki platform da farklı fiyatlandırma modelleri sunuyor:

- ChatGPT Plus: Aylık $20
- Claude Pro: Aylık $20
- API kullanımı: Token bazlı ücretlendirme

## Sonuç

Her iki asistanın da güçlü yanları var. ChatGPT genel kullanım ve kod geliştirme konularında öne çıkarken, Claude akademik ve analitik görevlerde daha başarılı. Seçiminizi kullanım amacınıza göre yapmanızı öneririz.',
    'ChatGPT ve Claude yapay zeka asistanlarının 2024 yılındaki özelliklerini, performanslarını ve kullanım alanlarını detaylı olarak karşılaştıran kapsamlı bir analiz.',
    ai_category_id,
    admin_id,
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1200',
    NOW(),
    'ChatGPT vs Claude Karşılaştırması 2024 - Hangi AI Asistanı Daha İyi?',
    'ChatGPT ve Claude yapay zeka asistanlarının 2024 karşılaştırması. Özellikler, performans, kullanım alanları ve fiyatlandırma detaylı analizi.',
    ARRAY['ChatGPT', 'Claude', 'yapay zeka', 'AI asistan', 'GPT-4', 'Anthropic', 'AI karşılaştırma', '2024 AI analizi'],
    0
  WHERE NOT EXISTS (
    SELECT 1 FROM articles WHERE slug = 'chatgpt-vs-claude-2024-yapay-zeka-asistanlari-karsilastirmasi'
  );

  -- Insert Web Development article
  INSERT INTO articles (
    title,
    slug,
    content,
    excerpt,
    category_id,
    author_id,
    featured_image,
    published_at,
    seo_title,
    seo_description,
    seo_keywords,
    views_count
  )
  SELECT
    'Next.js 14 vs React Server Components: 2024 Frontend Trendleri',
    'nextjs-14-vs-react-server-components-2024-frontend-trendleri',
    '# Next.js 14 ve React Server Components: 2024''ün Frontend Oyun Değiştiricileri

## Giriş

Modern web geliştirme dünyası sürekli evrim geçiriyor. Bu makalede, 2024''ün en önemli frontend teknolojileri olan Next.js 14 ve React Server Components''i derinlemesine inceleyeceğiz.

## Next.js 14''ün Yenilikleri

### Partial Prerendering
- Hibrit rendering stratejisi
- Dinamik içerik optimizasyonu
- Gelişmiş kullanıcı deneyimi

### Server Actions
- Form işlemleri için yeni API
- Mutations ve state yönetimi
- Progressive enhancement

### Turbopack İyileştirmeleri
- Daha hızlı development deneyimi
- Gelişmiş modül bundling
- Memory optimizasyonları

## React Server Components

### Temel Kavramlar
- Zero-bundle-size components
- Otomatik code splitting
- Streaming SSR

### Avantajları
- Daha küçük JavaScript bundle''lar
- Gelişmiş SEO performansı
- Daha hızlı Time to First Byte (TTFB)

### Kullanım Senaryoları
- Büyük ölçekli uygulamalar
- E-ticaret platformları
- İçerik odaklı web siteleri

## Performans Karşılaştırması

### Bundle Size
Next.js 14 ve RSC kullanımı ile bundle size''ları önemli ölçüde azalıyor:
- Traditional SPA: ~1MB
- Next.js 14 + RSC: ~100-200KB

### Sayfa Yüklenme Hızı
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Time to Interactive (TTI)

## SEO ve Core Web Vitals

### SEO Avantajları
- Server-side rendering
- Meta tag optimizasyonu
- Dinamik SEO stratejileri

### Core Web Vitals İyileştirmeleri
- LCP optimizasyonu
- FID (First Input Delay) azaltma
- CLS (Cumulative Layout Shift) minimizasyonu

## Geliştirici Deneyimi

### Next.js 14
- App Router
- Nested Layouts
- Error Handling
- Loading UI

### React Server Components
- Shared Component Logic
- Database Access
- API Integration
- State Management

## Best Practices ve Öneriler

### Proje Yapılandırması
- Folder structure
- Component organization
- Type safety
- Error boundaries

### Performance Optimization
- Image optimization
- Font loading
- Third-party script management
- Caching strategies

## Sonuç

Next.js 14 ve React Server Components, modern web geliştirme dünyasında önemli avantajlar sunuyor. Projenizin gereksinimlerine göre bu teknolojileri değerlendirip, en uygun çözümü seçmenizi öneririz.',
    'Next.js 14 ve React Server Components teknolojilerinin detaylı karşılaştırması, performans analizleri ve modern web geliştirmedeki rolleri hakkında kapsamlı bir inceleme.',
    web_category_id,
    admin_id,
    'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=1200',
    NOW(),
    'Next.js 14 ve React Server Components Karşılaştırması 2024 - Modern Frontend Teknolojileri',
    'Next.js 14 ve React Server Components''in 2024''teki yeniliklerini, performans karşılaştırmalarını ve kullanım senaryolarını inceleyen detaylı rehber.',
    ARRAY['Next.js', 'React', 'Server Components', 'Frontend', 'Web Development', '2024 trends', 'JavaScript', 'TypeScript'],
    0
  WHERE NOT EXISTS (
    SELECT 1 FROM articles WHERE slug = 'nextjs-14-vs-react-server-components-2024-frontend-trendleri'
  );

  -- Insert Security article
  INSERT INTO articles (
    title,
    slug,
    content,
    excerpt,
    category_id,
    author_id,
    featured_image,
    published_at,
    seo_title,
    seo_description,
    seo_keywords,
    views_count
  )
  SELECT
    '2024 Siber Güvenlik Trendleri: Zero Trust ve SASE Yaklaşımları',
    '2024-siber-guvenlik-trendleri-zero-trust-ve-sase-yaklasimlari',
    '# 2024 Siber Güvenlik Trendleri: Zero Trust ve SASE''nin Yükselişi

## Giriş

Siber güvenlik dünyası sürekli evrim geçiriyor. Bu makalede, 2024''ün en önemli siber güvenlik trendleri olan Zero Trust ve SASE (Secure Access Service Edge) yaklaşımlarını inceleyeceğiz.

## Zero Trust Mimarisi

### Temel Prensipler
- "Hiçbir şeye güvenme, her şeyi doğrula"
- Sürekli kimlik doğrulama
- En az yetki prensibi
- Mikro-segmentasyon

### Uygulama Alanları
- Uzaktan çalışma güvenliği
- Cloud security
- IoT device security
- Application security

## SASE (Secure Access Service Edge)

### Bileşenler
- SD-WAN
- Cloud Access Security Broker (CASB)
- Zero Trust Network Access (ZTNA)
- Firewall as a Service (FWaaS)
- Secure Web Gateway (SWG)

### Avantajları
- Merkezi yönetim
- Düşük gecikme süresi
- Ölçeklenebilirlik
- Maliyet optimizasyonu

## Modern Tehdit Ortamı

### Yaygın Tehditler
- Ransomware saldırıları
- Supply chain attacks
- Zero-day exploits
- Social engineering

### Savunma Stratejileri
- AI tabanlı tehdit tespiti
- Automated response
- Security awareness training
- Incident response planning

## Implementasyon Rehberi

### Zero Trust Geçişi
1. Varlık envanteri çıkarma
2. Segmentasyon planı
3. Kimlik doğrulama stratejisi
4. Monitoring ve logging
5. Politika yönetimi

### SASE Adaptasyonu
1. Network assessment
2. Cloud readiness
3. Security stack evaluation
4. Vendor selection
5. Phased deployment

## Best Practices

### Güvenlik Politikaları
- Access control
- Data classification
- Incident response
- Compliance requirements

### Monitoring ve Analitik
- SIEM integration
- User behavior analytics
- Network traffic analysis
- Threat intelligence

## Sonuç

Zero Trust ve SASE, modern siber güvenlik stratejilerinin temel taşları haline geldi. Organizasyonların bu yaklaşımları benimsemesi, siber tehditlere karşı daha güçlü bir savunma hattı oluşturmalarını sağlayacaktır.',
    '2024 yılının öne çıkan siber güvenlik trendleri Zero Trust ve SASE yaklaşımlarının detaylı analizi, implementasyon stratejileri ve best practice önerileri.',
    security_category_id,
    admin_id,
    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200',
    NOW(),
    '2024 Siber Güvenlik Trendleri - Zero Trust ve SASE Analizi | Güncel Güvenlik Yaklaşımları',
    '2024''ün öne çıkan siber güvenlik trendleri Zero Trust ve SASE''nin detaylı incelemesi. Implementasyon stratejileri ve best practice önerileri.',
    ARRAY['Siber Güvenlik', 'Zero Trust', 'SASE', 'Network Security', 'Cloud Security', '2024 trends', 'Security Architecture'],
    0
  WHERE NOT EXISTS (
    SELECT 1 FROM articles WHERE slug = '2024-siber-guvenlik-trendleri-zero-trust-ve-sase-yaklasimlari'
  );

END $$;