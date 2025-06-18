import { nflAPI } from './nfl-api';
import { DataAdapter } from './data-adapter';
import { config } from '../config';
import type { Game, DivisionStanding, StatLeader, NewsArticle } from '../placeholder-data';

export interface DataServiceConfig {
  useRealData: boolean;
  fallbackToPlaceholder: boolean;
  cacheDuration: number;
}

class DataService {
  private config: DataServiceConfig;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();

  constructor(serviceConfig: DataServiceConfig = {
    useRealData: config.api.useRealData,
    fallbackToPlaceholder: config.dataService.fallbackToPlaceholder,
    cacheDuration: config.dataService.cacheDuration,
  }) {
    this.config = serviceConfig;
  }

  // Get all data with error handling and fallbacks
  async getAllData() {
    try {
      if (!this.config.useRealData) {
        console.log('Using placeholder data (real data disabled)');
        return await this.getPlaceholderData();
      }

      console.log('Fetching real data from APIs...');
      const [games, standings, leaders, news] = await Promise.allSettled([
        this.getGames(),
        this.getStandings(),
        this.getStatLeaders(),
        this.getNews(),
      ]);

      const result = {
        liveGames: games.status === 'fulfilled' ? games.value : await this.getPlaceholderGames(),
        leagueStandings: standings.status === 'fulfilled' ? standings.value : await this.getPlaceholderStandings(),
        leagueLeaders: leaders.status === 'fulfilled' ? leaders.value : await this.getPlaceholderLeaders(),
        newsArticles: news.status === 'fulfilled' ? news.value : await this.getPlaceholderNews(),
      };

      // Log which data sources were successful
      console.log('Data fetch results:', {
        games: games.status,
        standings: standings.status,
        leaders: leaders.status,
        news: news.status,
      });

      return result;
    } catch (error) {
      console.error('Data service error:', error);
      
      if (this.config.fallbackToPlaceholder) {
        console.log('Falling back to placeholder data');
        return await this.getPlaceholderData();
      }
      
      throw error;
    }
  }

  // Get games data
  async getGames(): Promise<Game[]> {
    const cacheKey = 'games';
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      console.log('Using cached games data');
      return cached;
    }

    try {
      console.log('Fetching games from ESPN API...');
      const apiGames = await nflAPI.getESPNGames();
      const games = DataAdapter.transformGames(apiGames);
      
      this.setCachedData(cacheKey, games);
      console.log(`Successfully fetched ${games.length} games`);
      return games;
    } catch (error) {
      console.error('Failed to fetch games:', error);
      if (this.config.fallbackToPlaceholder) {
        console.log('Falling back to placeholder games');
        return await this.getPlaceholderGames();
      }
      throw error;
    }
  }

  // Get standings data
  async getStandings(): Promise<DivisionStanding[]> {
    const cacheKey = 'standings';
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      console.log('Using cached standings data');
      return cached;
    }

    try {
      console.log('Fetching standings from ESPN API...');
      const apiStandings = await nflAPI.getESPNStandings();
      const standings = DataAdapter.transformStandings(apiStandings);
      
      this.setCachedData(cacheKey, standings);
      console.log(`Successfully fetched ${standings.length} division standings`);
      return standings;
    } catch (error) {
      console.error('Failed to fetch standings:', error);
      if (this.config.fallbackToPlaceholder) {
        console.log('Falling back to placeholder standings');
        return await this.getPlaceholderStandings();
      }
      throw error;
    }
  }

  // Get stat leaders data
  async getStatLeaders(): Promise<StatLeader[]> {
    const cacheKey = 'leaders';
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      console.log('Using cached stat leaders data');
      return cached;
    }

    try {
      console.log('Fetching stat leaders from ESPN API...');
      const apiLeaders = await nflAPI.getESPNStatLeaders();
      const leaders = DataAdapter.transformStatLeaders(apiLeaders);
      
      this.setCachedData(cacheKey, leaders);
      console.log(`Successfully fetched ${leaders.length} stat categories`);
      return leaders;
    } catch (error) {
      console.error('Failed to fetch stat leaders:', error);
      if (this.config.fallbackToPlaceholder) {
        console.log('Falling back to placeholder stat leaders');
        return await this.getPlaceholderLeaders();
      }
      throw error;
    }
  }

  // Get news data
  async getNews(): Promise<NewsArticle[]> {
    const cacheKey = 'news';
    const cached = this.getCachedData(cacheKey);
    if (cached) {
      console.log('Using cached news data');
      return cached;
    }

    try {
      console.log('Fetching news from API...');
      const apiNews = await nflAPI.getNewsArticles();
      const news = DataAdapter.transformNews(apiNews);
      
      this.setCachedData(cacheKey, news);
      console.log(`Successfully fetched ${news.length} news articles`);
      return news;
    } catch (error) {
      console.error('Failed to fetch news:', error);
      if (this.config.fallbackToPlaceholder) {
        console.log('Falling back to placeholder news');
        return await this.getPlaceholderNews();
      }
      throw error;
    }
  }

  // Placeholder data fallbacks
  private async getPlaceholderData() {
    const { getLiveGames, getLeagueStandings, getLeagueLeaders, getNewsArticles } = await import('../placeholder-data');
    
    return {
      liveGames: getLiveGames(),
      leagueStandings: getLeagueStandings(),
      leagueLeaders: getLeagueLeaders(),
      newsArticles: getNewsArticles(),
    };
  }

  private async getPlaceholderGames(): Promise<Game[]> {
    const { getLiveGames } = await import('../placeholder-data');
    return getLiveGames();
  }

  private async getPlaceholderStandings(): Promise<DivisionStanding[]> {
    const { getLeagueStandings } = await import('../placeholder-data');
    return getLeagueStandings();
  }

  private async getPlaceholderLeaders(): Promise<StatLeader[]> {
    const { getLeagueLeaders } = await import('../placeholder-data');
    return getLeagueLeaders();
  }

  private async getPlaceholderNews(): Promise<NewsArticle[]> {
    const { getNewsArticles } = await import('../placeholder-data');
    return getNewsArticles();
  }

  // Cache management
  private getCachedData(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.config.cacheDuration) {
      return cached.data;
    }
    return null;
  }

  private setCachedData(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  // Clear cache
  clearCache(): void {
    this.cache.clear();
    console.log('Cache cleared');
  }

  // Update configuration
  updateConfig(newConfig: Partial<DataServiceConfig>): void {
    this.config = { ...this.config, ...newConfig };
    console.log('Data service config updated:', this.config);
  }

  // Get current configuration
  getConfig(): DataServiceConfig {
    return { ...this.config };
  }

  // Get cache status
  getCacheStatus(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys()),
    };
  }
}

// Create singleton instance
export const dataService = new DataService({
  useRealData: config.api.useRealData,
  fallbackToPlaceholder: config.dataService.fallbackToPlaceholder,
  cacheDuration: config.dataService.cacheDuration,
});

export default dataService; 