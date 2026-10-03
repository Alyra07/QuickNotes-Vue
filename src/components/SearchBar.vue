<script setup>
defineProps(['modelValue'])
defineEmits(['update:modelValue'])
</script>

<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    placeholder="Suchen ..."
  >
</template>

<style scoped>
input {
  margin-bottom: 16px;
  border: 2px solid #7a4de8;
  background-color: white;
  box-shadow: 0 2px 8px rgba(122, 77, 232, 0.12);
}
</style>