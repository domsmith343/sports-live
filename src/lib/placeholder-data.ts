import { getTeamData, type TeamData } from './team-data';

export interface Team {
  name: string;
  shortName: string;
  logoUrl: string;
  score?: number;
  color?: string; // For branding accents, e.g., a hex code
  teamData?: TeamData;
}

export interface Game {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  status: 'Live' | 'Final' | 'Upcoming' | 'Postponed' | 'Halftime';
  time?: string; // e.g., "Q2 10:30", "7:00 PM EST", "Halftime"
  date?: string; // e.g., "Sun, Oct 27"
  keyEvents?: string[];
  venue?: string;
  tvChannel?: string;
  quarter?: string;
  timeRemaining?: string;
}

export interface TeamStanding {
  rank: number;
  team: Team;
  wins: number;
  losses: number;
  ties: number;
  conference?: string; // e.g. AFC, NFC
  winPercentage: number;
  gamesBack: number;
}

export interface DivisionStanding {
  conference: string; // e.g. AFC
  divisionName: string; // e.g. East
  teams: TeamStanding[];
}

export interface StatLeader {
  category: string;
  players: {
    rank: number;
    playerName: string;
    playerImage?: string;
    team: Team;
    statValue: string;
    statDetail?: string;
  }[];
}

export interface NewsArticle {
  id: string;
  headline: string;
  summary: string;
  source?: string;
  timestamp: string;
  imageUrl?: string;
  articleUrl?: string;
  dataAiHint?: string;
}

// Helper function to create team objects with real data
const createTeam = (shortName: string, score?: number): Team => {
  const teamData = getTeamData(shortName);
  return {
    name: teamData?.name || shortName,
    shortName: shortName,
    logoUrl: teamData?.logoUrl || `https://placehold.co/40x40.png`,
    score,
    color: teamData?.primaryColor,
    teamData
  };
};

export const getLiveGames = (): Game[] => [
  {
    id: "1",
    homeTeam: createTeam("KC", 28),
    awayTeam: createTeam("LV", 24),
    status: "Live",
    time: "Q4 02:15",
    date: "Sun, Oct 27",
    venue: "Arrowhead Stadium",
    tvChannel: "CBS",
    quarter: "4th",
    timeRemaining: "2:15",
    keyEvents: ["Mahomes 3 TD passes", "Jacobs 2 rushing TDs", "Kelce 120 receiving yards"]
  },
  {
    id: "2",
    homeTeam: createTeam("PHI", 31),
    awayTeam: createTeam("DAL", 31),
    status: "Live",
    time: "Q4 00:45",
    date: "Sun, Oct 27",
    venue: "Lincoln Financial Field",
    tvChannel: "FOX",
    quarter: "4th",
    timeRemaining: "0:45",
    keyEvents: ["Hurts 2 TD passes", "Pollard 1 rushing TD", "Eagles defense 3 sacks"]
  },
  {
    id: "3",
    homeTeam: createTeam("BUF"),
    awayTeam: createTeam("MIA"),
    status: "Upcoming",
    time: "8:20 PM ET",
    date: "Sun, Oct 27",
    venue: "Highmark Stadium",
    tvChannel: "NBC",
  },
  {
    id: "4",
    homeTeam: createTeam("SF", 35),
    awayTeam: createTeam("LAR", 14),
    status: "Final",
    date: "Sat, Oct 26",
    venue: "Levi's Stadium",
    keyEvents: ["Purdy 4 TD passes", "McCaffrey 2 rushing TDs", "49ers defense dominant"]
  },
  {
    id: "5",
    homeTeam: createTeam("BAL", 24),
    awayTeam: createTeam("CIN", 21),
    status: "Halftime",
    date: "Sun, Oct 27",
    venue: "M&T Bank Stadium",
    tvChannel: "CBS",
    quarter: "Halftime",
    keyEvents: ["Lamar Jackson 1 TD pass", "Burrow 1 TD pass"]
  },
  {
    id: "6",
    homeTeam: createTeam("GB", 17),
    awayTeam: createTeam("MIN", 14),
    status: "Live",
    time: "Q3 08:30",
    date: "Sun, Oct 27",
    venue: "Lambeau Field",
    tvChannel: "FOX",
    quarter: "3rd",
    timeRemaining: "8:30",
    keyEvents: ["Love 1 TD pass", "Cousins 1 TD pass"]
  }
];

