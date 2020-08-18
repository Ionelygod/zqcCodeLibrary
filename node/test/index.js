let sum = 0
for (var i = 0; i < 30; i++) {
  if(i == 0){
    var num = 1;
  }
  else
    num = num * 2
  sum += num
  console.log(num,i+1);
}
console.log(sum);
