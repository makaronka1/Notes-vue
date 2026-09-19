<script setup>
import { reactive } from 'vue'

</script>

<template>
  <div class="navbar">
    <ul class="navbar-list">
      <li class="navbar-list-item" id="add-file-btn">
        <img src="../assets/file.svg" alt="" srcset="" class="icon navbar-list-item">
      </li>
      <li class="navbar-list-item" id="add-folder-btn">
        <img src="../assets/folder.svg" alt="" srcset="" class="icon navbar-list-item">
      </li>
      <li class="navbar-list-item" id="refresh-btn">
        <img src="../assets/refresh.svg" alt="" srcset="" class="icon navbar-list-item">
      </li>
      <li class="navbar-list-item" id="settings-btn">
        <img src="../assets/settings.svg" alt="" srcset="" class="icon navbar-list-item">
      </li>
    </ul>
  </div>
</template>

<style>
  .navbar {
    height: 33px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #d5d5d5;
    border-top: 1px solid #d5d5d5;
  }

  .navbar-list {
    list-style: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .navbar-list-item {
    height: 24px;
    width: 24px;
    cursor: pointer;
  }
</style>