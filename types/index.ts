export type Team = {
  name: string
  score: number
}

export type Game = {
  targetScore: number
  durationInMinutes: number
  remainingTime: number
  running: boolean
  scoreReleased: boolean
}

export type AppState = {
  teamA: Team
  teamB: Team
  game: Game
}
