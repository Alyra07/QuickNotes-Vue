<script setup>
import { ref } from 'vue'
import NoteForm from './components/NoteForm.vue'
import NoteCard from './components/NoteCard.vue'
import SearchBar from './components/SearchBar.vue'
import { useNotes } from './composables/useNotes.js'

const searchTerm = ref('')

const {
  addNote,
  deleteNote,
  filteredNotes
} = useNotes()

const visibleNotes = filteredNotes(searchTerm)
</script>

<template>
  <main>
    <h1>QuickNotes</h1>

    <NoteForm @add="addNote" />

    <SearchBar v-model="searchTerm" />

    <div v-if="visibleNotes.length > 0">
      <NoteCard
        v-for="note in visibleNotes"
        :key="note.id"
        :note="note"
        @delete="deleteNote"
      />
    </div>

    <p v-else>
      Keine Notizen gefunden.
    </p>
  </main>
</template>