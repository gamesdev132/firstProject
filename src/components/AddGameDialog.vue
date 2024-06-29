<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { inject, onMounted, ref, type Ref } from 'vue'
import type { ScoreItem } from '@/interface/score-item.interface'
import { addGame, getAvailableDates } from '@/services/score.service'
import InputMask from 'primevue/inputmask'
import { convertDateStringToTimestamp, convertDateToFrenchFormat } from '@/utils/date.utils'
import { Timestamp } from 'firebase/firestore'
import { isDefaultDatabase } from '@/services/localStorage.service'

const dialogRef = inject<Ref<{
  data: { scoreList: ScoreItem[] },
  close: (options?: { success: boolean }) => void
}>>('dialogRef')
const restrictedDates = ref<Timestamp[]>([])
const globalError = ref<string | null>(null)
const scoreList = ref<ScoreItem[]>([])
const date = ref()
const gameName = ref()

onMounted(async () => {
  if (dialogRef) {
    scoreList.value = dialogRef.value.data.scoreList
  }
  date.value = convertDateToFrenchFormat(new Date())
  if (isDefaultDatabase()) {
    restrictedDates.value = await getDates()
  }
})

async function createGame() {
  if (gameName.value === '' || gameName.value === ' ') {
    globalError.value = 'La partie doit avoir un nom'
  } else {
    const dateToTimeStamp = convertDateStringToTimestamp(date.value)
    if (restrictedDates.value.length > 0 &&
      restrictedDates.value.findIndex(item => item.isEqual(dateToTimeStamp)) === -1) {
      globalError.value = 'Un score a déjà été renseigné pour cette journée'
    } else {
      await addGame({
        scores: scoreList.value,
        gameName: gameName.value,
        date: dateToTimeStamp
      })
      dialogRef?.value?.close({ success: true })
    }

  }
}

async function getDates(): Promise<Timestamp[]> {
  return await getAvailableDates()
}
</script>

<template>
  <div class="d-flex d-col">
    <label for="gameDate" class="pb-1">Date de la partie</label>
    <InputMask id="gameDate" v-model="date" mask="99/99/9999" slotChar="dd/mm/yyyy" />
  </div>
  <div class="d-flex d-col pt-2">
    <label for="username" class="pb-1">Nom du jeu</label>
    <InputText id="username" v-model="gameName" class="flex-auto" autocomplete="off" />
  </div>
  <span class="d-flex justify-end pt-2 error-color">{{ globalError }}</span>
  <div class="d-flex justify-end pt-2">
    <Button type="button" label="Save" @click="createGame" />
  </div>
</template>

<style scoped>
.error-color {
  color: #f13030
}
</style>