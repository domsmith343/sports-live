// NFL API Service - Handles multiple data sources
export interface NFLAPIConfig {
  apiKey?: string;
  baseUrl?: string;
  timeout?: number;
}

export interface APIGame {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  status: 'scheduled' | 'live' | 'final' | 'postponed' | 'cancelled';
  quarter?: string;
  timeRemaining?: string;
  startTime: string;
  venue?: string;
  tvChannel?: string;
  keyEvents?: string[];
}

export interface APITeamStanding {
  team: string;
  wins: number;
  losses: number;
  ties: number;
  winPercentage: number;
  gamesBack: number;
  conference: string;
  division: string;
}

export interface APIStatLeader {
  category: string;
  players: {
    name: string;
    team: string;
    value: string;
    detail?: string;
  }[];
}

export interface APINewsArticle {
  id: string;
  headline: string;
  summary: string;
  source: string;
  timestamp: string;
  imageUrl?: string;
  articleUrl?: string;
}

class NFLAPIService {
  private config: NFLAPIConfig;
  private cache: Map<string, { data: any; timestamp: number }> = new Map();
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  constructor(config: NFLAPIConfig = {}) {
    this.config = {
      timeout: 10000,
      ...config
    };
  }

  private async makeRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.config.baseUrl || 'https://api.example.com'}${endpoint}`;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...(this.config.apiKey && { 'Authorization': `Bearer ${this.config.apiKey}` }),
          ...options.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('API request error:', error);
      throw error;
    }
  }

  private getCachedData(key: string): any | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data;
    }
    return null;
  }

  private setCachedData(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  // ESPN API Integration
  async getESPNGames(week?: number): Promise<APIGame[]> {
    const cacheKey = `espn_games_${week || 'current'}`;
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      // ESPN API endpoint for NFL games
      const endpoint = week 
        ? `/sports/football/nfl/scoreboard?week=${week}`
        : '/sports/football/nfl/scoreboard';
      
      const data = await this.makeRequest(endpoint);
      
      const games: APIGame[] = data.events?.map((event: any) => ({
        id: event.id,
        homeTeam: event.competitions[0]?.competitors?.find((c: any) => c.homeAway === 'home')?.team?.abbreviation,
        awayTeam: event.competitions[0]?.competitors?.find((c: any) => c.homeAway === 'away')?.team?.abbreviation,
        homeScore: parseInt(event.competitions[0]?.competitors?.find((c: any) => c.homeAway === 'home')?.score || '0'),
        awayScore: parseInt(event.competitions[0]?.competitors?.find((c: any) => c.homeAway === 'away')?.score || '0'),
        status: this.mapESPNStatus(event.status?.type?.state),
        quarter: event.status?.type?.description,
        timeRemaining: event.status?.type?.description,
        startTime: event.date,
        venue: event.competitions[0]?.venue?.fullName,
        tvChannel: event.competitions[0]?.broadcasts?.[0]?.media?.shortName,
      })) || [];

      // If no games returned, use demo data
      if (games.length === 0) {
        console.log('No games returned from ESPN API, using demo data');
        const { demoGames } = await import('./demo-data');
        this.setCachedData(cacheKey, demoGames);
        return demoGames;
      }

      this.setCachedData(cacheKey, games);
      return games;
    } catch (error) {
      console.error('ESPN API error:', error);
      console.log('Falling back to demo data for games');
      const { demoGames } = await import('./demo-data');
      return demoGames;
    }
  }

  // ESPN Standings
  async getESPNStandings(): Promise<APITeamStanding[]> {
    const cacheKey = 'espn_standings';
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const data = await this.makeRequest('/sports/football/nfl/standings');
      
      const standings: APITeamStanding[] = data.groups?.flatMap((group: any) =>
        group.standings?.map((standing: any) => ({
          team: standing.team?.abbreviation,
          wins: standing.stats?.find((s: any) => s.name === 'wins')?.value || 0,
          losses: standing.stats?.find((s: any) => s.name === 'losses')?.value || 0,
          ties: standing.stats?.find((s: any) => s.name === 'ties')?.value || 0,
          winPercentage: parseFloat(standing.stats?.find((s: any) => s.name === 'winPercent')?.value || '0'),
          gamesBack: parseFloat(standing.stats?.find((s: any) => s.name === 'gamesBack')?.value || '0'),
          conference: group.name,
          division: group.name,
        }))
      ) || [];

      // If no standings returned, use demo data
      if (standings.length === 0) {
        console.log('No standings returned from ESPN API, using demo data');
        const { demoStandings } = await import('./demo-data');
        this.setCachedData(cacheKey, demoStandings);
        return demoStandings;
      }

      this.setCachedData(cacheKey, standings);
      return standings;
    } catch (error) {
      console.error('ESPN Standings API error:', error);
      console.log('Falling back to demo data for standings');
      const { demoStandings } = await import('./demo-data');
      return demoStandings;
    }
  }

  // ESPN Stats Leaders
  async getESPNStatLeaders(): Promise<APIStatLeader[]> {
    const cacheKey = 'espn_stat_leaders';
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      const categories = ['passing', 'rushing', 'receiving'];
      const leaders: APIStatLeader[] = [];

      for (const category of categories) {
        const data = await this.makeRequest(`/sports/football/nfl/statistics?category=${category}`);
        
        const categoryLeaders: APIStatLeader = {
          category: this.formatCategoryName(category),
          players: data.leaders?.slice(0, 5).map((leader: any) => ({
            name: leader.athlete?.displayName,
            team: leader.athlete?.team?.abbreviation,
            value: this.formatStatValue(category, leader),
            detail: this.formatStatDetail(category, leader),
          })) || []
        };

        leaders.push(categoryLeaders);
      }

      // If no leaders returned, use demo data
      if (leaders.length === 0 || leaders.every(l => l.players.length === 0)) {
        console.log('No stat leaders returned from ESPN API, using demo data');
        const { demoStatLeaders } = await import('./demo-data');
        this.setCachedData(cacheKey, demoStatLeaders);
        return demoStatLeaders;
      }

      this.setCachedData(cacheKey, leaders);
      return leaders;
    } catch (error) {
      console.error('ESPN Stats API error:', error);
      console.log('Falling back to demo data for stat leaders');
      const { demoStatLeaders } = await import('./demo-data');
      return demoStatLeaders;
    }
  }

  // News API (using a sports news API)
  async getNewsArticles(): Promise<APINewsArticle[]> {
    const cacheKey = 'news_articles';
    const cached = this.getCachedData(cacheKey);
    if (cached) return cached;

    try {
      // Using NewsAPI for sports news
      const data = await this.makeRequest('/v2/everything?q=NFL&language=en&sortBy=publishedAt&pageSize=10');
      
      const articles: APINewsArticle[] = data.articles?.map((article: any) => ({
        id: article.url,
        headline: article.title,
        summary: article.description,
        source: article.source?.name || 'Unknown',
        timestamp: this.formatTimestamp(article.publishedAt),
        imageUrl: article.urlToImage,
        articleUrl: article.url,
      })) || [];

      // If no articles returned, use demo data
      if (articles.length === 0) {
        console.log('No news articles returned from API, using demo data');
        const { demoNews } = await import('./demo-data');
        this.setCachedData(cacheKey, demoNews);
        return demoNews;
      }

      this.setCachedData(cacheKey, articles);
      return articles;
    } catch (error) {
      console.error('News API error:', error);
      console.log('Falling back to demo data for news');
      const { demoNews } = await import('./demo-data');
      return demoNews;
    }
  }

  // Helper methods
  private mapESPNStatus(state: string): APIGame['status'] {
    switch (state) {
      case 'pre': return 'scheduled';
      case 'in': return 'live';
      case 'post': return 'final';
      case 'postponed': return 'postponed';
      case 'cancelled': return 'cancelled';
      default: return 'scheduled';
    }
  }

  private formatCategoryName(category: string): string {
    switch (category) {
      case 'passing': return 'Passing Yards';
      case 'rushing': return 'Rushing Yards';
      case 'receiving': return 'Receiving Yards';
      default: return category;
    }
  }

  private formatStatValue(category: string, leader: any): string {
    switch (category) {
      case 'passing':
        return `${leader.stats?.find((s: any) => s.name === 'passingYards')?.value || 0} YDS`;
      case 'rushing':
        return `${leader.stats?.find((s: any) => s.name === 'rushingYards')?.value || 0} YDS`;
      case 'receiving':
        return `${leader.stats?.find((s: any) => s.name === 'receivingYards')?.value || 0} YDS`;
      default:
        return '0';
    }
  }

  private formatStatDetail(category: string, leader: any): string {
    switch (category) {
      case 'passing':
        const tds = leader.stats?.find((s: any) => s.name === 'passingTouchdowns')?.value || 0;
        const ints = leader.stats?.find((s: any) => s.name === 'interceptions')?.value || 0;
        return `${tds} TDs, ${ints} INTs`;
      case 'rushing':
        const rushTds = leader.stats?.find((s: any) => s.name === 'rushingTouchdowns')?.value || 0;
        const ypc = leader.stats?.find((s: any) => s.name === 'yardsPerCarry')?.value || 0;
        return `${rushTds} TDs, ${ypc} YPC`;
      case 'receiving':
        const recTds = leader.stats?.find((s: any) => s.name === 'receivingTouchdowns')?.value || 0;
        const rec = leader.stats?.find((s: any) => s.name === 'receptions')?.value || 0;
        return `${rec} rec, ${recTds} TDs`;
      default:
        return '';
    }
  }

  private formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return '1 day ago';
    return `${Math.floor(diffInHours / 24)} days ago`;
  }

  // Fallback to placeholder data if API fails
  async getFallbackData() {
    const { getLiveGames, getLeagueStandings, getLeagueLeaders, getNewsArticles } = await import('../placeholder-data');
    
    return {
      games: getLiveGames(),
      standings: getLeagueStandings(),
      leaders: getLeagueLeaders(),
      news: getNewsArticles(),
    };
  }
}

// Create singleton instance
export const nflAPI = new NFLAPIService({
  baseUrl: process.env.NEXT_PUBLIC_NFL_API_URL || 'https://site.api.espn.com/apis',
  apiKey: process.env.NEXT_PUBLIC_NFL_API_KEY,
  timeout: 10000,
});

export default nflAPI; 