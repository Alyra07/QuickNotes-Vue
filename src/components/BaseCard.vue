<template>
  <div class="card">
    <div v-if="$slots.header" class="card-header">
      <slot name="header" />
    </div>

    <div class="card-body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.card {
  margin-top: 20px;
  border: 1px solid #d9d9d9;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.card-header {
  padding: 18px 20px 10px;
  border-bottom: 1px solid #e4e4e4;
}

.card-body {
  padding: 18px 20px;
}
</style>