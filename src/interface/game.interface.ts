export interface Game {
  date: any,
  gameName: string,
  scores: ScoreItem[]
}

export interface ScoreItem{
  name: string,
  total: number,
}