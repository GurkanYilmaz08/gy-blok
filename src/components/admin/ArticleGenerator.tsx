import { useState } from 'react';
import { openai } from '../../lib/openai';
import { supabase } from '../../lib/supabase';
import slugify from 'slugify';

export function ArticleGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState('');

  const generateArticle = async () => {
    try {
      setIsGenerating(true);
      setStatus('Fetching categories...');

      const { data: categories } = await supabase
        .from('categories')
        .select('id, name');

      if (!categories?.length) {
        throw new Error('No categories found');
      }

      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      setStatus(`Generating article for category: ${randomCategory.name}...`);

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a technical writer specializing in IT, programming, and system administration."
          },
          {
            role: "user",
            content: `Write a technical article about ${randomCategory.name}.
              Include a title, main content, brief excerpt, SEO title, meta description, and keywords.
              The content should be detailed, informative, and suitable for a technical blog.`
          }
        ],
        response_format: { type: "json_object" }
      });

      const article = JSON.parse(completion.choices[0].message.content);
      setStatus('Saving article...');

      const { data: adminUser } = await supabase
        .from('profiles')
        .select('id')
        .single();

      if (!adminUser) {
        throw new Error('No admin user found');
      }

      const slug = slugify(article.title, { lower: true, strict: true });

      await supabase
        .from('articles')
        .insert({
          title: article.title,
          slug,
          content: article.content,
          excerpt: article.excerpt,
          category_id: randomCategory.id,
          author_id: adminUser.id,
          seo_title: article.seoTitle,
          seo_description: article.seoDescription,
          seo_keywords: article.seoKeywords,
          published_at: new Date().toISOString()
        });

      setStatus('Article generated and saved successfully!');
    } catch (error: unknown) {
      setStatus(`Error: ${error instanceof Error ? error.message : 'An unknown error occurred'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">AI Article Generator</h2>
      <p className="text-gray-600 mb-4">
        Generate a new article using AI. The article will be automatically categorized and optimized for SEO.
      </p>
      <button
        onClick={generateArticle}
        disabled={isGenerating}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 disabled:opacity-50"
      >
        {isGenerating ? 'Generating...' : 'Generate New Article'}
      </button>
      {status && (
        <p className="mt-4 text-sm text-gray-600">{status}</p>
      )}
    </div>
  );
}