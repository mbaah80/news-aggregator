import axios from 'axios'
import { NewsArticle, NewsSource } from '../types'

// Debug environment variables
// console.log('Environment variables loaded:', {
//   NEWS_API_KEY: !!import.meta.env.VITE_NEWS_API_KEY,
//   GUARDIAN_API_KEY: !!import.meta.env.VITE_GUARDIAN_API_KEY,
//   NYT_API_KEY: !!import.meta.env.VITE_NYT_API_KEY,
// })

// Get API keys from environment variables
const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;


// Helper function to check if API key is available
const checkApiKey = (key: string | undefined, serviceName: string): boolean => {
  if (!key) {
    //console.error(`Missing ${serviceName} API key. Please check your .env.local file.`)
    return false
  }
  return true
}

// NewsAPI service
export const fetchNewsApiArticles = async (
  query = '',
  category = '',
  from = '',
  to = '',
  sources = ''
): Promise<NewsArticle[]> => {
  if (!checkApiKey(NEWS_API_KEY, 'NEWS')) return []
  
  try {
    // Use top-headlines endpoint when category is specified
    const endpoint = category 
      ? 'https://newsapi.org/v2/top-headlines'
      : 'https://newsapi.org/v2/everything'

    const params: Record<string, string> = {
      apiKey: NEWS_API_KEY,
      language: 'en',
      pageSize: '20',
    }

    if (category && endpoint.includes('top-headlines')) {
      params.category = category
    } else {
      params.q = query || 'general'
    }

    if (from) params.from = from
    if (to) params.to = to
    if (sources) params.sources = sources

    const response = await axios.get(endpoint, { params })

    return response.data.articles.map((article: any) => ({
      id: article.url,
      title: article.title,
      description: article.description,
      content: article.content,
      url: article.url,
      imageUrl: article.urlToImage,
      publishedAt: article.publishedAt,
      source: {
        id: article.source.id,
        name: article.source.name,
      },
      author: article.author,
      category: category,
    }))
  } catch (error) {
    console.error('Error fetching from NewsAPI:', error)
    return []
  }
}

// Guardian API service
export const fetchGuardianArticles = async (
  query = '',
  category = '',
  from = '',
  to = ''
): Promise<NewsArticle[]> => {
  if (!checkApiKey(GUARDIAN_API_KEY, 'Guardian')) return []
  
  try {
    const params: Record<string, string> = {
      'show-fields': 'headline,byline,thumbnail,bodyText',
      'api-key': GUARDIAN_API_KEY,
      'page-size': '20',
    }
    
    if (query) params.q = query
    
    // Map common categories to Guardian sections
    const guardianSectionMap: Record<string, string> = {
      'business': 'business',
      'technology': 'technology',
      'sports': 'sport',
      'entertainment': 'culture',
      'politics': 'politics',
      'world': 'world',
      'science': 'science',
      'health': 'healthcare',
    }
    
    if (category && guardianSectionMap[category]) {
      params.section = guardianSectionMap[category]
    }
    
    if (from) params['from-date'] = from
    if (to) params['to-date'] = to
    
    const response = await axios.get('https://content.guardianapis.com/search', {
      params
    });

    return response.data.response.results.map((article: any) => ({
      id: article.id,
      title: article.webTitle,
      description: article.fields?.bodyText?.substring(0, 200) + '...',
      content: article.fields?.bodyText,
      url: article.webUrl,
      imageUrl: article.fields?.thumbnail,
      publishedAt: article.webPublicationDate,
      source: {
        id: 'the-guardian',
        name: 'The Guardian',
      },
      author: article.fields?.byline,
      category: article.sectionName,
    }))
  } catch (error) {
    console.error('Error fetching from Guardian API:', error)
    return []
  }
}

// New York Times API service
export const fetchNYTArticles = async (
  query = '',
  category = '',
  from = '',
  to = ''
): Promise<NewsArticle[]> => {
  if (!checkApiKey(NYT_API_KEY, 'New York Times')) return []
  
  try {
    const params: Record<string, string> = {
      'api-key': NYT_API_KEY,
    }
    
    // Combine query and category for NYT
    const queryParts = []
    if (query) queryParts.push(query)
    if (category) queryParts.push(category)
    params.q = queryParts.join(' ') || 'general'
    
    // Add category as a section filter if it matches NYT sections
    const nytSectionMap: Record<string, string> = {
      'business': 'Business',
      'technology': 'Technology',
      'sports': 'Sports',
      'entertainment': 'Arts',
      'politics': 'Politics',
      'world': 'World',
      'science': 'Science',
      'health': 'Health',
    }
    
    if (category && nytSectionMap[category]) {
      params.fq = `section_name:"${nytSectionMap[category]}"`
    }
    
    const response = await axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
      params
    });

    return response.data.response.docs.map((article: any) => ({
      id: article._id,
      title: article.headline.main,
      description: article.abstract,
      content: article.lead_paragraph,
      url: article.web_url,
      imageUrl: article.multimedia.length > 0 
        ? `https://www.nytimes.com/${article.multimedia[0].url}` 
        : null,
      publishedAt: article.pub_date,
      source: {
        id: 'new-york-times',
        name: 'The New York Times',
      },
      author: article.byline?.original?.replace('By ', ''),
      category: article.section_name,
    }))
  } catch (error) {
    console.error('Error fetching from NYT API:', error)
    return []
  }
}

// Function to fetch from all sources
export const fetchAllNews = async (
  query = '',
  category = '',
  from = '',
  to = '',
  sources: NewsSource[] = []
): Promise<NewsArticle[]> => {
  const sourcesToFetch = sources.length > 0 ? sources : ['newsapi', 'guardian', 'nyt']
  
  const results: NewsArticle[][] = [];
  
  // Use for...of to process sequentially instead of Promise.all
  for (const source of sourcesToFetch) {
    try {
      let articles: NewsArticle[] = [];
      
      if (source === 'newsapi') {
        articles = await fetchNewsApiArticles(query, category, from, to);
      } else if (source === 'guardian') {
        articles = await fetchGuardianArticles(query, category, from, to);
      } else if (source === 'nyt') {
        articles = await fetchNYTArticles(query, category, from, to);
      }
      
      results.push(articles);
      
      // Add a small delay between API calls
      await new Promise(resolve => setTimeout(resolve, 500));
    } catch (error) {
      console.error(`Error fetching from ${source}:`, error);
      results.push([]);
    }
  }
  
  return results.flat();
} 