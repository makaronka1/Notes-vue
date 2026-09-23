<script setup>
import { ref } from 'vue'
import FileTreeNode from './FileTreeNode.vue'
import arrowIcon from '../assets/arrow.svg'

defineProps({
  tree: { type: Object, default: null },
  isLoading: { type: Boolean, default: true },
  error: { type: String, default: null }
})

const rootExpanded = ref(true)
const selected = ref(null)

function onSelect(node) { selected.value = node }
</script>

<template>
  <div class="side-bar">
    <div v-if="isLoading" class="loading">⏳ Загрузка файловой системы...</div>
    <div v-else-if="error" class="error">❌ Ошибка: {{ error }}</div>

    <ul v-else-if="tree" class="tree-root">
      <li class="tree-node root-tree-node">
        <div class="directory-item" @click="rootExpanded = !rootExpanded">
          <div v-show="rootExpanded" class="arrowContainer">
            <img :src="arrowIcon" alt="arrowIcon" class="arrow">
          </div>
          <div v-show="!rootExpanded" class="arrowContainer">
            <img :src="arrowIcon" alt="arrowIcon" class="arrow closed">
          </div>
          <span class="name">{{ tree.name }}</span>
        </div>

        <ul
          v-if="tree.children?.length"
          class="tree-children"
          :class="{ open: rootExpanded }"
        >
          <FileTreeNode
            v-for="child in tree.children"
            :key="child.path"
            :node="child"
            @select="onSelect"
          />
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped>
  .side-bar {
    height: calc(100vh - 36px);
    width: 300px;
    flex-shrink: 0;
    overflow-y: auto;
  }

  .tree-root { list-style: none; padding-left: 0; }

  .tree-node {
    list-style: none;
    padding-left: 4px;
    border-left: 1px solid #c7c7c7;
  }

  .root-tree-node {
    margin-top: 6px;
    margin-left: 6px;
    border: 0;
  }

  .tree-children {
    list-style: none;
    padding-left: 10px;
    margin: 0;
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition:
      max-height 0.01s ease-out,
      opacity 0.1s ease-out,
      padding 0.2s ease-out;
  }
  .tree-children.open {
    max-height: 2000px;
    opacity: 1;
  }

  .directory-item {
    display: flex;
    align-items: center;
    gap: 4px;
    width: 100%;
    box-sizing: border-box;
    color: #333333;
    user-select: none;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 4px 15px 4px 4px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.15s ease;
  }
  .directory-item:hover {
    background-color: #e8e8e8;
  }

  .arrowContainer {
    width: 12px;
    height: 12px;
    padding-left: 2px;
    display: flex;
    align-items: center;
  }

  .arrow {
    width: 8px;
    height: 8px;
    transform: rotate(180deg);
  }

  .closed {
    transform: rotate(90deg)
  }
  .icon { font-size: 14px; flex-shrink: 0; }
  .name { overflow: hidden; text-overflow: ellipsis; }
</style>