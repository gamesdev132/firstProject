<script setup lang="ts">
import GameScores from '@/components/podium/GameScores.vue'
import { onMounted, ref } from 'vue'
import { getGamesFromLastXDays } from '@/services/score.service'
import type { Game } from '@/interface/game.interface'

const games = ref<Game[]>([])

onMounted(async () => {
  games.value = await getGamesFromLastXDays()
})
</script>

<template>
  <div v-if="games.length > 0" class="d-flex items-start wrap align-list">
    <GameScores v-for="game in games" :game="game" :key="game.date" />
  </div>
</template>

<style scoped>
@media(max-width: 900px){
  .align-list{
    justify-content: center;
  }
}
.align-list{
  justify-content: flex-start;
}
</style>