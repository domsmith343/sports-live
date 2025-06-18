import type { APIGame, APITeamStanding, APIStatLeader, APINewsArticle } from './nfl-api';

// Demo data that simulates real API responses
export const demoGames: APIGame[] = [
  {
    id: "401547456",
    homeTeam: "KC",
    awayTeam: "LV",
    homeScore: 28,
    awayScore: 24,
    status: "live",
    quarter: "4th",
    timeRemaining: "2:15",
    startTime: "2024-10-27T20:00:00Z",
    venue: "Arrowhead Stadium",
    tvChannel: "CBS",
    keyEvents: ["Mahomes 3 TD passes", "Jacobs 2 rushing TDs", "Kelce 120 receiving yards"]
  },
  {
    id: "401547457",
    homeTeam: "PHI",
    awayTeam: "DAL",
    homeScore: 31,
    awayScore: 31,
    status: "live",
    quarter: "4th",
    timeRemaining: "0:45",
    startTime: "2024-10-27T17:00:00Z",
    venue: "Lincoln Financial Field",
    tvChannel: "FOX",
    keyEvents: ["Hurts 2 TD passes", "Pollard 1 rushing TD", "Eagles defense 3 sacks"]
  },
  {
    id: "401547458",
    homeTeam: "BUF",
    awayTeam: "MIA",
    status: "scheduled",
    startTime: "2024-10-27T23:20:00Z",
    venue: "Highmark Stadium",
    tvChannel: "NBC",
  },
  {
    id: "401547459",
    homeTeam: "SF",
    awayTeam: "LAR",
    homeScore: 35,
    awayScore: 14,
    status: "final",
    startTime: "2024-10-26T20:00:00Z",
    venue: "Levi's Stadium",
    keyEvents: ["Purdy 4 TD passes", "McCaffrey 2 rushing TDs", "49ers defense dominant"]
  },
  {
    id: "401547460",
    homeTeam: "BAL",
    awayTeam: "CIN",
    homeScore: 24,
    awayScore: 21,
    status: "live",
    quarter: "Halftime",
    startTime: "2024-10-27T17:00:00Z",
    venue: "M&T Bank Stadium",
    tvChannel: "CBS",
    keyEvents: ["Lamar Jackson 1 TD pass", "Burrow 1 TD pass"]
  },
  {
    id: "401547461",
    homeTeam: "GB",
    awayTeam: "MIN",
    homeScore: 17,
    awayScore: 14,
    status: "live",
    quarter: "3rd",
    timeRemaining: "8:30",
    startTime: "2024-10-27T17:00:00Z",
    venue: "Lambeau Field",
    tvChannel: "FOX",
    keyEvents: ["Love 1 TD pass", "Cousins 1 TD pass"]
  }
];

export const demoStandings: APITeamStanding[] = [
  // AFC East
  { team: "MIA", wins: 6, losses: 1, ties: 0, winPercentage: 0.857, gamesBack: 0, conference: "AFC", division: "East" },
  { team: "BUF", wins: 5, losses: 2, ties: 0, winPercentage: 0.714, gamesBack: 1, conference: "AFC", division: "East" },
  { team: "NE", wins: 2, losses: 5, ties: 0, winPercentage: 0.286, gamesBack: 4, conference: "AFC", division: "East" },
  { team: "NYJ", wins: 1, losses: 6, ties: 0, winPercentage: 0.143, gamesBack: 5, conference: "AFC", division: "East" },
  
  // AFC West
  { team: "KC", wins: 6, losses: 1, ties: 0, winPercentage: 0.857, gamesBack: 0, conference: "AFC", division: "West" },
  { team: "LV", wins: 3, losses: 4, ties: 0, winPercentage: 0.429, gamesBack: 3, conference: "AFC", division: "West" },
  { team: "LAC", wins: 2, losses: 5, ties: 0, winPercentage: 0.286, gamesBack: 4, conference: "AFC", division: "West" },
  { team: "DEN", wins: 1, losses: 6, ties: 0, winPercentage: 0.143, gamesBack: 5, conference: "AFC", division: "West" },
  
  // NFC East
  { team: "PHI", wins: 6, losses: 1, ties: 0, winPercentage: 0.857, gamesBack: 0, conference: "NFC", division: "East" },
  { team: "DAL", wins: 4, losses: 3, ties: 0, winPercentage: 0.571, gamesBack: 2, conference: "NFC", division: "East" },
  { team: "NYG", wins: 2, losses: 5, ties: 0, winPercentage: 0.286, gamesBack: 4, conference: "NFC", division: "East" },
  { team: "WAS", wins: 1, losses: 6, ties: 0, winPercentage: 0.143, gamesBack: 5, conference: "NFC", division: "East" },
  
  // NFC West
  { team: "SF", wins: 5, losses: 2, ties: 0, winPercentage: 0.714, gamesBack: 0, conference: "NFC", division: "West" },
  { team: "SEA", wins: 4, losses: 3, ties: 0, winPercentage: 0.571, gamesBack: 1, conference: "NFC", division: "West" },
  { team: "LAR", wins: 3, losses: 4, ties: 0, winPercentage: 0.429, gamesBack: 2, conference: "NFC", division: "West" },
  { team: "ARI", wins: 1, losses: 6, ties: 0, winPercentage: 0.143, gamesBack: 4, conference: "NFC", division: "West" },
];

