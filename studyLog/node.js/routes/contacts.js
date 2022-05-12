const express = require('express')
const router = express.Router()

router.get('/',(req,res)=>{
    res.send('컨택트!')
})

router.get('/list',(req,res)=>{
    res.send('리스트!')
})

module.exports=router
