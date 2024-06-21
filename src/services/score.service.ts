import { db } from '@/firebase'
import { addDoc, collection, getDocs, query, Timestamp, where, orderBy } from 'firebase/firestore'
import type { Game } from '@/interface/game.interface'
import { getCurrentDateMinusDaysFormatted, getAllTimeStampsInRange } from '@/utils/date.utils'

const scoreCollection = collection(db, 'score')
const DATES_SPACE = 5

export async function getGamesFromLastXDays(days= 31): Promise<Game[]> {
  const startDate: Timestamp = getCurrentDateMinusDaysFormatted(-days)
  const querySnapshot = await getDocs(query(
    scoreCollection,
    where('date', '>=', startDate),
    orderBy('date', 'desc'),
  ))
  return querySnapshot.docs.map(doc => (
    doc.data() as Game
  ))
}

export async function addGame(game: Game) {
  await addDoc(scoreCollection, game)
}

export async function getAvailableDates() {
  const startDate: Timestamp = getCurrentDateMinusDaysFormatted(-DATES_SPACE)
  const endDate: Timestamp = getCurrentDateMinusDaysFormatted(0)

  const querySnapshot = await getDocs(query(
    scoreCollection,
    where('date', '>=', startDate),
    where('date', '<=', endDate)
  ))

  const timeStampInDb: Timestamp[] = []
  querySnapshot.forEach((doc) => {
    timeStampInDb.push(doc.data().date)
  })
  let timeStampList = getAllTimeStampsInRange(startDate, endDate)
  timeStampInDb.forEach((inDb) => {
    timeStampList = timeStampList.filter((item) => item.seconds !== inDb.seconds
  )
  })
  return timeStampList
}