import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
const path = 'C:\\Users\\pavel\\Desktop\\electronnotes';
const folderName = window.path.basename(path);
console.log(folderName);

const objectType = await window.fileSystem.get(path);

console.log(objectType);
