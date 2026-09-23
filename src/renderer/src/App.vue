<script setup>
import Versions from './components/Versions.vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import OpenFiles from './components/OpenFiles.vue'
import MainPlace from './components/MainPlace.vue'
import { ref, reactive, onMounted } from 'vue'

const ipcHandle = () => window.electron.ipcRenderer.send('ping')

import { createFileTree, pathToObject } from './composables/useFileTree.js';

//const targetPath = 'C:\\Users\\pavel\\Desktop\\electronnotes'
const targetPath = '/home/zmv/Рабочий стол/notest test/'

const tree = ref(null)
const isLoading = ref(true)
const error = ref(null)

async function initTree() {
  try {
    isLoading.value = true
    error.value = null
    
    const plain = await pathToObject(targetPath)
    
    tree.value = reactive(plain)
    window.debugTree = tree.value

    await createFileTree(tree.value)
    
    console.log('Дерево построено:', tree.value)
  } catch (err) {
    console.error('Ошибка при построении дерева:', err)
    error.value = err.message || 'Не удалось загрузить файлы'
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  initTree()
})

</script>

<template>
  <!-- <img alt="logo" class="logo" src="./assets/electron.svg" />
  <div class="creator">Powered by electron-vite</div>
  <div class="text">
    Build an Electron app with
    <span class="vue">Vue</span>
  </div>
  <p class="tip">Please try pressing <code>F12</code> to open the devTool</p>
  <div class="actions">
    <div class="action">
      <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">Documentation</a>
    </div>
    <div class="action">
      <a target="_blank" rel="noreferrer" @click="ipcHandle">Send IPC</a>
    </div>
  </div>
  <Versions /> -->
  <div class="container">
    <div class="side-bar-container">
      <Navbar />
      <Sidebar 
        :tree="tree" 
        :is-loading="isLoading" 
        :error="error" 
      />
    </div>
    
    <div class="main-place-container">
      <OpenFiles />
      <MainPlace />
    </div>
  </div>
</template>

<style>
  .container {
    display: flex;
    flex-direction: row;
    width: 100%;
    max-width: 2560px;
    margin: 0px auto;
    position: relative;
    min-height: 100vh;
    font-size: 18px;
    overflow-x: hidden;
  }

  .side-bar-container {
    width: 300px;
    max-height: 1440px;
    background-color: #e7e7e76e;
    position: fixed;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #d5d5d5;
    flex-shrink: 0;
  }

  .icon {
    cursor: pointer;
    user-select: none;
  }

  .main-place-container {
    flex: 1;
    height: 100%;
    background-color: white;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-left: 300px;
    width: calc(100% - 300px);
    gap: 15px;
    overflow: hidden;
  }
</style>

