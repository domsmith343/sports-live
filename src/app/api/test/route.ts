import { NextResponse } from 'next/server';
import { nflAPI } from '@/lib/api/nfl-api';
import { DataAdapter } from '@/lib/api/data-adapter';
import { config } from '@/lib/config';

export async function GET() {
  try {
    const results = {
      config: {
        useRealData: config.api.useRealData,
        baseUrl: config.api.baseUrl,
        hasApiKey: !!config.api.apiKey,
      },
      tests: {} as any,
    };

    // Test ESPN Games API
    try {
      console.log('Testing ESPN Games API...');
      const apiGames = await nflAPI.getESPNGames();
      const transformedGames = DataAdapter.transformGames(apiGames);
      
      results.tests.games = {
        success: true,
        apiCount: apiGames.length,
        transformedCount: transformedGames.length,
        sample: transformedGames[0] || null,
      };
    } catch (error) {
      results.tests.games = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }

    // Test ESPN Standings API
    try {
      console.log('Testing ESPN Standings API...');
      const apiStandings = await nflAPI.getESPNStandings();
      const transformedStandings = DataAdapter.transformStandings(apiStandings);
      
      results.tests.standings = {
        success: true,
        apiCount: apiStandings.length,
        transformedCount: transformedStandings.length,
        sample: transformedStandings[0] || null,
      };
    } catch (error) {
      results.tests.standings = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }

    // Test ESPN Stat Leaders API
    try {
      console.log('Testing ESPN Stat Leaders API...');
      const apiLeaders = await nflAPI.getESPNStatLeaders();
      const transformedLeaders = DataAdapter.transformStatLeaders(apiLeaders);
      
      results.tests.leaders = {
        success: true,
        apiCount: apiLeaders.length,
        transformedCount: transformedLeaders.length,
        sample: transformedLeaders[0] || null,
      };
    } catch (error) {
      results.tests.leaders = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }

    // Test News API
    try {
      console.log('Testing News API...');
      const apiNews = await nflAPI.getNewsArticles();
      const transformedNews = DataAdapter.transformNews(apiNews);
      
      results.tests.news = {
        success: true,
        apiCount: apiNews.length,
        transformedCount: transformedNews.length,
        sample: transformedNews[0] || null,
      };
    } catch (error) {
      results.tests.news = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error('API test error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
} 