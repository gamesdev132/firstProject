<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Button from 'primevue/button'
import { useDialog } from 'primevue/usedialog'
import ChangeDatabaseDialog from '@/components/ChangeDatabaseDialog.vue'
import DynamicDialog from 'primevue/dynamicdialog'

const dialog = useDialog()

function openChangeDatabaseDialog() {
  dialog.open(ChangeDatabaseDialog, {
    props: {
      header: 'Changer la base de données',
      modal: true
    },
    onClose() {
      location.reload()
    }
  })
}
</script>

<template>
  <header>
    <DynamicDialog />
    <div>
      <nav class="d-flex justify-around">
        <RouterLink to="/">
          <Button label="Derniers scores" link class="font-size-20" />
        </RouterLink>
        <RouterLink to="/new">
          <Button label="Nouvelle partie" link class="font-size-20" />
        </RouterLink>
        <Button icon="pi pi-user" @click="openChangeDatabaseDialog" />
      </nav>
    </div>
  </header>

  <RouterView />
</template>
