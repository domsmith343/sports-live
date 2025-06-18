"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LiveGameDashboard from "@/components/sections/live-game-dashboard";
import LeagueStatisticsHub from "@/components/sections/league-statistics-hub";
import NewsFeed from "@/components/sections/news-feed";
import type { Game, DivisionStanding, StatLeader, NewsArticle } from "@/lib/placeholder-data";
import { BarChart2, Tv, Newspaper, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface MainDashboardProps {
  liveGames: Game[];
  leagueStandings: DivisionStanding[];
  leagueLeaders: StatLeader[];
  newsArticles: NewsArticle[];
}

export function MainDashboard({ liveGames, leagueStandings, leagueLeaders, newsArticles }: MainDashboardProps) {
  const liveGamesCount = liveGames.filter(game => game.status === 'Live').length;
  const upcomingGamesCount = liveGames.filter(game => game.status === 'Upcoming').length;

  return (
    <div className="w-full space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <Tv size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Live Games</p>
              <p className="text-2xl font-bold text-red-600">{liveGamesCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-green-500/10 to-green-600/10 border border-green-200 dark:border-green-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <Activity size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Upcoming</p>
              <p className="text-2xl font-bold text-green-600">{upcomingGamesCount}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <Newspaper size={20} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">News Articles</p>
              <p className="text-2xl font-bold text-blue-600">{newsArticles.length}</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="live-games" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-8 rounded-xl p-1 bg-muted/50 border-2">
          <TabsTrigger 
            value="live-games" 
            className={cn(
              "flex items-center gap-2 py-3 px-4 rounded-lg transition-all duration-200",
              "data-[state=active]:bg-background data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-primary/20",
              "data-[state=active]:text-primary data-[state=active]:font-semibold",
              "hover:bg-muted/80"
            )}
          >
            <Tv size={18} className="transition-transform duration-200 group-hover:scale-110" /> 
            Live Games
            {liveGamesCount > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5 animate-pulse">
                {liveGamesCount}
              </span>
            )}
          </TabsTrigger>
          
          <TabsTrigger 
            value="statistics" 
            className={cn(
              "flex items-center gap-2 py-3 px-4 rounded-lg transition-all duration-200",
              "data-[state=active]:bg-background data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-primary/20",
              "data-[state=active]:text-primary data-[state=active]:font-semibold",
              "hover:bg-muted/80"
            )}
          >
            <BarChart2 size={18} className="transition-transform duration-200 group-hover:scale-110" /> 
            Statistics
          </TabsTrigger>
          
          <TabsTrigger 
            value="news" 
            className={cn(
              "flex items-center gap-2 py-3 px-4 rounded-lg transition-all duration-200",
              "data-[state=active]:bg-background data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-primary/20",
              "data-[state=active]:text-primary data-[state=active]:font-semibold",
              "hover:bg-muted/80"
            )}
          >
            <Newspaper size={18} className="transition-transform duration-200 group-hover:scale-110" /> 
            News
          </TabsTrigger>
        </TabsList>
        
        <TabsContent 
          value="live-games" 
          className="rounded-xl border-2 bg-card text-card-foreground shadow-lg p-6 min-h-[400px] transition-all duration-300"
        >
          <LiveGameDashboard games={liveGames} />
        </TabsContent>
        
        <TabsContent 
          value="statistics" 
          className="rounded-xl border-2 bg-card text-card-foreground shadow-lg p-6 min-h-[400px] transition-all duration-300"
        >
          <LeagueStatisticsHub standings={leagueStandings} leaders={leagueLeaders} />
        </TabsContent>
        
        <TabsContent 
          value="news" 
          className="rounded-xl border-2 bg-card text-card-foreground shadow-lg p-6 min-h-[400px] transition-all duration-300"
        >
          <NewsFeed articles={newsArticles} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
