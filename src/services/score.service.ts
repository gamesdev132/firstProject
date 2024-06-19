import { db } from '@/firebase'
import { addDoc, collection, getDocs, query, Timestamp, where } from 'firebase/firestore'
import type { Game } from '@/interface/game.interface'
import { getCurrentDateMinusDaysFormatted, getAllTimeStampsInRange } from '@/utils/date.utils'

const scoreCollection = collection(db, 'score')
const DATES_SPACE = 5

export async function fetchItems() {
  const querySnapshot = await getDocs(scoreCollection)
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
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