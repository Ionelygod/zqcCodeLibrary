
A = [[1,2,3],[4,5,6],[7,8,9]]
//  转化一个为 A.length 个空数组的多维数组
let result = Array.from({ length: A[0].length }, () => [])
console.log(result)
