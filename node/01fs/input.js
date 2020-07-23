const fs = require('fs');
const {fsRead,fsWrite} = require('./lzjs')

function readDirfn(path) {
  return new Promise(function (resolve, reject) {
    fs.readdir(path,function (err,files) {
      if (err)console.log(err);
      else {
        files.forEach(async (fileName,i) => {
          const content = await fsRead(fileName)
          await fsWrite('all.txt',content)
        })
      }
    })
  })
}
readDirfn("../node")

