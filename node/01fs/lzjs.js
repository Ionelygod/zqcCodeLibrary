const fs = require('fs')


// fs.open('hello.txt','r')
// const content = fs.readFileSync('hello.txt', {flag:"r",encoding:"utf8"})
function fsRead(url){
  return new Promise(function (resolve,reject) {
    fs.readFile(url,{flag:"r",encoding:"utf-8"},function (err,data) {
      if(err) reject(err);
      else resolve(data);
    })
  })
}
function fsWrite(url,content) {
  return new Promise(function (resolve,reject) {
    fs.writeFile(url,content,{flag:"a",encoding:"utf-8"},function (err) {
      if (err)reject(err);
      else resolve(err);
    })
  })
}
function mkdirPath (path){
  return new Promise((resolve, reject) => {
    fs.mkdir(path, { recursive: true }, (err) => {
      if (err) reject(err);
      else {
        console.log("创建完成")
      }
    });
  })
}
module.exports = {
  fsRead,
  fsWrite,
  mkdirPath
}
