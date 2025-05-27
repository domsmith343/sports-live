
export interface Team {
  name: string;
  shortName: string;
  logoUrl: string;
  score?: number;
  color?: string; // For branding accents, e.g., a hex code
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
}

export interface TeamStanding {
  rank: number;
  team: Team;
  wins: number;
  losses: number;
  ties: number;
  conference?: string; // e.g. AFC, NFC
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
}

const teams: Record<string, Team> = {
  BUF: { name: "Buffalo Bills", shortName: "BUF", logoUrl: "https://placehold.co/40x40.png", color: "#00338D" },
  MIA: { name: "Miami Dolphins", shortName: "MIA", logoUrl: "https://placehold.co/40x40.png", color: "#008E97" },
  KC: { name: "Kansas City Chiefs", shortName: "KC", logoUrl: "https://placehold.co/40x40.png", color: "#E31837" },
  LV: { name: "Las Vegas Raiders", shortName: "LV", logoUrl: "https://placehold.co/40x40.png", color: "#000000" },
  PHI: { name: "Philadelphia Eagles", shortName: "PHI", logoUrl: "https://placehold.co/40x40.png", color: "#004C54" },
  DAL: { name: "Dallas Cowboys", shortName: "DAL", logoUrl: "https://placehold.co/40x40.png", color: "#003594" },
  SF: { name: "San Francisco 49ers", shortName: "SF", logoUrl: "https://placehold.co/40x40.png", color: "#AA0000" },
  LAR: { name: "Los Angeles Rams", shortName: "LAR", logoUrl: "https://placehold.co/40x40.png", color: "#003594" },
};

export const getLiveGames = (): Game[] => [
  {
    id: "1",
    homeTeam: { ...teams.KC, score: 21 },
    awayTeam: { ...teams.LV, score: 17 },
    status: "Live",
    time: "Q3 08:32",
    date: "Sun, Oct 27",
    venue: "Arrowhead Stadium",
    tvChannel: "CBS",
    keyEvents: ["Mahomes 2 TD passes", "Jacobs 1 rushing TD"]
  },
  {
    id: "2",
    homeTeam: { ...teams.PHI, score: 24 },
    awayTeam: { ...teams.DAL, score: 24 },
    status: "Live",
    time: "Q4 02:00",
    date: "Sun, Oct 27",
    venue: "Lincoln Financial Field",
    tvChannel: "FOX",
  },
  {
    id: "3",
    homeTeam: { ...teams.BUF },
    awayTeam: { ...teams.MIA },
    status: "Upcoming",
    time: "8:20 PM ET",
    date: "Sun, Oct 27",
    venue: "Highmark Stadium",
    tvChannel: "NBC",
  },
  {
    id: "4",
    homeTeam: { ...teams.SF, score: 31 },
    awayTeam: { ...teams.LAR, score: 10 },
    status: "Final",
    date: "Sat, Oct 26",
  },
];

export const getLeagueStandings = (): DivisionStanding[] => [
  {
    conference: "AFC",
    divisionName: "East",
    teams: [
      { rank: 1, team: teams.MIA, wins: 5, losses: 1, ties: 0 },
      { rank: 2, team: teams.BUF, wins: 4, losses: 2, ties: 0 },
      // Add more teams
    ],
  },
  {
    conference: "AFC",
    divisionName: "West",
    teams: [
      { rank: 1, team: teams.KC, wins: 6, losses: 0, ties: 0 },
      { rank: 2, team: teams.LV, wins: 3, losses: 3, ties: 0 },
      // Add more teams
    ],
  },
  {
    conference: "NFC",
    divisionName: "East",
    teams: [
      { rank: 1, team: teams.PHI, wins: 5, losses: 1, ties: 0 },
      { rank: 2, team: teams.DAL, wins: 4, losses: 2, ties: 0 },
      // Add more teams
    ],
  },
];

export const getLeagueLeaders = (): StatLeader[] => [
  {
    category: "Passing Yards",
    players: [
      { rank: 1, playerName: "Patrick Mahomes", team: teams.KC, statValue: "2,105 YDS", playerImage: "https://placehold.co/40x40.png" },
      { rank: 2, playerName: "Josh Allen", team: teams.BUF, statValue: "1,987 YDS", playerImage: "https://placehold.co/40x40.png" },
      { rank: 3, playerName: "Jalen Hurts", team: teams.PHI, statValue: "1,950 YDS", playerImage: "https://placehold.co/40x40.png" },
    ],
  },
  {
    category: "Rushing Yards",
    players: [
      { rank: 1, playerName: "Derrick Henry", team: {name: "Tennessee Titans", shortName: "TEN", logoUrl: "https://placehold.co/40x40.png"}, statValue: "850 YDS", playerImage: "https://placehold.co/40x40.png" },
      { rank: 2, playerName: "Christian McCaffrey", team: teams.SF, statValue: "790 YDS", playerImage: "https://placehold.co/40x40.png" },
    ],
  },
  {
    category: "Receiving TDs",
    players: [
      { rank: 1, playerName: "Tyreek Hill", team: teams.MIA, statValue: "8 TDs", playerImage: "https://placehold.co/40x40.png" },
      { rank: 2, playerName: "Stefon Diggs", team: teams.BUF, statValue: "7 TDs", playerImage: "https://placehold.co/40x40.png" },
    ],
  },
];

export const getNewsArticles = (): NewsArticle[] => [
  {
    id: "1",
    headline: "QB Stroud leads Texans to stunning comeback victory",
    summary: "Rookie QB C.J. Stroud threw for 350 yards and 3 touchdowns, including the game-winner in the final minute.",
    source: "NFL Official",
    timestamp: "2 hours ago",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "football action",
    articleUrl: "#"
  },
  {
    id: "2",
    headline: "Injury Report: Key RB questionable for Sunday's game",
    summary: "Star running back Austin Ekeler is listed as questionable with an ankle injury, his status for the upcoming game is uncertain.",
    source: "ESPN NFL",
    timestamp: "5 hours ago",
    imageUrl: "https://placehold.co/600x400.png",
    dataAiHint: "player injury",
    articleUrl: "#"
  },
  {
    id: "3",
    headline: "Trade Deadline Looms: Which teams will make a move?",
    summary: "With the NFL trade deadline approaching, several contenders are rumored to be active in the market for upgrades.",
    source: "The Athletic",
    timestamp: "1 day ago",
    articleUrl: "#"
  },
];
