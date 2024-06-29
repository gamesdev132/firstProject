export function getDatabaseGameName(): string {
  return localStorage.getItem('database') ?? 'score'
}

export function setDatabaseGameName(dbName: string): void {
  let database: string = 'score'
  if (dbName === 'personal') {
    database = 'personalScores'
  }
  localStorage.setItem('database', database)
}

export function isDefaultDatabase(): boolean {
  return localStorage.getItem('database') === 'score'
}