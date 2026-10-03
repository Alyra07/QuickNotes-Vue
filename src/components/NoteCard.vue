<script setup lang="ts">
import BaseCard from './BaseCard.vue'
import type { Note } from '../types/note'

// 

defineProps<{
  note: Note
}>()

const emit = defineEmits<{
  delete: [id: number]
}>()
</script>

<template>
  <BaseCard>
    <!-- Header (title) -->
    <template #header>
      <h2>{{ note.title }}</h2>
    </template>
    <!-- Content -->
    <p>{{ note.content }}</p>
    <!-- Tags -->
    <div class="tags" v-if="note.tags.length > 0">
      <span
        v-for="tag in note.tags"
        :key="tag"
      >
        #{{ tag }}
      </span>
    </div>
    <!-- Delete Button -->
    <button
      type="button"
      @click="emit('delete', note.id)"
    >
      Löschen
    </button>
  </BaseCard>
</template>

<style scoped>
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

span {
  padding: 4px 8px;
  border-radius: 16px;
  background-color: #eee6ff;
  border: 1px solid #c5a9ff;
  color: #5f35b5;
  font-size: 0.85rem;
}

button {
  background-color: white;
  color: #b3261e;
  border: 1px solid #d9a09b;
}

button:hover {
  background-color: #fff1f0;
}
</style>