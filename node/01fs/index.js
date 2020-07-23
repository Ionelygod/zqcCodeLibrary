const fs = require('fs')


fs.unlink('./all.txt',function (err) {
  if (err) throw err;
  console.log('已成功地删除文件');
})
