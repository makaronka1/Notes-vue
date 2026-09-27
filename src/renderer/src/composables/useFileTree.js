import { reactive } from 'vue'

// const path = 'C:\\Users\\pavel\\Desktop\\electronnotes';
// const folderName = window.path.basename(path);
// console.log(folderName);


export async function pathToObject(path) {
  let obj = await window.fileSystem.stat(path);
  let children = await window.fileSystem.get(path);
  const parsed = await window.path.parse(path);
  obj.name = window.path.basename(path);
  obj.clearName = parsed.name;
  obj.ext = parsed.ext;
  obj.children = children;
  obj.parentPath = null;
  obj.path = path;
  return obj;
}

export async function createFileTree (rootObject) {
  rootObject.children = await window.fileSystem.get(rootObject.path);

  for (let child of rootObject.children) {
    child.parentPath = rootObject.path;
    const parsed = await window.path.parse(child.path);

    if (child.isFile) {
      child.clearName = parsed.name;
      child.ext = parsed.ext;
      child.children = [];
      continue;
    }
    
    child.clearName = parsed.name;
    child.ext = parsed.ext;

    await createFileTree(child);
  }
}

// const plain = await pathToObject(path);

// const root =  reactive(plain);

// await createFileTree(root);

// console.log(root);
