
export interface Player {
  id: number;
  imageUrl: string;
}

export interface Team {
  id: string;
  name: string;
  fund: number;
  players: Player[];
}

export interface AuctionSetup {
  trophyName: string;
  totalPlayers: number;
  initialFund: number;
}
