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

const openAddGameDialog = () => {
  orderList();
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
onMounted(() => {
  const scores = localStorage.getItem(SCORES_KEY)
  if (scores) {
    scoreList.value = JSON.parse(scores)
    scoreLength.value = scoreList.value[0]?.scores.length || 1
  } else {
    initialBasicGame()
  }
})

const canAddTour = computed(() => {
  let bool = true
  scoreList.value.forEach((item) => {
    if (item.scores[scoreLength.value - 1].val === undefined) bool = false
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
        <Column field="name" header="Nom" frozen :style="{'z-index': 1, 'background': '#121212'}">
          <template #body="slotProps">
            <InputText type="text" v-model="slotProps.data.name"
                       :style="{width:'120px'}"
            />
          </template>
        </Column>
        <Column v-for="( score, columnIndex ) in scoreLength"
                :key="columnIndex" field="name"
                :style="{width:'80px'}"
        >
          <template #header>
            <span :style="{width:'50px', 'text-align':'center'}">Tour {{ score }}</span>
          </template>
          <template #body="slotProps">
            <div :style="{ display: 'flex', 'justify-content':'center'}">
              <InputNumber v-model="slotProps.data.scores[columnIndex].val"
                           :inputStyle="{width:'50px'}"
                           input-class="space"
                           :max="MAX"
                           :min="MIN"
              />
            </div>
          </template>
        </Column>
        <Column field="total" header="Total"
                :style="{width:'80px'}"
        >
          <template #body="slotProps">
            <InputNumber v-model="slotProps.data.total" disabled :inputStyle="{width:'60px'}" />
          </template>
        </Column>
      </DataTable>
      <div class="d-flex d-col" :style="{gap:'15px', padding:'20px 10px'}">
        <Button severity="contrast" label="Tour supplémentaire" @click="addColumn" :disabled="!canAddTour"></Button>
        <Button severity="contrast" label="Joueur supplémentaire" @click="addPlayer"></Button>
        <Button severity="contrast" label="Trié la liste" @click="orderList"></Button>
        <Button severity="contrast" label="Supprimer joueurs sans nom" @click="deleteNoNamePlayers"></Button>
        <Button severity="contrast" label="Enregistrer les scores" @click="openAddGameDialog"></Button>
      </div>
    </div>
  </main>
</template>
<style>
@media (min-width: 450px) {
  .space {
    padding: 40px;
  }
}

.space {
  padding: 8px;
}
</style>