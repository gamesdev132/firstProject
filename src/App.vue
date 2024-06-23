<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Button from 'primevue/button'
</script>

<template>
  <header>
    <div>
      <nav class="d-flex justify-around">
        <RouterLink to="/">
          <Button label="Derniers scores" link class="font-size-20" />
        </RouterLink>
        <RouterLink to="/new">
          <Button label="Nouvelle partie" link class="font-size-20" />
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
