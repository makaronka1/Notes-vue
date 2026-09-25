import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import path from 'node:path';
import fs from 'node:fs/promises';

const fileWatcher = {
  watch: (p) => ipcRenderer.invoke('fs:watch', p),
  unwatch: (p) => ipcRenderer.invoke('fs:unwatch', p),
  onChanged: (cb) => {
    const listener = (_, data) => cb(data)
    ipcRenderer.on('fs:changed', listener)
    return () => ipcRenderer.off('fs:changed', listener)
  },
}

// Custom APIs for renderer
const api = {fileWatcher}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    // если у тебя было window.fileSystem напрямую — добавь:
    contextBridge.exposeInMainWorld('fileWatcher', fileWatcher)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
  window.fileWatcher = fileWatcher
}

contextBridge.exposeInMainWorld('path', {
  join: (...args) => path.join(...args),
  basename: (p) => path.basename(p),
  dirname: (p) => path.dirname(p),
  extname: (p) => path.extname(p),
  parse: (p) => path.parse(p),
  isAbsolute: (p) => path.isAbsolute(p),
  sep: path.sep,
  normalize: (p) => path.normalize(p),
  relative: (from, to) => path.relative(from, to),
  resolve: (...args) => path.resolve(...args)
});

contextBridge.exposeInMainWorld('fileSystem', {
  readFile: (filePath) => fs.readFile(filePath, 'utf-8'),
  readFileAsBase64: (filePath) => fs.readFile(filePath, 'base64'),
  saveFile: (filePath, content) => fs.writeFile(filePath, content, 'utf-8'),
  renameObject: (oldPath, newPath) => fs.rename(oldPath, newPath),
  deleteElement: (targetPath) => fs.unlink(targetPath),
  saveImage: (arrayBuffer, fileName) => fs.writeFile(fileName, Buffer.from(arrayBuffer)),
  access: (targetPath, mode) => fs.access(targetPath, mode),
  stat: async (targetPath) => {
    const stats = await fs.stat(targetPath);
    return {
      isFile: stats.isFile(),
      isDirectory: stats.isDirectory(),
    };
  },
  get: async (dirPath) => {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    return entries.map(entry => ({
      name: entry.name,
      path: path.join(dirPath, entry.name),
      parentPath: dirPath,
      isFile: entry.isFile(),
      isDirectory: entry.isDirectory(),
      isSymbolicLink: entry.isSymbolicLink()
    }));
  },
});