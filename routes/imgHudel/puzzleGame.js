var express=require('express');
var router=express.Router();

router.get('/',function(req,res){
    res.render('puzzleGame',{title:"haung"})
})

module.exports=router;