const {
  fsRead,
  fsWrite,
  mkdirPath
} = require('../01fs/lzjs')
const cherrio = require('cheerio')
const path = require('path')
const fs = require('fs')
const axios = require('axios')
let httpUrl = 'https://www.doutula.com/article/list/?page=1'
axios.get(httpUrl).then(res => {
  const $ = cherrio.load(res.data)
  const title = $('.random_title').text()
  $('#home .col-sm-9>a').each((i,t)=>{
    console.log($(t).attr('href'));
    const detailUrl = $(t).attr('href')
  
    mkdirPath(`./${title}`)
    parsePage(detailUrl,title)
  })
  
})

async function parsePage (detailUrl,title) {
  let res = await axios.get(detailUrl)
  const $ = cherrio.load(res.data)
  $('.list-group-item .artile_des img').each(async (i,t)=>{
    let imgUrl = $(t).attr('src')
    const extName = path.extname(imgUrl)
    const imgPath = `./${title}/${title}${i}${extName}`
    // 创建写入图片流
    let ws = fs.createWriteStream(imgPath)
    axios.get(imgUrl,{responseType:'stream'}).then(res =>{
      res.data.pipe(ws)
      
    })
  })
}

