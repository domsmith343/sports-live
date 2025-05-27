
import type { Game, Team } from '@/lib/placeholder-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Tv, MapPin } from 'lucide-react';

interface GameCardProps {
  game: Game;
}

function TeamDisplay({ team, isHome }: { team: Team; isHome: boolean }) {
  return (
    <div className={`flex items-center gap-2 ${isHome ? 'flex-row-reverse' : ''}`}>
      <Image src={team.logoUrl} alt={`${team.name} logo`} width={32} height={32} className="rounded-full" data-ai-hint="team logo" />
      <span className="font-semibold text-sm md:text-base">{team.name}</span>
    </div>
  );
}

function GameCard({ game }: GameCardProps) {
  const getStatusColor = (status: Game['status']) => {
    switch (status) {
      case 'Live': return 'bg-red-500 hover:bg-red-600';
      case 'Final': return 'bg-gray-500 hover:bg-gray-600';
      case 'Upcoming': return 'bg-green-500 hover:bg-green-600';
      case 'Halftime': return 'bg-yellow-500 hover:bg-yellow-600';
      default: return 'bg-primary';
    }
  };

  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center mb-2">
          <CardTitle className="text-lg md:text-xl">
            {game.awayTeam.shortName} @ {game.homeTeam.shortName}
          </CardTitle>
          <Badge className={`${getStatusColor(game.status)} text-primary-foreground text-xs`}>{game.status}</Badge>
        </div>
        <CardDescription className="text-xs">
          {game.date} {game.status !== 'Upcoming' && game.status !== 'Final' ? ` - ${game.time}` : game.status === 'Upcoming' ? `- ${game.time}`: ''}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-3">
          <TeamDisplay team={game.awayTeam} isHome={false} />
          {game.status !== 'Upcoming' && (
            <span className="text-2xl font-bold text-primary">{game.awayTeam.score}</span>
          )}
        </div>
        <div className="flex justify-between items-center mb-4">
          <TeamDisplay team={game.homeTeam} isHome={true} />
           {game.status !== 'Upcoming' && (
            <span className="text-2xl font-bold text-primary">{game.homeTeam.score}</span>
          )}
        </div>
        
        {(game.venue || game.tvChannel) && (
          <div className="text-xs text-muted-foreground space-y-1 border-t pt-2 mt-2">
            {game.venue && (
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span>{game.venue}</span>
              </div>
            )}
            {game.tvChannel && (
              <div className="flex items-center gap-1">
                <Tv size={14} />
                <span>{game.tvChannel}</span>
              </div>
            )}
          </div>
        )}
        {game.keyEvents && game.keyEvents.length > 0 && game.status === 'Live' && (
          <div className="mt-3 pt-2 border-t">
            <h4 className="text-xs font-semibold mb-1">Key Events:</h4>
            <ul className="list-disc list-inside text-xs text-muted-foreground">
              {game.keyEvents.map((event, index) => <li key={index}>{event}</li>)}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function LiveGameDashboard({ games }: { games: Game[] }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight text-foreground">Live Games</h2>
      {games.length === 0 ? (
        <p className="text-muted-foreground">No live games currently.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
