const fs = require('fs')



function writeFile(url,content) {
  return new Promise(function (resolve,reject) {
    fs.writeFile(url,content,{flag:"a",encoding:"utf-8"},function (err) {
      if (err)reject(err);
      else resolve(err);
    })
  })
}
async function fsWrite() {
  await writeFile("test.txt","吃的好撑~1\n")
  await writeFile("test.txt","吃的好撑~2\n")
  await writeFile("test.txt","吃的好撑~3\n")
  await writeFile("test.txt","吃的好撑~4\n")
}
fsWrite()
