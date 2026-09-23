import { reactive } from 'vue'

// const path = 'C:\\Users\\pavel\\Desktop\\electronnotes';
// const folderName = window.path.basename(path);
// console.log(folderName);


export async function pathToObject(path) {
  let obj = await window.fileSystem.stat(path);
  let children = await window.fileSystem.get(path);
  obj.name = window.path.basename(path);
  obj.children = children;
  obj.parentPath = null;
  obj.path = path;
  return obj;
}

export async function createFileTree (rootObject) {
  rootObject.children = await window.fileSystem.get(rootObject.path);

  for (let child of rootObject.children) {
    child.parentPath = rootObject.path
    if (child.isFile) {
      child.children = [];
      continue;
    }

    await createFileTree(child);
  }
}

// const plain = await pathToObject(path);

// const root =  reactive(plain);

// await createFileTree(root);

// console.log(root);
