import { db } from '@/firebase';
import { collection, getDocs, addDoc, Timestamp } from 'firebase/firestore';
import type { Game } from '@/interface/game.interface'
export async function fetchItems(){
  const querySnapshot = await getDocs(collection(db, 'score'));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export async function addGame(game : Game){
  await addDoc(collection(db, 'score'), game);
  console.log(await fetchItems());
}