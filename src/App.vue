<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Button from 'primevue/button'
import { ref } from 'vue'
import InputNumber from 'primevue/inputnumber'

const max = 999;
const scores = ref([
  { id: 1, name: 'Jean', scores: [{ val: undefined }, { val: undefined }], total: 0 },
  { id: 2, name: 'Paul', scores: [{ val: undefined }, { val: undefined }], total: 0 },
  { id: 3, name: 'Mattéo', scores: [{ val: undefined }, { val: undefined }], total: 0 }
])

const computeTotals = (id: number) => {
  const playerScore = scores.value.find((item) => item.id === id)
  if (playerScore) {
    let total = 0
    console.log(playerScore)
    playerScore.scores.forEach((item) => {
      if (item.val) total += item.val
      console.log(total, item.val)
    })
    playerScore.total = total
  }
}

function addColumn() {
  scores.value.forEach((item) => {
    item.scores.push({ val: undefined })
  })
}

</script>

<template>
  <header>
    <div class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.d-flex {
  display: flex;
}

.list-item{
  padding: 10px;
}

.space{
  padding: 20px;
}

.val {
  height: 100px;
  width: 50px !important;
}
</style>