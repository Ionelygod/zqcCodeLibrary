// const str = 'a1b2c3d4e'
// const result = str.replace(/(\d)(\w)(\d)/g,(matchStr,group1,group2,group3,index,originStr) =>{
//   console.log(matchStr,group1,group2,group3,index,originStr);
//   return group1 + group3
// })


const str1 =  'tirmAndTransform，, tirmAndTransform  tirmAndTransform, tirmAndTransform'
const reg = /\W+/g;
console.time('Running')
console.log(str1.replace(reg,','));
console.timeEnd('Running');
