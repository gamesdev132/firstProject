export interface Score {
  id: number,
  name: string,
  scores : Value[],
  total: number,
}

export interface Value {
  val: undefined|number
}