export const demoStatLeaders: APIStatLeader[] = [
  {
    category: "Passing Yards",
    players: [
      { name: "Patrick Mahomes", team: "KC", value: "2,105 YDS", detail: "8 TDs, 3 INTs" },
      { name: "Josh Allen", team: "BUF", value: "1,987 YDS", detail: "7 TDs, 4 INTs" },
      { name: "Jalen Hurts", team: "PHI", value: "1,950 YDS", detail: "6 TDs, 2 INTs" },
    ],
  },
  {
    category: "Rushing Yards",
    players: [
      { name: "Derrick Henry", team: "TEN", value: "850 YDS", detail: "8 TDs, 5.2 YPC" },
      { name: "Christian McCaffrey", team: "SF", value: "790 YDS", detail: "7 TDs, 4.8 YPC" },
      { name: "Saquon Barkley", team: "NYG", value: "720 YDS", detail: "5 TDs, 4.5 YPC" },
    ],
  },
  {
    category: "Receiving TDs",
    players: [
      { name: "Tyreek Hill", team: "MIA", value: "8 TDs", detail: "45 rec, 890 YDS" },
      { name: "Stefon Diggs", team: "BUF", value: "7 TDs", detail: "42 rec, 720 YDS" },
      { name: "A.J. Brown", team: "PHI", value: "6 TDs", detail: "38 rec, 680 YDS" },
    ],
  },
];

export const demoNews: APINewsArticle[] = [
  {
    id: "1",
    headline: "QB Stroud leads Texans to stunning comeback victory",
    summary: "Rookie QB C.J. Stroud threw for 350 yards and 3 touchdowns, including the game-winner in the final minute to secure a dramatic 28-24 victory over the Colts.",
    source: "NFL Official",
    timestamp: "2 hours ago",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/CJ_Stroud_2023.jpg/800px-CJ_Stroud_2023.jpg",
    articleUrl: "#"
  },
  {
    id: "2",
    headline: "Injury Report: Key RB questionable for Sunday's game",
    summary: "Star running back Austin Ekeler is listed as questionable with an ankle injury sustained in practice. His status for the upcoming game against the Broncos remains uncertain.",
    source: "ESPN NFL",
    timestamp: "5 hours ago",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Austin_Ekeler_2022.jpg/800px-Austin_Ekeler_2022.jpg",
    articleUrl: "#"
  },
  {
    id: "3",
    headline: "Trade Deadline Looms: Which teams will make a move?",
    summary: "With the NFL trade deadline approaching, several contenders are rumored to be active in the market for upgrades. The Chiefs, Eagles, and 49ers are among teams looking to bolster their rosters.",
    source: "The Athletic",
    timestamp: "1 day ago",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/NFL_logo.svg/800px-NFL_logo.svg.png",
    articleUrl: "#"
  },
  {
    id: "4",
    headline: "Mahomes continues MVP campaign with another stellar performance",
    summary: "Patrick Mahomes threw for 320 yards and 3 touchdowns as the Chiefs improved to 6-1. The reigning MVP is making a strong case for his third MVP award.",
    source: "NFL Network",
    timestamp: "3 hours ago",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Patrick_Mahomes_2022.jpg/800px-Patrick_Mahomes_2022.jpg",
    articleUrl: "#"
  },
  {
    id: "5",
    headline: "Defensive Player of the Year race heats up",
    summary: "Myles Garrett, Micah Parsons, and Nick Bosa are leading the race for Defensive Player of the Year with dominant performances through the first half of the season.",
    source: "Pro Football Focus",
    timestamp: "6 hours ago",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Myles_Garrett_2022.jpg/800px-Myles_Garrett_2022.jpg",
    articleUrl: "#"
  },
  {
    id: "6",
    headline: "Rookie class making immediate impact across the league",
    summary: "This year's rookie class is proving to be one of the most talented in recent memory, with several first-year players already making significant contributions to their teams.",
    source: "NFL.com",
    timestamp: "1 day ago",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/NFL_Draft_logo.svg/800px-NFL_Draft_logo.svg.png",
    articleUrl: "#"
  }
]; 