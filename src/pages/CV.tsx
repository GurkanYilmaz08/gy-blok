//import React, { useState } from 'react';
import { useState } from 'react';
import { ChevronDown, ChevronUp, Download, Printer, Mail, Phone, MapPin, Globe, Building2, Calendar, Award, BookOpen, Code, Server, Database } from 'lucide-react';

interface ExperienceItem {
  id: number;
  company: string;
  position: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
  isExpanded: boolean;
}

export function CV() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([
    {
      id: 1,
      company: "XYZ Teknoloji",
      position: "Kıdemli Yazılım Geliştirici & DevOps Uzmanı",
      period: "2020 - Günümüz",
      description: "Mikroservis mimarisi ve cloud-native uygulamalar geliştirme konusunda uzmanlaşmış ekip lideri.",
      achievements: [
        "Mikroservis mimarisine geçiş projesini başarıyla yönettim",
        "CI/CD pipeline'larını modernize ederek deployment süresini %60 azalttım",
        "Kubernetes cluster yönetimi ve optimizasyonu",
        "10 kişilik geliştirici ekibine teknik mentörlük"
      ],
      technologies: ["Kubernetes", "Docker", "AWS", "Azure", "Node.js", "React", "PostgreSQL", "MongoDB"],
      isExpanded: false
    },
    {
      id: 2,
      company: "ABC Yazılım",
      position: "Full Stack Geliştirici",
      period: "2017 - 2020",
      description: "E-ticaret platformu geliştirme ve optimizasyon çalışmaları.",
      achievements: [
        "Yüksek trafikli e-ticaret platformunun geliştirilmesi",
        "Sistem performansında %40 iyileştirme",
        "Mikroservis mimarisine geçiş planlaması",
        "RESTful API tasarımı ve implementasyonu"
      ],
      technologies: ["Vue.js", "Node.js", "PostgreSQL", "Redis", "Docker", "AWS"],
      isExpanded: false
    }
  ]);

  const toggleExpand = (id: number) => {
    setExperiences(experiences.map(exp => 
      exp.id === id ? { ...exp, isExpanded: !exp.isExpanded } : exp
    ));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Replace with actual CV file URL
    const cvUrl = '/cv.pdf';
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'gurkan-yilmaz-cv.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Gürkan Yılmaz</h1>
              <p className="text-xl text-indigo-600 mt-2">Kıdemli Yazılım Geliştirici & DevOps Uzmanı</p>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-gray-600">
                  <Mail className="h-5 w-5 mr-2" />
                  <span>iletisim@gurkanyilmaz.com</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>+90 (555) 123 4567</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>İstanbul, Türkiye</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Globe className="h-5 w-5 mr-2" />
                  <span>www.gurkanyilmaz.com</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleDownload}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <Download className="h-5 w-5 mr-2" />
                İndir
              </button>
              <button
                onClick={handlePrint}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Printer className="h-5 w-5 mr-2" />
                Yazdır
              </button>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Profesyonel Özet</h2>
          <p className="text-gray-600 leading-relaxed">
            10+ yıllık deneyime sahip, modern web teknolojileri ve DevOps pratiklerinde uzmanlaşmış kıdemli yazılım geliştirici. 
            Mikroservis mimarisi, konteynerizasyon ve CI/CD süreçlerinde derin bilgi ve deneyim sahibi. 
            AWS ve Azure sertifikalı cloud uzmanı, büyük ölçekli projelerde teknik liderlik deneyimi.
          </p>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Teknik Yetenekler</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center text-gray-800 font-semibold">
                <Code className="h-5 w-5 mr-2 text-indigo-600" />
                Frontend
              </div>
              <ul className="ml-7 space-y-1 text-gray-600">
                <li>React</li>
                <li>Vue.js</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-gray-800 font-semibold">
                <Server className="h-5 w-5 mr-2 text-indigo-600" />
                Backend
              </div>
              <ul className="ml-7 space-y-1 text-gray-600">
                <li>Node.js</li>
                <li>Express</li>
                <li>NestJS</li>
                <li>GraphQL</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-gray-800 font-semibold">
                <Database className="h-5 w-5 mr-2 text-indigo-600" />
                Veritabanı
              </div>
              <ul className="ml-7 space-y-1 text-gray-600">
                <li>PostgreSQL</li>
                <li>MongoDB</li>
                <li>Redis</li>
                <li>Elasticsearch</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Experience Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">İş Deneyimi</h2>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id} className="border rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <Building2 className="h-5 w-5 text-indigo-600 mr-2" />
                      <h3 className="text-xl font-semibold text-gray-900">{exp.company}</h3>
                    </div>
                    <p className="text-lg text-indigo-600 mt-1">{exp.position}</p>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleExpand(exp.id)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {exp.isExpanded ? (
                      <ChevronUp className="h-6 w-6" />
                    ) : (
                      <ChevronDown className="h-6 w-6" />
                    )}
                  </button>
                </div>
                <p className="text-gray-600 mt-4">{exp.description}</p>
                {exp.isExpanded && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Başarılar</h4>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {exp.achievements.map((achievement, index) => (
                          <li key={index}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Teknolojiler</h4>
                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Education Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Eğitim</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <BookOpen className="h-5 w-5 text-indigo-600 mr-4 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Bilgisayar Mühendisliği</h3>
                <p className="text-gray-600">İstanbul Teknik Üniversitesi</p>
                <p className="text-gray-500">2013 - 2017</p>
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Section */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sertifikalar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: "AWS Certified Solutions Architect Professional",
                issuer: "Amazon Web Services",
                date: "2023"
              },
              {
                title: "Microsoft Certified: Azure Solutions Architect",
                issuer: "Microsoft",
                date: "2022"
              },
              {
                title: "Certified Kubernetes Administrator (CKA)",
                issuer: "Cloud Native Computing Foundation",
                date: "2022"
              },
              {
                title: "Professional Scrum Master I (PSM I)",
                issuer: "Scrum.org",
                date: "2021"
              }
            ].map((cert, index) => (
              <div key={index} className="flex items-start">
                <Award className="h-5 w-5 text-indigo-600 mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900">{cert.title}</h3>
                  <p className="text-gray-600">{cert.issuer}</p>
                  <p className="text-gray-500">{cert.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}