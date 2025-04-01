import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';
import { Save, ArrowLeft } from 'lucide-react';

interface Profile {
  full_name: string;
  title: string;
  bio: string;
  avatar_url: string;
  social_links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export function Settings() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const [profile, setProfile] = useState<Profile>({
    full_name: '',
    title: '',
    bio: '',
    avatar_url: '',
    social_links: {}
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }
    fetchProfile();
  }, [isAuthenticated, navigate]);

  const fetchProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profile) {
      setProfile({
        full_name: profile.full_name || '',
        title: profile.title || '',
        bio: profile.bio || '',
        avatar_url: profile.avatar_url || '',
        social_links: profile.social_links || {}
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveMessage('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Kullanıcı bulunamadı');

      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.full_name,
          title: profile.title,
          bio: profile.bio,
          avatar_url: profile.avatar_url,
          social_links: profile.social_links
        })
        .eq('id', user.id);

      if (error) throw error;
      setSaveMessage('Ayarlar başarıyla kaydedildi');
    } catch (error) {
      setSaveMessage('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => navigate('/admin')}
              className="mr-4 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">Ayarlar</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg">
          <div className="p-6 space-y-6">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                Ad Soyad
              </label>
              <input
                type="text"
                id="full_name"
                value={profile.full_name}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Ünvan
              </label>
              <input
                type="text"
                id="title"
                value={profile.title}
                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                Biyografi
              </label>
              <textarea
                id="bio"
                rows={4}
                value={profile.bio}
                onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="avatar_url" className="block text-sm font-medium text-gray-700">
                Profil Fotoğrafı URL
              </label>
              <input
                type="url"
                id="avatar_url"
                value={profile.avatar_url}
                onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Sosyal Medya Bağlantıları</h3>
              
              <div>
                <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                  GitHub
                </label>
                <input
                  type="url"
                  id="github"
                  value={profile.social_links.github || ''}
                  onChange={(e) => setProfile({
                    ...profile,
                    social_links: { ...profile.social_links, github: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                  LinkedIn
                </label>
                <input
                  type="url"
                  id="linkedin"
                  value={profile.social_links.linkedin || ''}
                  onChange={(e) => setProfile({
                    ...profile,
                    social_links: { ...profile.social_links, linkedin: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="twitter" className="block text-sm font-medium text-gray-700">
                  Twitter
                </label>
                <input
                  type="url"
                  id="twitter"
                  value={profile.social_links.twitter || ''}
                  onChange={(e) => setProfile({
                    ...profile,
                    social_links: { ...profile.social_links, twitter: e.target.value }
                  })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-50 rounded-b-lg flex items-center justify-between">
            {saveMessage && (
              <p className={`text-sm ${saveMessage.includes('hata') ? 'text-red-600' : 'text-green-600'}`}>
                {saveMessage}
              </p>
            )}
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <Save className="h-5 w-5 mr-2" />
              {isSaving ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}