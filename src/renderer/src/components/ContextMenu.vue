<script setup>
import { onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  x: Number,
  y: Number,
  node: Object
})
const emit = defineEmits(['close', 'action'])

function onKey(e) { if (e.key === 'Escape') emit('close') }
function onAnyClick() { emit('close') }

onMounted(() => {
  // capture:true — чтобы клик по любому месту страницы закрывал меню,
  // даже если он всплывает от элементов с @click.stop
  window.addEventListener('mousedown', onAnyClick, true)
  window.addEventListener('keydown', onKey)
  window.addEventListener('blur', onAnyClick)
})
onUnmounted(() => {
  window.removeEventListener('mousedown', onAnyClick, true)
  window.removeEventListener('keydown', onKey)
  window.removeEventListener('blur', onAnyClick)
})

const items = computed(() => {
  if (!props.node) return []
  if (props.node.isDirectory) {
    return [
      { id: 'new-file',   label: 'Создать файл' },
      { id: 'new-folder', label: 'Создать папку' },
      { type: 'separator' },
      { id: 'rename',     label: 'Переименовать' },
      { id: 'delete',     label: 'Удалить', danger: true },
    ]
  }
  return [
    { id: 'open',    label: 'Открыть' },
    { type: 'separator' },
    { id: 'rename',  label: 'Переименовать' },
    { id: 'delete',  label: 'Удалить', danger: true },
  ]
})

function pick(item) {
  if (item.type === 'separator') return
  emit('action', { id: item.id, node: props.node })
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <div
      v-if="isOpen"
      class="context-menu"
      :style="{ left: x + 'px', top: y + 'px' }"
      @mousedown.stop
      @contextmenu.prevent.stop
    >
      <template v-for="(item, i) in items" :key="i">
        <div v-if="item.type === 'separator'" class="context-menu-separator" />
        <div
          v-else
          class="context-menu-item"
          :class="{ danger: item.danger }"
          @click="pick(item)"
        >
          {{ item.label }}
        </div>
      </template>
    </div>
  </Teleport>
</template>

<style scoped>
.context-menu {
  position: fixed;
  min-width: 180px;
  background: #fff;
  border: 1px solid #d5d5d5;
  border-radius: 6px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.14);
  padding: 4px 0;
  z-index: 10000;
  font-size: 14px;
  user-select: none;
}
.context-menu-item {
  padding: 6px 14px;
  cursor: pointer;
  color: #333;
  white-space: nowrap;
}
.context-menu-item:hover { background: #e8e8e8; }
.context-menu-item.danger { color: #c0392b; }
.context-menu-separator {
  height: 1px;
  background: #e2e2e2;
  margin: 4px 0;
}
</style>