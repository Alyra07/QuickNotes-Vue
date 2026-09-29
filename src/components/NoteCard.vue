<script setup lang="ts">
import BaseCard from './BaseCard.vue'
import type { Note } from '../types/note'

defineProps<{
  note: Note
}>()

const emit = defineEmits<{
  delete: [id: number]
}>()
</script>

<template>
  <BaseCard>
    <template #header>
      <h2>{{ note.title }}</h2>
    </template>

    <p>{{ note.content }}</p>

    <div v-if="note.tags.length > 0">
      <span
        v-for="tag in note.tags"
        :key="tag"
      >
        #{{ tag }}
      </span>
    </div>

    <button
      type="button"
      @click="emit('delete', note.id)"
    >
      Löschen
    </button>
  </BaseCard>
</template>