<script setup lang="ts">
import { ref } from 'vue'
import type { Note } from '../types/note'

const emit = defineEmits<{
// Add-Event um eine neue Notiz (ohne ID) an die Parent-Komponente zu senden
  add: [note: Omit<Note, 'id'>]
}>()

// Lokale Formular-States:
const title = ref('')
const content = ref('')
const tagsInput = ref('')

// Funktion zum Absenden der Notiz :
// Event wird ausgelöst und Eingabefelder werden zurückgesetzt
function submitNote() {
  const tags = tagsInput.value
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)

  emit('add', {
    title: title.value,
    content: content.value,
    tags
  })

  title.value = ''
  content.value = ''
  tagsInput.value = ''
}
</script>

<template>
  <form @submit.prevent="submitNote">
    <div>
      <label for="title">Titel</label>
      <input
        id="title"
        v-model="title"
        type="text"
        required
      >
    </div>

    <div>
      <label for="content">Text</label>
      <textarea
        id="content"
        v-model="content"
        required
      />
    </div>

    <div>
      <label for="tags">Tags</label>
      <input
        id="tags"
        v-model="tagsInput"
        type="text"
        placeholder="z. B. uni, vue, wichtig"
      >
    </div>

    <button type="submit">
      Notiz hinzufügen
    </button>
  </form>
</template>

<style scoped>
form {
  display: grid;
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  background-color: white;
}

form div {
  display: grid;
  gap: 6px;
}

label {
  font-weight: 600;
  color: #333;
}

button {
  justify-self: start;
}
</style>