export const getLeagueStandings = (): DivisionStanding[] => [
  {
    conference: "AFC",
    divisionName: "East",
    teams: [
      { rank: 1, team: createTeam("MIA"), wins: 6, losses: 1, ties: 0, winPercentage: 0.857, gamesBack: 0 },
      { rank: 2, team: createTeam("BUF"), wins: 5, losses: 2, ties: 0, winPercentage: 0.714, gamesBack: 1 },
      { rank: 3, team: createTeam("NE"), wins: 2, losses: 5, ties: 0, winPercentage: 0.286, gamesBack: 4 },
      { rank: 4, team: createTeam("NYJ"), wins: 1, losses: 6, ties: 0, winPercentage: 0.143, gamesBack: 5 },
    ],
  },
  {
    conference: "AFC",
    divisionName: "West",
    teams: [
      { rank: 1, team: createTeam("KC"), wins: 6, losses: 1, ties: 0, winPercentage: 0.857, gamesBack: 0 },
      { rank: 2, team: createTeam("LV"), wins: 3, losses: 4, ties: 0, winPercentage: 0.429, gamesBack: 3 },
      { rank: 3, team: createTeam("LAC"), wins: 2, losses: 5, ties: 0, winPercentage: 0.286, gamesBack: 4 },
      { rank: 4, team: createTeam("DEN"), wins: 1, losses: 6, ties: 0, winPercentage: 0.143, gamesBack: 5 },
    ],
  },
  {
    conference: "NFC",
    divisionName: "East",
    teams: [
      { rank: 1, team: createTeam("PHI"), wins: 6, losses: 1, ties: 0, winPercentage: 0.857, gamesBack: 0 },
      { rank: 2, team: createTeam("DAL"), wins: 4, losses: 3, ties: 0, winPercentage: 0.571, gamesBack: 2 },
      { rank: 3, team: createTeam("NYG"), wins: 2, losses: 5, ties: 0, winPercentage: 0.286, gamesBack: 4 },
      { rank: 4, team: createTeam("WAS"), wins: 1, losses: 6, ties: 0, winPercentage: 0.143, gamesBack: 5 },
    ],
  },
  {
    conference: "NFC",
    divisionName: "West",
    teams: [
      { rank: 1, team: createTeam("SF"), wins: 5, losses: 2, ties: 0, winPercentage: 0.714, gamesBack: 0 },
      { rank: 2, team: createTeam("SEA"), wins: 4, losses: 3, ties: 0, winPercentage: 0.571, gamesBack: 1 },
      { rank: 3, team: createTeam("LAR"), wins: 3, losses: 4, ties: 0, winPercentage: 0.429, gamesBack: 2 },
      { rank: 4, team: createTeam("ARI"), wins: 1, losses: 6, ties: 0, winPercentage: 0.143, gamesBack: 4 },
    ],
  },
];

