var express=require('express');
var router=express.Router();

router.get('/',function(req,res){
    res.render('runingPig',{titile:'goods'})
    // res.send('runingPig',{title:"huang"})
})

module.exports=router;