function doExchange(arr){
  var len = arr.length;
  if(len>=2){
    var len1 = arr[0].length;
    var len2 = arr[1].length;
    var lenBoth = len1 * len2;
    var items = new Array(lenBoth)
    var index = 0;
    for (var i = 0;i<len1;i++){
      for (var j = 0;j<len2;j++){
        items[index] = arr[0][i] + arr[1][j];
        index++
      }
    }
    var newArr = new Array(len - 1)
    for (var i = 2; i < arr.length; i++) {
      newArr[i-1] = arr[i]
    }
    newArr[0] = items;
    return doExchange(newArr)
  }else{
    return arr[0]
  }
}

console.log(doExchange([["1", "2", "3"], ["a", "b", "c"], ["e", "f", "j"]]));
