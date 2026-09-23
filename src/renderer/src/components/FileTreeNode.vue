<script setup>
import { ref, computed } from 'vue'
import FileTreeNode from './FileTreeNode.vue'
import fileIcon from '../assets/fileSidebarIcon.svg'
import arrowIcon from '../assets/arrow.svg'


const props = defineProps({
  node: { type: Object, required: true },
  defaultExpanded: { type: Boolean, default: false }
})

const emit = defineEmits(['select'])

const expanded = ref(props.defaultExpanded)

const hasChildren = computed(
  () =>
    props.node.isDirectory &&
    Array.isArray(props.node.children) &&
    props.node.children.length > 0
)

function handleClick() {
  emit('select', props.node)
  if (props.node.isDirectory) expanded.value = !expanded.value
}
</script>

<template>
  <li class="tree-node" :class="{ 'is-dir': node.isDirectory, 'is-file': node.isFile }">
    <div
      :class="node.isDirectory ? 'directory-item' : 'file-item'"
      @click="handleClick"
    >
      <div v-if="node.isDirectory" v-show="expanded" class="arrowContainer">
        <img :src="arrowIcon" alt="arrowIcon" class="arrow">
      </div>
      <div v-if="node.isDirectory" v-show="!expanded" class="arrowContainer">
        <img :src="arrowIcon" alt="arrowIcon" class="arrow closed">
      </div>

      <span class="icon" v-if="node.isFile"><img :src="fileIcon"></span>
      <span class="name">{{ node.name }}</span>
    </div>

    <ul
      v-if="node.isDirectory"
      class="tree-children"
      :class="{ open: expanded }"
    >
      <li v-if="!hasChildren" class="empty-hint">Папка пуста</li>

      <FileTreeNode
        v-for="child in node.children"
        :key="child.path"
        :node="child"
        @select="emit('select', $event)"
      />
    </ul>
  </li>
</template>

<style scoped>
  .tree-node {
    list-style: none;
    padding-left: 4px;
    border-left: 1px solid #c7c7c7;
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

  .file-item,
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

  .file-item:hover,
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
  .arrow.placeholder { visibility: hidden; }
  .icon { font-size: 14px; flex-shrink: 0; display: flex; align-items: center;}
  .name { overflow: hidden; text-overflow: ellipsis; }

  img {
    max-width: 16px; height: 16px;
  }

  .empty-hint {
    list-style: none;
    padding: 4px 15px 4px 16px;
    color: #999;
    font-style: italic;
    font-size: 13px;
    user-select: none;
    white-space: nowrap;
  }
</style>