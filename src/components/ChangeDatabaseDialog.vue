<script setup lang="ts">
import { inject, type Ref, ref } from 'vue'
import InputText from 'primevue/inputtext'
import Select from 'primevue/select'
import Button from 'primevue/button'
import type { DatabaseInfo } from '@/interface/database-info'
import { setDatabaseGameName } from '@/services/localStorage.service'

const dialogRef = inject<Ref<{
  close: (options?: { success: boolean }) => void
}>>('dialogRef')
const selectedDatabase = ref<DatabaseInfo | null>(null)
const password = ref('')
const globalError = ref('')
const databases: DatabaseInfo[] = [
  { name: 'Défaut', code: 'default', password: 'Wgames' },
  { name: 'Personnelle', code: 'personal', password: 'Neuille' }
]

function changeDatabase() {
  if (selectedDatabase.value && password.value === selectedDatabase.value.password) {
    setDatabaseGameName(selectedDatabase.value.code)
    dialogRef?.value?.close()
  } else {
    globalError.value = 'Le mot de passe ne correspond pas'
  }
}
</script>

<template>
  <div class="d-flex d-col pt-2">
    <label for="username" class="pb-1">Base de données</label>
    <Select v-model="selectedDatabase" :options="databases" optionLabel="name" placeholder="Select a database"
            class="w-full md:w-56" />
  </div>
  <div class="d-flex d-col pt-2">
    <label for="username" class="pb-1">Mot de passe</label>
    <InputText id="username" v-model="password" class="flex-auto" autocomplete="off" />
  </div>
  <span class="d-flex justify-end pt-2 error-color">{{ globalError }}</span>
  <div class="d-flex justify-end pt-2">
    <Button type="button" label="Sauvegarder" @click="changeDatabase" />
  </div>
</template>
