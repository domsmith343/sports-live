export interface TeamData {
  name: string;
  shortName: string;
  logoUrl: string;
  primaryColor: string;
  secondaryColor: string;
  conference: 'AFC' | 'NFC';
  division: 'East' | 'West' | 'North' | 'South';
}

export const NFL_TEAMS: Record<string, TeamData> = {
  // AFC East
  BUF: {
    name: "Buffalo Bills",
    shortName: "BUF",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/7/72/Buffalo_Bills_logo.svg",
    primaryColor: "#00338D",
    secondaryColor: "#C60C30",
    conference: "AFC",
    division: "East"
  },
  MIA: {
    name: "Miami Dolphins",
    shortName: "MIA",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/3/37/Miami_Dolphins_logo.svg",
    primaryColor: "#008E97",
    secondaryColor: "#FC4C02",
    conference: "AFC",
    division: "East"
  },
  NE: {
    name: "New England Patriots",
    shortName: "NE",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/b/b9/New_England_Patriots_logo.svg",
    primaryColor: "#002244",
    secondaryColor: "#C60C30",
    conference: "AFC",
    division: "East"
  },
  NYJ: {
    name: "New York Jets",
    shortName: "NYJ",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/6/6b/New_York_Jets_logo.svg",
    primaryColor: "#125740",
    secondaryColor: "#000000",
    conference: "AFC",
    division: "East"
  },

  // AFC North
  BAL: {
    name: "Baltimore Ravens",
    shortName: "BAL",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/1/16/Baltimore_Ravens_logo.svg",
    primaryColor: "#241773",
    secondaryColor: "#000000",
    conference: "AFC",
    division: "North"
  },
  CIN: {
    name: "Cincinnati Bengals",
    shortName: "CIN",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/8/81/Cincinnati_Bengals_logo.svg",
    primaryColor: "#FB4F14",
    secondaryColor: "#000000",
    conference: "AFC",
    division: "North"
  },
  CLE: {
    name: "Cleveland Browns",
    shortName: "CLE",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/d/d9/Cleveland_Browns_logo.svg",
    primaryColor: "#311D00",
    secondaryColor: "#FF3C00",
    conference: "AFC",
    division: "North"
  },
  PIT: {
    name: "Pittsburgh Steelers",
    shortName: "PIT",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/d/de/Pittsburgh_Steelers_logo.svg",
    primaryColor: "#000000",
    secondaryColor: "#FFB612",
    conference: "AFC",
    division: "North"
  },

  // AFC South
  HOU: {
    name: "Houston Texans",
    shortName: "HOU",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/2/28/Houston_Texans_logo.svg",
    primaryColor: "#03202F",
    secondaryColor: "#A71931",
    conference: "AFC",
    division: "South"
  },
  IND: {
    name: "Indianapolis Colts",
    shortName: "IND",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/0/00/Indianapolis_Colts_logo.svg",
    primaryColor: "#002C5F",
    secondaryColor: "#A2AAAD",
    conference: "AFC",
    division: "South"
  },
  JAX: {
    name: "Jacksonville Jaguars",
    shortName: "JAX",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/7/74/Jacksonville_Jaguars_logo.svg",
    primaryColor: "#006778",
    secondaryColor: "#D7A22A",
    conference: "AFC",
    division: "South"
  },
  TEN: {
    name: "Tennessee Titans",
    shortName: "TEN",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/c/c1/Tennessee_Titans_logo.svg",
    primaryColor: "#0C2340",
    secondaryColor: "#4B92DB",
    conference: "AFC",
    division: "South"
  },

  // AFC West
  DEN: {
    name: "Denver Broncos",
    shortName: "DEN",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/4/44/Denver_Broncos_logo.svg",
    primaryColor: "#FB4F14",
    secondaryColor: "#002244",
    conference: "AFC",
    division: "West"
  },
  KC: {
    name: "Kansas City Chiefs",
    shortName: "KC",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/e/e1/Kansas_City_Chiefs_logo.svg",
    primaryColor: "#E31837",
    secondaryColor: "#FFB81C",
    conference: "AFC",
    division: "West"
  },
  LV: {
    name: "Las Vegas Raiders",
    shortName: "LV",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/4/48/Las_Vegas_Raiders_logo.svg",
    primaryColor: "#000000",
    secondaryColor: "#C4C4C4",
    conference: "AFC",
    division: "West"
  },
  LAC: {
    name: "Los Angeles Chargers",
    shortName: "LAC",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/7/72/NFL_Chargers_logo.svg",
    primaryColor: "#0080C6",
    secondaryColor: "#FFC20E",
    conference: "AFC",
    division: "West"
  },

  // NFC East
  DAL: {
    name: "Dallas Cowboys",
    shortName: "DAL",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/4/47/Dallas_Cowboys_logo.svg",
    primaryColor: "#003594",
    secondaryColor: "#869397",
    conference: "NFC",
    division: "East"
  },
  NYG: {
    name: "New York Giants",
    shortName: "NYG",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/6/60/New_York_Giants_logo.svg",
    primaryColor: "#0B2265",
    secondaryColor: "#A71931",
    conference: "NFC",
    division: "East"
  },
  PHI: {
    name: "Philadelphia Eagles",
    shortName: "PHI",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/8/8e/Philadelphia_Eagles_logo.svg",
    primaryColor: "#004C54",
    secondaryColor: "#A5ACAF",
    conference: "NFC",
    division: "East"
  },
  WAS: {
    name: "Washington Commanders",
    shortName: "WAS",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/8/81/Washington_Commanders_logo.svg",
    primaryColor: "#5A1414",
    secondaryColor: "#FFB612",
    conference: "NFC",
    division: "East"
  },

  // NFC North
  CHI: {
    name: "Chicago Bears",
    shortName: "CHI",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/5/52/Chicago_Bears_logo.svg",
    primaryColor: "#0B162A",
    secondaryColor: "#C83803",
    conference: "NFC",
    division: "North"
  },
  DET: {
    name: "Detroit Lions",
    shortName: "DET",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/7/71/Detroit_Lions_logo.svg",
    primaryColor: "#0076B6",
    secondaryColor: "#B0B7BC",
    conference: "NFC",
    division: "North"
  },
  GB: {
    name: "Green Bay Packers",
    shortName: "GB",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/5/50/Green_Bay_Packers_logo.svg",
    primaryColor: "#203731",
    secondaryColor: "#FFB612",
    conference: "NFC",
    division: "North"
  },
  MIN: {
    name: "Minnesota Vikings",
    shortName: "MIN",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/4/48/Minnesota_Vikings_logo.svg",
    primaryColor: "#4F2683",
    secondaryColor: "#FFC62F",
    conference: "NFC",
    division: "North"
  },

  // NFC South
  ATL: {
    name: "Atlanta Falcons",
    shortName: "ATL",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/c/c5/Atlanta_Falcons_logo.svg",
    primaryColor: "#A71931",
    secondaryColor: "#000000",
    conference: "NFC",
    division: "South"
  },
  CAR: {
    name: "Carolina Panthers",
    shortName: "CAR",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/5/5c/Carolina_Panthers_logo.svg",
    primaryColor: "#0085CA",
    secondaryColor: "#101820",
    conference: "NFC",
    division: "South"
  },
  NO: {
    name: "New Orleans Saints",
    shortName: "NO",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/5/57/New_Orleans_Saints_logo.svg",
    primaryColor: "#D3BC8D",
    secondaryColor: "#000000",
    conference: "NFC",
    division: "South"
  },
  TB: {
    name: "Tampa Bay Buccaneers",
    shortName: "TB",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/a/a2/Tampa_Bay_Buccaneers_logo.svg",
    primaryColor: "#D50A0A",
    secondaryColor: "#34302B",
    conference: "NFC",
    division: "South"
  },

  // NFC West
  ARI: {
    name: "Arizona Cardinals",
    shortName: "ARI",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/7/72/Arizona_Cardinals_logo.svg",
    primaryColor: "#97233F",
    secondaryColor: "#000000",
    conference: "NFC",
    division: "West"
  },
  LAR: {
    name: "Los Angeles Rams",
    shortName: "LAR",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/8/81/Los_Angeles_Rams_logo.svg",
    primaryColor: "#003594",
    secondaryColor: "#FFA300",
    conference: "NFC",
    division: "West"
  },
  SF: {
    name: "San Francisco 49ers",
    shortName: "SF",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/3/3a/San_Francisco_49ers_logo.svg",
    primaryColor: "#AA0000",
    secondaryColor: "#B3995D",
    conference: "NFC",
    division: "West"
  },
  SEA: {
    name: "Seattle Seahawks",
    shortName: "SEA",
    logoUrl: "https://upload.wikimedia.org/wikipedia/en/2/24/Seattle_Seahawks_logo.svg",
    primaryColor: "#002244",
    secondaryColor: "#69BE28",
    conference: "NFC",
    division: "West"
  }
};

export const getTeamData = (shortName: string): TeamData | undefined => {
  return NFL_TEAMS[shortName];
};

export const getAllTeams = (): TeamData[] => {
  return Object.values(NFL_TEAMS);
}; 