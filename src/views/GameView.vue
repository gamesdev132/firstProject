<script setup lang="ts">
import AddGameDialog from '@/components/AddGameDialog.vue'
import type { Score } from '@/interface/score.interface'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import InputNumber from 'primevue/inputnumber'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import DynamicDialog from 'primevue/dynamicdialog'
import { useDialog } from 'primevue/usedialog'
import type { DynamicDialogCloseOptions } from 'primevue/dynamicdialogoptions'
import { computed, onMounted, ref, watch } from 'vue'


const dialog = useDialog()

const MAX = 999
const MIN = -9
const SCORES_KEY = 'scores'
const scoreLength = ref<number>(1)
const scoreList = ref<Score[]>([])
const averages = ref<number[]>([])

onMounted(() => {
  const scores = localStorage.getItem(SCORES_KEY)
  if (scores) {
    scoreList.value = JSON.parse(scores)
    scoreLength.value = scoreList.value[0]?.scores.length || 1
  } else {
    initialBasicGame()
  }
})

const openAddGameDialog = () => {
  orderList()
  dialog.open(AddGameDialog, {
    props: {
      header: 'Ajouter une partie',
      modal: true
    },
    data: {
      scoreList: scoreList.value.map((item) => {
        return { name: item.name, total: item.total }
      })
    },
    onClose(options?: DynamicDialogCloseOptions) {
      if (options && options.data && options.data.success) {
        localStorage.removeItem(SCORES_KEY)
        scoreList.value = []
        scoreLength.value = 1
        initialBasicGame()
      }
    }
  })
}

const canAddTour = computed(() => {
  let bool = true
  scoreList.value.forEach((item) => {
    if (item.scores[scoreLength.value - 1].val === undefined) bool = false
  })
  return bool
})

const canCreateGame = computed(() => {
  let bool = true
  scoreList.value.forEach((item) => {
    if (item.scores[0].val === undefined || item.name === '') bool = false
  })
  return bool
})

function initialBasicGame() {
  scoreList.value = [
    { id: 0, name: '', scores: [{ val: undefined }], total: 0 },
    { id: 1, name: '', scores: [{ val: undefined }], total: 0 }
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
    id: scoreList.value.length,
    name: '',
    scores: Array.from({ length: scoreLength.value }, () => ({ val: undefined })),
    total: 0
  })
}

function orderList() {
  scoreList.value = scoreList.value.slice().sort((a, b) => a.total - b.total)
}

function deleteNoNamePlayers() {
  scoreList.value = scoreList.value.filter(item => item.name.trim() !== '' && item.scores[0].val !== undefined)
}

function calculateAverages() {
  let index = scoreLength.value;
  averages.value = []
  while (index > 0){
    let average = 0
    scoreList.value.forEach((item) => {
      average += item.scores[index - 1].val ?? 0
    })
    averages.value.unshift(average)
    index = index -1
  }
}

watch(scoreList, (newValue) => {
  newValue.forEach(player => computeTotals(player.id))
  localStorage.setItem(SCORES_KEY, JSON.stringify(scoreList.value))
}, { deep: true })
</script>

<template>
  <main>
    <DynamicDialog />
    <div class="space">
      <DataTable :value="scoreList" scrollable>
        <Column field="name" frozen class="list-background-color z-1">
          <template #header><span class="list-background-color w-100">Nom</span></template>
          <template #body="slotProps">
            <InputText type="text" v-model="slotProps.data.name" class="w-120" />
          </template>
        </Column>
        <Column v-for="( score, columnIndex ) in scoreLength"
                :key="columnIndex" field="name" class="w-80"
        >
          <template #header>
            <span class="w-50 text-center">Tour {{ score }}</span>
          </template>
          <template #body="slotProps">
            <div :style="{ display: 'flex', 'justify-content':'center'}">
              <InputNumber v-model="slotProps.data.scores[columnIndex].val"
                           inputClass="w-50 space"
                           :max="MAX"
                           :min="MIN"
              />
            </div>
          </template>
        </Column>
        <Column field="total" header="Total" class="w-80">
          <template #body="slotProps">
            <InputNumber v-model="slotProps.data.total" disabled inputClass="w-60" />
          </template>
        </Column>
      </DataTable>
      <div v-if="averages.length" class="d-flex justify-end pr-5">
        Moyennes : {{ averages }}
      </div>
      <div class="d-flex d-col buttons">
        <Button severity="contrast" label="Tour supplémentaire" @click="addColumn" :disabled="!canAddTour"></Button>
        <Button severity="contrast" label="Joueur supplémentaire" @click="addPlayer"></Button>
        <Button severity="contrast" label="Trié la liste" @click="orderList"></Button>
        <Button severity="contrast" label="Supprimer joueurs sans nom" @click="deleteNoNamePlayers"></Button>
        <Button severity="contrast" label="Caluculer les moyennes" @click="calculateAverages"></Button>
        <Button severity="contrast" label="Enregistrer les scores" @click="openAddGameDialog"
                :disabled="!canCreateGame"></Button>
      </div>
    </div>
  </main>
</template>
<style>
.list-background-color {
  background-color: var(--background);
  color: var(--text-color);
}

@media (min-width: 450px) {
  .space {
    padding: 40px;
  }
}

.space {
  padding: 8px;
}

.w-120 {
  width: 120px
}

.w-80 {
  width: 80px
}

.w-60 {
  width: 60px;
}

.w-50 {
  width: 50px;
}

.w-100 {
  width: 100%;
}

.buttons {
  gap: 15px;
  padding: 20px 10px;
}

</style>