import { openai } from '../src/lib/openai';
import { supabase } from '../src/lib/supabase';
import slugify from 'slugify';
import cron from 'node-cron';

interface ArticleContent {
  title: string;
  content: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

async function generateArticleContent(category: string): Promise<ArticleContent> {
  const prompt = `Write a technical article about ${category}. 
    Include a title, main content, brief excerpt, SEO title, meta description, and keywords.
    The content should be detailed, informative, and suitable for a technical blog.
    Format the response as JSON with the following structure:
    {
      "title": "Article title",
      "content": "Full article content in markdown",
      "excerpt": "Brief excerpt",
      "seoTitle": "SEO-optimized title",
      "seoDescription": "Meta description",
      "seoKeywords": ["keyword1", "keyword2", ...]
    }`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a technical writer specializing in IT, programming, and system administration."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    response_format: { type: "json_object" }
  });

  return JSON.parse(completion.choices[0].message.content) as ArticleContent;
}

async function saveArticle(categoryId: string, article: ArticleContent) {
  const { data: adminUser } = await supabase
    .from('profiles')
    .select('id')
    .single();

  if (!adminUser) {
    throw new Error('No admin user found');
  }

  const slug = slugify(article.title, { lower: true, strict: true });

  const { error } = await supabase
    .from('articles')
    .insert({
      title: article.title,
      slug,
      content: article.content,
      excerpt: article.excerpt,
      category_id: categoryId,
      author_id: adminUser.id,
      seo_title: article.seoTitle,
      seo_description: article.seoDescription,
      seo_keywords: article.seoKeywords,
      published_at: new Date().toISOString()
    });

  if (error) {
    throw error;
  }
}

async function generateDailyArticle() {
  try {
    // Get random category
    const { data: categories } = await supabase
      .from('categories')
      .select('id, name');

    if (!categories?.length) {
      throw new Error('No categories found');
    }

    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    
    console.log(`Generating article for category: ${randomCategory.name}`);
    
    const article = await generateArticleContent(randomCategory.name);
    await saveArticle(randomCategory.id, article);
    
    console.log('Article generated and saved successfully');
  } catch (error) {
    console.error('Error generating article:', error);
  }
}

// Schedule article generation for 3 AM every day
cron.schedule('0 3 * * *', generateDailyArticle);

// Run immediately if executed directly
if (require.main === module) {
  generateDailyArticle();
}