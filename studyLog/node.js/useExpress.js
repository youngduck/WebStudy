const express = require('express')
const nunjucks=require('nunjucks')
const logger = require('morgan')
const bodyParser = require('body-parser')

const admin = require('./routes/admin.js')
const contacts = require('./routes/contacts.js')
const res = require('express/lib/response')

const app = express()
const port = 3000

//view engine
nunjucks.configure('template',{
    autoescape:true,//태그 적용 여부,html 공격 방어
    express:app
})

//미들웨어 세팅
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/',(req,res)=>{
    res.send('hi')
})

function vipMiddleware(req,res,next){
    console.log('최우선 미들웨어')
    next()
}

//라우팅 활용한 깔끔한 코드정리
app.use('/admin',vipMiddleware,admin);
app.use('/contacts',contacts);

app.listen(port,()=>{
    console.log('express done!',port)
})