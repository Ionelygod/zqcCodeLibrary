
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/mongoose_test',{ useNewUrlParser: true,useUnifiedTopology: true})
mongoose.connection.once('open',function (err) {
  if(!err)console.log('数据库连接成功');
  else console.log(err);
})
const express = require('express')
// const mongodb = require('mongodb')
const Schema = mongoose.Schema;
const usersSchema = new Schema({
  username:String,
  pwd:String,
  email:{
    type:String,
    uniqued:true,
    required:true
  }
})
const Users = mongoose.model('Users',usersSchema)
Users.create({
  username:'tangsanzang',
  pwd:'123123',
  email:'123321321312@163.com'
},function (err) {
  if(!err) console.log('数据创建完成');
  else console.log(err);
})


app.listen(3000,function (err) {
  if(!err)console.log('端口3000启动成功~~~');
  else console.log(err);
})
const app = express()
app.get('/',function (req,res) {
  console.log(req,res);
})
