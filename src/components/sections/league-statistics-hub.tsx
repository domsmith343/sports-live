
import type { DivisionStanding, StatLeader, TeamStanding } from '@/lib/placeholder-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { Award, Users, TrendingUp } from 'lucide-react';

function StandingsTable({ standing }: { standing: DivisionStanding }) {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Users size={20} className="text-primary"/> 
          {standing.conference} {standing.divisionName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="text-right">W</TableHead>
              <TableHead className="text-right">L</TableHead>
              <TableHead className="text-right">T</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {standing.teams.map((ts) => (
              <TableRow key={ts.team.shortName}>
                <TableCell>{ts.rank}</TableCell>
                <TableCell className="font-medium flex items-center gap-2">
                  <Image src={ts.team.logoUrl} alt={`${ts.team.name} logo`} width={20} height={20} className="rounded-sm" data-ai-hint="team logo"/>
                  {ts.team.name}
                </TableCell>
                <TableCell className="text-right">{ts.wins}</TableCell>
                <TableCell className="text-right">{ts.losses}</TableCell>
                <TableCell className="text-right">{ts.ties}</TableCell>
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
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Award size={20} className="text-primary"/>
          {leaderData.category}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead>Team</TableHead>
              <TableHead className="text-right">Stat</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderData.players.map((player) => (
              <TableRow key={player.playerName}>
                <TableCell>{player.rank}</TableCell>
                <TableCell className="font-medium flex items-center gap-2">
                  {player.playerImage && <Image src={player.playerImage} alt={player.playerName} width={24} height={24} className="rounded-full" data-ai-hint="player portrait" />}
                  {player.playerName}
                </TableCell>
                <TableCell>
                  <Image src={player.team.logoUrl} alt={`${player.team.name} logo`} width={20} height={20} className="rounded-sm inline-block mr-1" data-ai-hint="team logo"/>
                  {player.team.shortName}
                </TableCell>
                <TableCell className="text-right font-semibold">{player.statValue}</TableCell>
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
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4 flex items-center gap-2">
          <TrendingUp size={28} className="text-primary"/> League Standings
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {standings.map((standing) => (
            <StandingsTable key={`${standing.conference}-${standing.divisionName}`} standing={standing} />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold tracking-tight text-foreground mb-4 flex items-center gap-2">
            <Award size={28} className="text-primary"/> League Leaders
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {leaders.map((leaderData) => (
            <LeadersTable key={leaderData.category} leaderData={leaderData} />
          ))}
        </div>
      </div>
      {/* TODO: Team comparison tools could be added here */}
    </div>
  );
}
