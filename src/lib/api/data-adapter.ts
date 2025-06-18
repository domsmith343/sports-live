import type { Game, DivisionStanding, StatLeader, NewsArticle, Team } from '../placeholder-data';
import type { APIGame, APITeamStanding, APIStatLeader, APINewsArticle } from './nfl-api';
import { getTeamData } from '../team-data';

export class DataAdapter {
  // Transform API games to app format
  static transformGames(apiGames: APIGame[]): Game[] {
    return apiGames.map(apiGame => {
      const homeTeam = this.createTeamFromAPI(apiGame.homeTeam, apiGame.homeScore);
      const awayTeam = this.createTeamFromAPI(apiGame.awayTeam, apiGame.awayScore);
      
      return {
        id: apiGame.id,
        homeTeam,
        awayTeam,
        status: this.mapGameStatus(apiGame.status),
        time: this.formatGameTime(apiGame),
        date: this.formatGameDate(apiGame.startTime),
        venue: apiGame.venue,
        tvChannel: apiGame.tvChannel,
        quarter: apiGame.quarter,
        timeRemaining: apiGame.timeRemaining,
        keyEvents: apiGame.keyEvents || [],
      };
    });
  }

  // Transform API standings to app format
  static transformStandings(apiStandings: APITeamStanding[]): DivisionStanding[] {
    // Group by conference and division
    const grouped = apiStandings.reduce((acc, standing) => {
      const key = `${standing.conference}-${standing.division}`;
      if (!acc[key]) {
        acc[key] = {
          conference: standing.conference,
          divisionName: standing.division,
          teams: []
        };
      }
      
      acc[key].teams.push({
        rank: acc[key].teams.length + 1,
        team: this.createTeamFromAPI(standing.team),
        wins: standing.wins,
        losses: standing.losses,
        ties: standing.ties,
        winPercentage: standing.winPercentage,
        gamesBack: standing.gamesBack,
        conference: standing.conference,
      });
      
      return acc;
    }, {} as Record<string, DivisionStanding>);

    // Sort teams within each division by wins
    Object.values(grouped).forEach(division => {
      division.teams.sort((a, b) => {
        if (a.wins !== b.wins) return b.wins - a.wins;
        if (a.losses !== b.losses) return a.losses - b.losses;
        return a.team.name.localeCompare(b.team.name);
      });
      
      // Update ranks after sorting
      division.teams.forEach((team, index) => {
        team.rank = index + 1;
      });
    });

    return Object.values(grouped);
  }

  // Transform API stat leaders to app format
  static transformStatLeaders(apiLeaders: APIStatLeader[]): StatLeader[] {
    return apiLeaders.map(apiLeader => ({
      category: apiLeader.category,
      players: apiLeader.players.map((player, index) => ({
        rank: index + 1,
        playerName: player.name,
        team: this.createTeamFromAPI(player.team),
        statValue: player.value,
        statDetail: player.detail,
        playerImage: this.getPlayerImage(player.name), // Placeholder for now
      }))
    }));
  }

  // Transform API news to app format
  static transformNews(apiNews: APINewsArticle[]): NewsArticle[] {
    return apiNews.map(apiArticle => ({
      id: apiArticle.id,
      headline: apiArticle.headline,
      summary: apiArticle.summary,
      source: apiArticle.source,
      timestamp: apiArticle.timestamp,
      imageUrl: apiArticle.imageUrl,
      articleUrl: apiArticle.articleUrl,
      dataAiHint: this.generateDataAiHint(apiArticle.headline),
    }));
  }

  // Helper methods
  private static createTeamFromAPI(teamAbbr: string, score?: number): Team {
    const teamData = getTeamData(teamAbbr);
    
    return {
      name: teamData?.name || teamAbbr,
      shortName: teamAbbr,
      logoUrl: teamData?.logoUrl || `https://placehold.co/40x40.png`,
      score,
      color: teamData?.primaryColor,
      teamData,
    };
  }

  private static mapGameStatus(apiStatus: string): Game['status'] {
    switch (apiStatus) {
      case 'scheduled': return 'Upcoming';
      case 'live': return 'Live';
      case 'final': return 'Final';
      case 'postponed': return 'Postponed';
      case 'cancelled': return 'Postponed';
      default: return 'Upcoming';
    }
  }

  private static formatGameTime(apiGame: APIGame): string | undefined {
    if (apiGame.status === 'live') {
      return apiGame.quarter && apiGame.timeRemaining 
        ? `${apiGame.quarter} ${apiGame.timeRemaining}`
        : apiGame.quarter || 'Live';
    }
    
    if (apiGame.status === 'scheduled') {
      const date = new Date(apiGame.startTime);
      return date.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        timeZoneName: 'short'
      });
    }
    
    return undefined;
  }

  private static formatGameDate(startTime: string): string {
    const date = new Date(startTime);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  }

  private static getPlayerImage(playerName: string): string {
    // Placeholder - in a real app, you'd have a player image database
    return `https://placehold.co/40x40.png?text=${playerName.split(' ').map(n => n[0]).join('')}`;
  }

  private static generateDataAiHint(headline: string): string {
    const lowerHeadline = headline.toLowerCase();
    
    if (lowerHeadline.includes('injury') || lowerHeadline.includes('hurt')) return 'player injury';
    if (lowerHeadline.includes('trade') || lowerHeadline.includes('deal')) return 'trade news';
    if (lowerHeadline.includes('draft') || lowerHeadline.includes('rookie')) return 'draft news';
    if (lowerHeadline.includes('playoff') || lowerHeadline.includes('championship')) return 'playoff action';
    if (lowerHeadline.includes('quarterback') || lowerHeadline.includes('qb')) return 'quarterback action';
    if (lowerHeadline.includes('touchdown') || lowerHeadline.includes('td')) return 'scoring play';
    
    return 'football action';
  }
} 