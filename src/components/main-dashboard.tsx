
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LiveGameDashboard from "@/components/sections/live-game-dashboard";
import LeagueStatisticsHub from "@/components/sections/league-statistics-hub";
import NewsFeed from "@/components/sections/news-feed";
import type { Game, DivisionStanding, StatLeader, NewsArticle } from "@/lib/placeholder-data";
import { BarChart2, Tv, Newspaper } from "lucide-react";

interface MainDashboardProps {
  liveGames: Game[];
  leagueStandings: DivisionStanding[];
  leagueLeaders: StatLeader[];
  newsArticles: NewsArticle[];
}

export function MainDashboard({ liveGames, leagueStandings, leagueLeaders, newsArticles }: MainDashboardProps) {
  return (
    <Tabs defaultValue="live-games" className="w-full">
      <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-6 rounded-lg p-1">
        <TabsTrigger value="live-games" className="flex items-center gap-2 py-2.5 data-[state=active]:shadow-md">
          <Tv size={18} /> Live Games
        </TabsTrigger>
        <TabsTrigger value="statistics" className="flex items-center gap-2 py-2.5 data-[state=active]:shadow-md">
          <BarChart2 size={18} /> Statistics
        </TabsTrigger>
        <TabsTrigger value="news" className="flex items-center gap-2 py-2.5 data-[state=active]:shadow-md">
          <Newspaper size={18} /> News
        </TabsTrigger>
      </TabsList>
      <TabsContent value="live-games" className="rounded-lg border bg-card text-card-foreground shadow p-6 min-h-[300px]">
        <LiveGameDashboard games={liveGames} />
      </TabsContent>
      <TabsContent value="statistics" className="rounded-lg border bg-card text-card-foreground shadow p-6 min-h-[300px]">
        <LeagueStatisticsHub standings={leagueStandings} leaders={leagueLeaders} />
      </TabsContent>
      <TabsContent value="news" className="rounded-lg border bg-card text-card-foreground shadow p-6 min-h-[300px]">
        <NewsFeed articles={newsArticles} />
      </TabsContent>
    </Tabs>
  );
}
