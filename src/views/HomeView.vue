<script setup lang="ts">
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { computed, onMounted, ref, watch } from 'vue'
import type { Score } from '@/interface/score.interface'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const MAX = 999
const SCORES_KEY = 'scores'
const scoreLength = ref<number>(1)
const scoreList = ref<Score[]>([])

onMounted(()=>{
  const scores = localStorage.getItem(SCORES_KEY)
  if (scores) {
    scoreList.value = JSON.parse(scores)
    scoreLength.value = scoreList.value[0]?.scores.length || 1
  }else{
    initialBasicGame()
  }
})

const canAddTour = computed(()=>{
  let bool = true;
  scoreList.value.forEach((item) => {
    if (item.scores[scoreLength.value - 1].val === undefined) bool = false;
  })
  return bool
})

function initialBasicGame(){
  scoreList.value =[
    { id: 0, name: '', scores: [{ val: undefined }], total: 0 },
    { id: 1, name: '', scores: [{ val: undefined }], total: 0 },
  ]
  scoreLength.value = 1
}
const computeTotals = (id: number) => {
  const playerScore = scoreList.value.find((item) => item.id === id)
  if (playerScore) {
    let total = 0
    playerScore.scores.forEach((item) => {
      if (item.val) total += item.val
    })
    playerScore.total = total
  }
}

function addColumn() {
  scoreLength.value += 1
  scoreList.value.forEach((item) => {
    item.scores.push({ val: undefined })
  })
}

function addPlayer() {
  scoreList.value.push({
    id: scoreLength.value,
    name: '',
    scores: Array.from({ length: scoreLength.value }, () => ({ val: undefined })),
    total: 0
  })
}

function orderList(){
  scoreList.value = scoreList.value.slice().sort((a, b) => b.total - a.total)
}

function saveScores(){
  localStorage.removeItem(SCORES_KEY)
  scoreList.value = []
  scoreLength.value = 1
  initialBasicGame()
}

watch(scoreList, (newValue) => {
  newValue.forEach(player => computeTotals(player.id))
  localStorage.setItem(SCORES_KEY, JSON.stringify(scoreList.value))
}, { deep: true })
</script>

<template>
  <main>
    <DataTable :value="scoreList" tableStyle="min-width: 50rem" style="padding: 40px">
      <Column field="name" header="Name">
        <template #body="slotProps">
          <InputText type="text" v-model="slotProps.data.name" />
          <!--<Button icon="pi pi-check" />-->
        </template>
      </Column>
      <Column v-for="( score, columnIndex ) in scoreLength" :key="columnIndex" field="name" :header="'Manche ' + score">
        <template #body="slotProps">
          <InputNumber v-model="slotProps.data.scores[columnIndex].val"
                       :inputStyle="{width:'50px', margin:'0px 10px'}"
                       input-class="space"
                       :max="MAX"
          />
        </template>
      </Column>
      <Column field="total" header="Total" :style="{width:'50px'}">
        <template #body="slotProps">
          <InputNumber v-model="slotProps.data.total" disabled :inputStyle="{width:'60px'}" />
        </template>
      </Column>
    </DataTable>
    <Button severity="danger" label="Tour supplémentaire" @click="addColumn" :disabled="!canAddTour"></Button>
    <Button severity="danger" label="Joueur supplémentaire" @click="addPlayer"></Button>
    <Button severity="danger" label="Order list" @click="orderList"></Button>
    <Button severity="danger" label="Clear scores" @click="saveScores"></Button>
  </main>
</template>
