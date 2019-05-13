var express = require('express');
var db=require('../api.js').db;
var router = express.Router();
var list=[]
router.get('/',function(req,res){
    db.find('navList',{},function(err,data){
        list=data;
        var navList= getList(data);
        res.send('nav',{list:navList})
    })
})

module.exports=router;

function getList(data){
    var arr=[];
    for(var item of data){
        if(!item.parentId){
            arr.push(item);
        }
    };
   return manageList(arr)
}
function manageList(data){
    var arr=[];
    for(var item of data){
        if(item.isChild){
            item.child=getChild(item._id);
            manageList(item.child)
        }else{
            list.child=[]
        }
        arr.push(item)
    }    
    return arr;
}

function getChild(id){
    var arr=[];
    for(var item of list){
        if(id==item.parentId){
            arr.push(item)
        }
    }
    return arr;
}