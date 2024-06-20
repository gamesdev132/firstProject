<script setup lang="ts">
import RecentGames from '@/components/podium/RecentGames.vue'
</script>

<template>
  <div class="about">
    <RecentGames></RecentGames>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
