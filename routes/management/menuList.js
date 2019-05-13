var express = require('express');
var async=require('async');
var router = express.Router();
var db=require('../api.js').db;

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('menuList/menuList',{ title:"huang"})
});

router.post('/page',function(req,res){
    var option=req.body;
    var parentId=option.parentId?option.parentId:'';
    async.parallel({
        conut:function(callback){
            db.count('navList',{parentId:parentId},function (err,counts){
                callback(err,counts)
            })
        },
        list:function(callback){
            db.find('navList',{parentId:parentId},function(err,result){
                callback(err,result)
            })
        }
    },function(err,results){
       var list=[];
        for(var item of results.list){
            item._id=JSON.stringify(item._id)
            list.push(item)
        }
        var option={
            title:"huang",
            tab:list
        }
        res.send('menuList/menuList',option)
    })
})
router.post('/add', function(req, res) {
    var id =req.body.parentId;
    async.waterfall([
        function(callback){
            var lever=0;
            if(id){
                db.find('navList',{_id:new db.ObjectID(id)},(req,res)=>{
                    if(res.length){
                        lever =Number(res[0].lever)+1;
                    }
                    callback(null,lever)
                })
                db.update('navList',{_id:new db.ObjectID(id)},{isChild:true},function(err,res){
                    console.log(err)
                })
            }else{
                callback(null,lever)
            }
        },
        function(num,callback){
            var parate=Object.assign(req.body,{lever:num,isChild:false})
            db.insert('navList',parate,function(err,result){
                callback(err,result)
            })
        }
    ],function(err,results) {
        if(!err){
            var data={
                status:true,
                success:'成功'
            }
            res.send('menuList/menuList',{data:data})
        }else{
            console.log(err)
        }
    })
});
router.post('/update',function(req,res){
    var obj=req.body
    var id=JSON.parse(obj.id);
    delete obj.id
    db.update('navList',{_id:new db.ObjectID(id)},obj,function(err,result){
        if(err){
            console.log(err)
        }else{
            var data={
                status:true,
                success:'成功'
            }
            res.send('menuList/menuList',{data:data})
        }
    })
})
router.get('/del',function(req,res){
    var id=req.query.id
    async.auto({
        lookID:function(callback){
            db.find('navList',{_id:new db.ObjectID(id)},function(err,result){
                var parentId=result[0].parentId;
                callback(null,parentId);
            })
        },
        drop:function(callback){
            db.remove('navList',{_id:new db.ObjectID(id)},function(err,result){
                var data={
                    status:true,
                    success:'成功'
                }
                callback(err,data)
            })
        },
        counts:['lookID',function(callback,result){
            db.count('navList',{parentId:result.lookID},function(err,counts){
                callback(null,counts)
            })
        }],
        change:['counts','lookID',function(callback,result){
            if(!result.counts){
                db.update('navList',{_id:new db.ObjectID(result.lookID)},{isChild:false},function(err,result){
                    var data={
                        status:true,
                        success:'成功'
                    }
                    callback(err,data)
                })
            }else{
                callback(null,{})
            }
        }]
    },function(err,result){
        if(err){
            console.log(err)
        }else{
            var data={
                status:true,
                success:'成功'
            }
            res.send('menuList/menuList',{data:data})
        }
    })
  
})

router.post('/testName',function(req,res){
    db.find('navList',{menuName:req.body.name},function(err,result){
        if(!err){
            var data={
                status:true,
                message:''
            }
            if(result.length){
                data.status=false;
                data.message='菜单名已存在！';
            }
            res.send('menuList',{data:data})
        }else{
            console.log(err)
        }
    })
})

module.exports = router;
function queryLever(id){
    db.find('navList',{_id:new db.ObjectID(id)},(req,res)=>{
        if(res.length){
            menuG.lever =Number(res[0].lever)+1;
        }
    })
}