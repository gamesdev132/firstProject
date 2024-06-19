import type { Timestamp } from 'firebase/firestore'
import type { ScoreItem } from '@/interface/score-item.interface'

export interface Game {
  date: Timestamp,
  gameName: string,
  scores: ScoreItem[]
}
