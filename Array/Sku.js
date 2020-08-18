class Adjoin{
  constructor(vertex){
    this.vertex = vertex;
    this.quantity = vertex.length;
    this.init();
  }
  init(){
    this.adjoinArray  = Array.from({length:this.quantity * this.quantity});
  }
  
  getVertexRow(id){
    const index = this.vertex.indexOf(id);
    const col = [];
    this.vertex.forEach((item,pIndex) => {
      col.push(this.adjoinArray[index + this.quantity * pIndex])
    })
    return col;
  }
  
  getAdjoinVertexs(id){
    return this.getVertexRow(id).map((item,index) => (item? this.vertex[index]:'')).filter(Boolean)
  }
  
  setAdjoinVertexs(id,sides){
    const pIndex = this.vertex.indexOf(id)
    sides.forEach((item) => {
      const index = this.vertex.indexOf(item);
      this.adjoinArray[pIndex * this.quantity + index] = 1
      // console.log(this.adjoinArray)
    })
  }
}

// const demo = new Adjoin(['v0','v1','v2','v3','v4']);
// demo.setAdjoinVertexs('v0',['v2','v3']);
// demo.setAdjoinVertexs('v1',['v3','v4']);
// demo.setAdjoinVertexs('v2',['v0','v3','v4']);
// demo.setAdjoinVertexs('v3',['v0','v1','v2']);
// demo.setAdjoinVertexs('v4',['v1','v2']);
// console.log(demo.getAdjoinVertexs('v0'));

const test = new Adjoin(['黑色','蓝色','64G','128G'])
test.setAdjoinVertexs('黑色',['64G','128G'])
test.setAdjoinVertexs('蓝色',['64G','128G'])
test.setAdjoinVertexs('64G',['黑色','蓝色'])
test.setAdjoinVertexs('128G',['黑色','蓝色'])
console.log(test);
console.log(test.getAdjoinVertexs('黑色'));

//        v0            v1          v2              v3         v4
//  'v0'   undefined,  undefined,  1,                1,   undefined,
//  'v1'   undefined,  undefined, undefined,         1,          1,
//  'v2'    1          undefined, undefined,         1,          1
//  'v3'    1,          1,          1,          undefined,   undefined
//  'v4'    undefined,  1,          1,          undefined,   undefined

module.exports = {
  Adjoin: Adjoin
}
