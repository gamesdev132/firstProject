<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { inject, onMounted, ref, type Ref } from 'vue'
import type { ScoreItem } from '@/interface/game.interface'
import { addGame } from '@/services/score.service'
import InputMask from 'primevue/inputmask'
import { getCurrentDateFormatted } from '@/utils/date.utils'

const dialogRef = inject<Ref<{data: {scoreList: ScoreItem[]},close: (options?: { success: boolean }) => void}>>('dialogRef');
const scoreList = ref<ScoreItem[]>([]);
const date = ref()
const gameName = ref()

onMounted(() => {
  if (dialogRef){
    console.log(dialogRef.value.data.scoreList)
    scoreList.value = dialogRef.value.data.scoreList
  }
  date.value = getCurrentDateFormatted()
})
async function createGame(){
  await addGame({
    scores: scoreList.value,
    gameName: gameName.value,
    date: date.value
  })
  dialogRef?.value?.close({success: true})
}
</script>

<template>
  Date de la partie
  <InputMask id="basic" v-model="date" mask="99/99/9999" slotChar="dd/mm/yyyy" />
  <div class="flex items-center gap-4 mb-4">
      <label for="username" class="font-semibold w-24">Nom du jeu</label>
      <InputText id="username" v-model="gameName" class="flex-auto" autocomplete="off" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Save" @click="createGame"></Button>
    </div>
</template>

<style scoped>

</style>