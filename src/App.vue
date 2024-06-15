<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Button from 'primevue/button'

</script>

<template>
  <header>
    <div>

      <nav class="d-flex justify-around">
        <RouterLink to="/">
          <Button label="Home" link :style="{'font-size':'20px'}"/>
        </RouterLink>
        <RouterLink to="/podium">
          <Button label="Podium" link :style="{'font-size':'20px'}"/>
        </RouterLink>
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