export const getLeagueLeaders = (): StatLeader[] => [
  {
    category: "Passing Yards",
    players: [
      { rank: 1, playerName: "Patrick Mahomes", team: createTeam("KC"), statValue: "2,105 YDS", statDetail: "8 TDs, 3 INTs", playerImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Patrick_Mahomes_2022.jpg/800px-Patrick_Mahomes_2022.jpg" },
      { rank: 2, playerName: "Josh Allen", team: createTeam("BUF"), statValue: "1,987 YDS", statDetail: "7 TDs, 4 INTs", playerImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Josh_Allen_2022.jpg/800px-Josh_Allen_2022.jpg" },
      { rank: 3, playerName: "Jalen Hurts", team: createTeam("PHI"), statValue: "1,950 YDS", statDetail: "6 TDs, 2 INTs", playerImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Jalen_Hurts_2022.jpg/800px-Jalen_Hurts_2022.jpg" },
    ],
  },
  {
    category: "Rushing Yards",
    players: [
      { rank: 1, playerName: "Derrick Henry", team: createTeam("TEN"), statValue: "850 YDS", statDetail: "8 TDs, 5.2 YPC", playerImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Derrick_Henry_2022.jpg/800px-Derrick_Henry_2022.jpg" },
      { rank: 2, playerName: "Christian McCaffrey", team: createTeam("SF"), statValue: "790 YDS", statDetail: "7 TDs, 4.8 YPC", playerImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Christian_McCaffrey_2022.jpg/800px-Christian_McCaffrey_2022.jpg" },
      { rank: 3, playerName: "Saquon Barkley", team: createTeam("NYG"), statValue: "720 YDS", statDetail: "5 TDs, 4.5 YPC", playerImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Saquon_Barkley_2022.jpg/800px-Saquon_Barkley_2022.jpg" },
    ],
  },
  {
    category: "Receiving TDs",
    players: [
      { rank: 1, playerName: "Tyreek Hill", team: createTeam("MIA"), statValue: "8 TDs", statDetail: "45 rec, 890 YDS", playerImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Tyreek_Hill_2022.jpg/800px-Tyreek_Hill_2022.jpg" },
      { rank: 2, playerName: "Stefon Diggs", team: createTeam("BUF"), statValue: "7 TDs", statDetail: "42 rec, 720 YDS", playerImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Stefon_Diggs_2022.jpg/800px-Stefon_Diggs_2022.jpg" },
      { rank: 3, playerName: "A.J. Brown", team: createTeam("PHI"), statValue: "6 TDs", statDetail: "38 rec, 680 YDS", playerImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/AJ_Brown_2022.jpg/800px-AJ_Brown_2022.jpg" },
    ],
  },
];

export const getNewsArticles = (): NewsArticle[] => [
  {
    id: "1",
    headline: "QB Stroud leads Texans to stunning comeback victory",
    summary: "Rookie QB C.J. Stroud threw for 350 yards and 3 touchdowns, including the game-winner in the final minute to secure a dramatic 28-24 victory over the Colts.",
    source: "NFL Official",
    timestamp: "2 hours ago",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/CJ_Stroud_2023.jpg/800px-CJ_Stroud_2023.jpg",
    dataAiHint: "football action",
    articleUrl: "#"
  },
  {
    id: "2",
    headline: "Injury Report: Key RB questionable for Sunday's game",
    summary: "Star running back Austin Ekeler is listed as questionable with an ankle injury sustained in practice. His status for the upcoming game against the Broncos remains uncertain.",
    source: "ESPN NFL",
    timestamp: "5 hours ago",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Austin_Ekeler_2022.jpg/800px-Austin_Ekeler_2022.jpg",
    dataAiHint: "player injury",
    articleUrl: "#"
  },
  {
    id: "3",
    headline: "Trade Deadline Looms: Which teams will make a move?",
    summary: "With the NFL trade deadline approaching, several contenders are rumored to be active in the market for upgrades. The Chiefs, Eagles, and 49ers are among teams looking to bolster their rosters.",
    source: "The Athletic",
    timestamp: "1 day ago",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/NFL_logo.svg/800px-NFL_logo.svg.png",
    dataAiHint: "trade deadline",
    articleUrl: "#"
  },
  {
    id: "4",
    headline: "Mahomes continues MVP campaign with another stellar performance",
    summary: "Patrick Mahomes threw for 320 yards and 3 touchdowns as the Chiefs improved to 6-1. The reigning MVP is making a strong case for his third MVP award.",
    source: "NFL Network",
    timestamp: "3 hours ago",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Patrick_Mahomes_2022.jpg/800px-Patrick_Mahomes_2022.jpg",
    dataAiHint: "quarterback performance",
    articleUrl: "#"
  },
  {
    id: "5",
    headline: "Defensive Player of the Year race heats up",
    summary: "Myles Garrett, Micah Parsons, and Nick Bosa are leading the race for Defensive Player of the Year with dominant performances through the first half of the season.",
    source: "Pro Football Focus",
    timestamp: "6 hours ago",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Myles_Garrett_2022.jpg/800px-Myles_Garrett_2022.jpg",
    dataAiHint: "defensive players",
    articleUrl: "#"
  },
  {
    id: "6",
    headline: "Rookie class making immediate impact across the league",
    summary: "This year's rookie class is proving to be one of the most talented in recent memory, with several first-year players already making significant contributions to their teams.",
    source: "NFL.com",
    timestamp: "1 day ago",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/NFL_Draft_logo.svg/800px-NFL_Draft_logo.svg.png",
    dataAiHint: "rookie players",
    articleUrl: "#"
  }
];
