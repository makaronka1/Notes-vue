<script setup>
  defineProps({
    tree: { type: Object, default: null },
    isLoading: { type: Boolean, default: true },
    error: { type: String, default: null }
  })
</script>

<template>
  <div class="side-bar">
    <div v-if="isLoading" class="loading">
      ⏳ Загрузка файловой системы...
    </div>
    

    <div v-else-if="error" class="error">
      ❌ Ошибка: {{ error }}
    </div>
    
    <!-- 3. Данные успешно загружены -->
    <div v-else-if="tree" class="root-info">
      <h3>📁 {{ tree.name }}</h3>
      <p class="path">{{ tree.path }}</p>
      <p class="type">Это {{ tree.isDirectory ? 'папка' : 'файл' }}</p>
    </div>
  </div>
</template>

<style>
  .side-bar {
    height: calc(100vh - 36px);
    width: 300px;
    flex-shrink: 0;
    overflow-y: auto;
  }

  .side-bar::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }
</style>