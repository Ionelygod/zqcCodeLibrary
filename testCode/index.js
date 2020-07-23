let principal = 4000; // 本金
const interest = 4000 * 0.01666 /365; // 利息

for (let i = 0;i < 30;i++){
  principal += principal * interest
  console.log(principal);
}
console.log(principal,interest);
