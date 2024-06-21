<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Button from 'primevue/button'

</script>

<template>
  <header>
    <div>
      <nav class="d-flex justify-around">
        <RouterLink to="/">
          <Button label="Derniers scores" link :style="{'font-size':'20px'}"/>
        </RouterLink>
        <RouterLink to="/new">
          <Button label="Nouvelle partie" link :style="{'font-size':'20px'}"/>
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
</style>