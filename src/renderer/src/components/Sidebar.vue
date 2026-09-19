<script setup>

</script>

<template>
  <div class="side-bar">

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