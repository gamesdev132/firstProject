<script setup lang="ts">
import Card from 'primevue/card'
import { convertTimestampToFrenchFormat } from '@/utils/date.utils'

const props = defineProps(['game'])

const aleaEmojis = ['🤯', '🤔', '👹', '🤯', '😬']

let emojis = ['🥇', '🥈', '🥉'].concat(Array(props.game.scores.length - 3).fill(aleaEmojis[Math.floor(Math.random() * 6)]))

</script>

<template>
  <Card v-if="game">
    <template #title>{{ convertTimestampToFrenchFormat(props.game.date) + ' - ' + props.game.gameName }}</template>
    <template #content>
      <div class="d-flex d-col">
        <span v-for="(score, index) in props.game.scores"
              :key="index">
          {{ emojis[index] + ' ' + score.name + ' : ' + score.total + ' point' + ((score.total < -1 || score.total > 1) ? 's' : '') }}
        </span>
      </div>
    </template>
  </Card>
</template>

<style scoped>

</style>