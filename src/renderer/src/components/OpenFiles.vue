<script setup>

</script>

<template>
  <div class="open-files-wrapper">
    <div class="open-files-container"></div>
  </div>
</template>

<style>
  .open-files-wrapper {
    display: flex;
    overflow-x: auto;
    overflow-y: hidden;
    flex: 1;
    width: 100%;
    flex-wrap: nowrap;
  }

  .open-files-wrapper::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }

  .open-files-container {
    position: relative;
    display: flex;
    min-width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    height: 33px;
    white-space: nowrap;
    background-color: #e7e7e76e;
    border-bottom: 1px solid #d5d5d5;
    border-top: 1px solid #d5d5d5;
    width: auto;
    flex-shrink: 0;
  }

  .open-files-element {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 200px;
    min-width: 200px;
    height: 32px;
    border-right: 1px solid #d5d5d5;
    flex-shrink: 0;
    cursor: pointer;
    transition: background-color 0.15s ease, color 0.15s ease;
    user-select: none;
  }

  .open-files-element.active {
    background-color: white;
    z-index: 2;
    position: relative;
    width: auto;
  }

  .open-files-element:focus {
    outline: none;
  }

  .open-files-element.active::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 1px;
    background-color: white;
    z-index: 3;
  }

  .open-files-element:hover {
    background-color: #e8e8e8;
  }

  .open-files-element > span {
    color: #333333;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 10px;
  }

  .open-files-element.active > span {
    text-overflow: clip;
  }

  .open-files-element.temporary > span {
    font-style: italic;
  }
</style>