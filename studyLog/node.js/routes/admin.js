const express = require('express')
const router = express.Router();

function testMiddleware(req,res,next){
    console.log('첫번째 미들 웨어')
    next()
}

function testMiddleware2(req,res,next){
    console.log('두번째 미들 웨어')
    next()
}

//로그인 안되어있을시 미들웨어기능 사용
function loginRequired(req,res,next){
    if(false){
        res.redirect('contacts')
    }
    else{
        next()
    }
}

//textmiddleware는 실행이 안됨.
router.get('/',loginRequired,testMiddleware2,(req,res)=>{
    res.send('admin');
})


router.get('/products',(req,res)=>{
    //res.send('admin product');
    
    res.render('admin/products.html',{
        hello:'hello!',
        bye:'bye',
        h1:`<h1>제목</h1>`
    })
})



router.get('/products/write',(req,res)=>{
    res.render('admin/write.html')
})

router.post('/products/write',(req,res)=>{
    res.send(req.body)
})

module.exports=router;