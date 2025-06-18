import type { DivisionStanding, StatLeader, TeamStanding } from '@/lib/placeholder-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { Award, Users, TrendingUp, Trophy, Medal } from 'lucide-react';
import { cn } from '@/lib/utils';

function StandingsTable({ standing }: { standing: DivisionStanding }) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200 border-2 hover:border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Users size={20} className="text-primary"/> 
          <span className="font-bold">{standing.conference} {standing.divisionName}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-b-2">
              <TableHead className="w-[50px] font-bold">Rank</TableHead>
              <TableHead className="font-bold">Team</TableHead>
              <TableHead className="text-right font-bold">W</TableHead>
              <TableHead className="text-right font-bold">L</TableHead>
              <TableHead className="text-right font-bold">T</TableHead>
              <TableHead className="text-right font-bold">PCT</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {standing.teams.map((ts, index) => (
              <TableRow 
                key={ts.team.shortName}
                className={cn(
                  "transition-colors duration-200 hover:bg-muted/50",
                  index === 0 ? "bg-primary/5 border-l-4 border-l-primary" : "",
                  index === 1 ? "bg-secondary/30" : "",
                  index === 2 ? "bg-accent/10" : ""
                )}
              >
                <TableCell className="font-bold">
                  <div className="flex items-center gap-2">
                    {index === 0 && <Trophy size={16} className="text-yellow-500" />}
                    {index === 1 && <Medal size={16} className="text-gray-400" />}
                    {index === 2 && <Medal size={16} className="text-amber-600" />}
                    <span>{ts.rank}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Image 
                        src={ts.team.logoUrl} 
                        alt={`${ts.team.name} logo`} 
                        width={32} 
                        height={32} 
                        className="rounded-full shadow-sm transition-transform duration-200 hover:scale-110" 
                        data-ai-hint="team logo"
                      />
                      {ts.team.teamData?.primaryColor && (
                        <div 
                          className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border border-background shadow-sm"
                          style={{ backgroundColor: ts.team.teamData.primaryColor }}
                        />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">{ts.team.name}</span>
                      <span className="text-xs text-muted-foreground">{ts.team.shortName}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-bold text-green-600">{ts.wins}</TableCell>
                <TableCell className="text-right font-bold text-red-600">{ts.losses}</TableCell>
                <TableCell className="text-right font-bold text-blue-600">{ts.ties}</TableCell>
                <TableCell className="text-right font-bold">
                  <Badge variant="outline" className="text-xs">
                    {(ts.winPercentage * 100).toFixed(1)}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

function LeadersTable({ leaderData }: { leaderData: StatLeader }) {
  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200 border-2 hover:border-primary/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Award size={20} className="text-primary"/>
          <span className="font-bold">{leaderData.category}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-b-2">
              <TableHead className="w-[50px] font-bold">Rank</TableHead>
              <TableHead className="font-bold">Player</TableHead>
              <TableHead className="font-bold">Team</TableHead>
              <TableHead className="text-right font-bold">Stat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderData.players.map((player, index) => (
              <TableRow 
                key={player.playerName}
                className={cn(
                  "transition-colors duration-200 hover:bg-muted/50",
                  index === 0 ? "bg-primary/5 border-l-4 border-l-primary" : "",
                  index === 1 ? "bg-secondary/30" : "",
                  index === 2 ? "bg-accent/10" : ""
                )}
              >
                <TableCell className="font-bold">
                  <div className="flex items-center gap-2">
                    {index === 0 && <Trophy size={16} className="text-yellow-500" />}
                    {index === 1 && <Medal size={16} className="text-gray-400" />}
                    {index === 2 && <Medal size={16} className="text-amber-600" />}
                    <span>{player.rank}</span>
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {player.playerImage ? (
                        <Image 
                          src={player.playerImage} 
                          alt={player.playerName} 
                          width={40} 
                          height={40} 
                          className="rounded-full shadow-sm transition-transform duration-200 hover:scale-110" 
                          data-ai-hint="player portrait" 
                        />
                      ) : (
                        <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">{player.playerName.split(' ').map(n => n[0]).join('')}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">{player.playerName}</span>
                      {player.statDetail && (
                        <span className="text-xs text-muted-foreground">{player.statDetail}</span>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Image 
                        src={player.team.logoUrl} 
                        alt={`${player.team.name} logo`} 
                        width={24} 
                        height={24} 
                        className="rounded-full shadow-sm transition-transform duration-200 hover:scale-110" 
                        data-ai-hint="team logo"
                      />
                      {player.team.teamData?.primaryColor && (
                        <div 
                          className="absolute -bottom-1 -right-1 w-2.5 h-2.5 rounded-full border border-background shadow-sm"
                          style={{ backgroundColor: player.team.teamData.primaryColor }}
                        />
                      )}
                    </div>
                    <span className="font-medium">{player.team.shortName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col items-end">
                    <span className="font-bold text-lg text-primary">{player.statValue}</span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default function LeagueStatisticsHub({ standings, leaders }: { standings: DivisionStanding[], leaders: StatLeader[] }) {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <TrendingUp size={28} className="text-primary"/> League Standings
          </h2>
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs">
              {standings.length} Divisions
            </Badge>
            <Badge variant="outline" className="text-xs">
              {standings.reduce((acc, div) => acc + div.teams.length, 0)} Teams
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {standings.map((standing) => (
            <StandingsTable key={`${standing.conference}-${standing.divisionName}`} standing={standing} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <Award size={28} className="text-primary"/> League Leaders
          </h2>
          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs">
              {leaders.length} Categories
            </Badge>
            <Badge variant="outline" className="text-xs">
              Top Performers
            </Badge>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {leaders.map((leaderData) => (
            <LeadersTable key={leaderData.category} leaderData={leaderData} />
          ))}
        </div>
      </div>
    </div>
  );
}
