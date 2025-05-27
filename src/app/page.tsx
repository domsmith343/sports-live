
import { MainDashboard } from '@/components/main-dashboard';
import { getLiveGames, getLeagueStandings, getLeagueLeaders, getNewsArticles } from '@/lib/placeholder-data';

export default function HomePage() {
  // In a real app, this data would be fetched from an API.
  const liveGames = getLiveGames();
  const leagueStandings = getLeagueStandings();
  const leagueLeaders = getLeagueLeaders();
  const newsArticles = getNewsArticles();

  return (
    <MainDashboard
      liveGames={liveGames}
      leagueStandings={leagueStandings}
      leagueLeaders={leagueLeaders}
      newsArticles={newsArticles}
    />
  );
}
