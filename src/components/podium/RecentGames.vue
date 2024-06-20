<script setup lang="ts">
import GameClassement from '@/components/podium/GameClassement.vue'
import { onMounted, ref } from 'vue'
import { getGamesFromLastXDays } from '@/services/score.service'
import type { Game } from '@/interface/game.interface'

const games = ref<Game[]>([])

onMounted(async () => {
  games.value = await getGamesFromLastXDays()
})
</script>

<template>
  <div v-if="games.length > 0" class="d-flex" style="{flex-wrap:wrap}">
    <GameClassement v-for="game in games" :game="game" :key="game.date" />
  </div>
</template>

<style scoped>

</style>