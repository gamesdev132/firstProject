import { Timestamp } from 'firebase/firestore'

export function convertDateToFrenchFormat(date: Date): string {
  const day: string = String(date.getDate()).padStart(2, '0')
  const month: string = String(date.getMonth() + 1).padStart(2, '0')
  const year: number = date.getFullYear()

  return `${day}/${month}/${year}`
}

export function getCurrentDateMinusDaysFormatted(days: number): Timestamp {
  const currentDate: Date = new Date()
  currentDate.setDate(currentDate.getDate() + days)

  return convertDateStringToTimestamp(convertDateToFrenchFormat(currentDate))
}

export function convertDateStringToTimestamp(dateString: string): Timestamp {
  const parts = dateString.split('/')
  if (parts.length !== 3) {
    return Timestamp.now()
  }

  const date = new Date(
    parseInt(parts[2], 10),
    parseInt(parts[1], 10) - 1,
    parseInt(parts[0], 10)
  )

  return Timestamp.fromDate(date) ?? Timestamp.now()
}

export function getAllTimeStampsInRange(startDate: Timestamp, endDate: Timestamp): Timestamp[] {
  const timestamps: Timestamp[] = [];
  const currentDate:Date = new Date(startDate.toDate());

  while (currentDate <= endDate.toDate()) {
    timestamps.push(Timestamp.fromDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return timestamps;
}