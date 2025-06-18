import type { Game, Team } from '@/lib/placeholder-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Tv, MapPin, Clock, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GameCardProps {
  game: Game;
}

function TeamDisplay({ team, isHome, isWinning }: { team: Team; isHome: boolean; isWinning?: boolean }) {
  return (
    <div className={cn(
      "flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
      isHome ? "flex-row-reverse" : "",
      isWinning ? "bg-primary/10 border border-primary/20" : "bg-muted/50",
      "hover:bg-muted/70"
    )}>
      <div className="relative">
        <Image 
          src={team.logoUrl} 
          alt={`${team.name} logo`} 
          width={48} 
          height={48} 
          className="rounded-full shadow-md transition-transform duration-200 hover:scale-110" 
          data-ai-hint="team logo" 
        />
        {team.teamData?.primaryColor && (
          <div 
            className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-background shadow-sm"
            style={{ backgroundColor: team.teamData.primaryColor }}
          />
        )}
      </div>
      <div className={cn("flex flex-col", isHome ? "text-right" : "text-left")}>
        <span className="font-bold text-lg">{team.name}</span>
        <span className="text-sm text-muted-foreground">{team.shortName}</span>
      </div>
    </div>
  );
}

function GameCard({ game }: GameCardProps) {
  const getStatusColor = (status: Game['status']) => {
    switch (status) {
      case 'Live': return 'bg-red-500 hover:bg-red-600 animate-pulse';
      case 'Final': return 'bg-gray-500 hover:bg-gray-600';
      case 'Upcoming': return 'bg-green-500 hover:bg-green-600';
      case 'Halftime': return 'bg-yellow-500 hover:bg-yellow-600';
      case 'Postponed': return 'bg-orange-500 hover:bg-orange-600';
      default: return 'bg-primary';
    }
  };

  const getStatusIcon = (status: Game['status']) => {
    switch (status) {
      case 'Live': return <Zap size={14} />;
      case 'Final': return <Clock size={14} />;
      case 'Upcoming': return <Clock size={14} />;
      case 'Halftime': return <Clock size={14} />;
      default: return <Clock size={14} />;
    }
  };

  const isLive = game.status === 'Live';
  const homeScore = game.homeTeam.score || 0;
  const awayScore = game.awayTeam.score || 0;
  const homeWinning = homeScore > awayScore;
  const awayWinning = awayScore > homeScore;

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 group overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-lg md:text-xl font-bold">
            {game.awayTeam.shortName} @ {game.homeTeam.shortName}
          </CardTitle>
          <Badge className={cn(
            "flex items-center gap-1 text-primary-foreground text-xs font-semibold",
            getStatusColor(game.status)
          )}>
            {getStatusIcon(game.status)}
            {game.status}
          </Badge>
        </div>
        <CardDescription className="text-xs flex items-center gap-2">
          <span>{game.date}</span>
          {game.status !== 'Upcoming' && game.status !== 'Final' && game.time && (
            <>
              <span>•</span>
              <span className="font-medium">{game.time}</span>
            </>
          )}
          {game.status === 'Upcoming' && game.time && (
            <>
              <span>•</span>
              <span className="font-medium">{game.time}</span>
            </>
          )}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Away Team */}
        <div className="flex justify-between items-center">
          <TeamDisplay team={game.awayTeam} isHome={false} isWinning={awayWinning} />
          {game.status !== 'Upcoming' && (
            <div className={cn(
              "text-3xl font-bold transition-all duration-200",
              awayWinning ? "text-primary scale-110" : "text-foreground"
            )}>
              {game.awayTeam.score}
            </div>
          )}
        </div>

        {/* VS Divider */}
        <div className="flex items-center justify-center py-2">
          <div className="flex-1 h-px bg-border"></div>
          <span className="px-4 text-xs font-medium text-muted-foreground">VS</span>
          <div className="flex-1 h-px bg-border"></div>
        </div>

        {/* Home Team */}
        <div className="flex justify-between items-center">
          <TeamDisplay team={game.homeTeam} isHome={true} isWinning={homeWinning} />
          {game.status !== 'Upcoming' && (
            <div className={cn(
              "text-3xl font-bold transition-all duration-200",
              homeWinning ? "text-primary scale-110" : "text-foreground"
            )}>
              {game.homeTeam.score}
            </div>
          )}
        </div>
        
        {/* Game Info */}
        {(game.venue || game.tvChannel) && (
          <div className="text-xs text-muted-foreground space-y-2 border-t pt-3 mt-3">
            {game.venue && (
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-primary" />
                <span>{game.venue}</span>
              </div>
            )}
            {game.tvChannel && (
              <div className="flex items-center gap-2">
                <Tv size={14} className="text-primary" />
                <span>{game.tvChannel}</span>
              </div>
            )}
          </div>
        )}

        {/* Key Events */}
        {game.keyEvents && game.keyEvents.length > 0 && (game.status === 'Live' || game.status === 'Final') && (
          <div className="mt-4 pt-3 border-t">
            <h4 className="text-xs font-semibold mb-2 flex items-center gap-1">
              <Zap size={12} className="text-primary" />
              Key Events:
            </h4>
            <ul className="space-y-1">
              {game.keyEvents.slice(0, 3).map((event, index) => (
                <li key={index} className="text-xs text-muted-foreground flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                  <span>{event}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Live Indicator */}
        {isLive && (
          <div className="absolute top-2 right-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function LiveGameDashboard({ games }: { games: Game[] }) {
  const liveGames = games.filter(game => game.status === 'Live');
  const upcomingGames = games.filter(game => game.status === 'Upcoming');
  const recentGames = games.filter(game => game.status === 'Final');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Tv size={28} className="text-primary" />
          Live Games
        </h2>
        <div className="flex gap-2">
          <Badge variant="secondary" className="text-xs">
            {liveGames.length} Live
          </Badge>
          <Badge variant="outline" className="text-xs">
            {upcomingGames.length} Upcoming
          </Badge>
        </div>
      </div>

      {games.length === 0 ? (
        <div className="text-center py-12">
          <Tv size={48} className="mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No games currently scheduled.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Live Games */}
          {liveGames.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-red-500 flex items-center gap-2">
                <Zap size={20} />
                Live Now ({liveGames.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          )}

          {/* Upcoming Games */}
          {upcomingGames.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-green-600 flex items-center gap-2">
                <Clock size={20} />
                Upcoming ({upcomingGames.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          )}

          {/* Recent Games */}
          {recentGames.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-4 text-muted-foreground flex items-center gap-2">
                <Clock size={20} />
                Recent Results ({recentGames.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentGames.map((game) => (
                  <GameCard key={game.id} game={game} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
