
A = [[1,2,3],[4,5,6],[7,8,9]]
//  转化一个为 A.length 个空数组的多维数组
let result = Array.from({ length: A[0].length }, () => [])
console.log(result)


// 选择排序
// 选择排序: 首先找到最小的那个元素  将它和数组的第一个进行位置互换 然后找第二个最小的 和第二个互换  一直循环
function selectSort(a){
  const l = a.length;
  for(let i = 0;i<l-1;i++){
    let min = i;
    for(let j = i+1;j<l;j++){
      if(a[min] > a[j]) min = j
    }
    let temp = a[i]
    a[i] = a[min]
    a[min] = temp
  }
  return a
}

console.log(selectSort([5, 1, 3, 56, 2, 65, 71, 6, 4, 1, 5, 6, 7, 23]));
// 插入排序
// 插入排序 1. 从数组第二个元素开始抽取元素
//         2. 把它与左边第一个元素比较，如果第一个元素比它大，则继续与左边第二个元素比较下去，知道遇到不比它大的元素，然后插到这个元素的右边。
//         3. 继续选取第3,4,...n个元素，重复步骤2，选择适当的位置插入
function innerSort(a) {
  for (let i = 1;i<a.length;i++){
    let j = i - 1;  // 1
    let target = a[i] //    3
    while (j >=0 && a[j] > target){   //  5 > 1
      a[j + 1] = a[j]
      j--
    }
    a[j + 1 ] = target
  }
  return a
}
console.log(innerSort([5, 1, 3, 56, 2, 65, 71, 6, 4, 1, 5, 6, 7, 23]));
