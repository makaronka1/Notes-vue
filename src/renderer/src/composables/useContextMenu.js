import { reactive } from 'vue'

const MENU_W = 200
const MENU_H = 240

export function useContextMenu() {
  const ctx = reactive({
    isOpen: false,
    x: 0,
    y: 0,
    node: null
  })

  function open({ event, node }) {
    ctx.x = Math.min(event.clientX, window.innerWidth - MENU_W)
    ctx.y = Math.min(event.clientY, window.innerHeight - MENU_H)
    ctx.node = node
    ctx.isOpen = true
  }

  function close() {
    ctx.isOpen = false
    ctx.node = null
  }

  return { ctx, open, close }
}