var express = require('express');
var router = express.Router();
var db=require('./api.js').db;

/* GET home page. */
router.get('/', function(req, res) {
    db.find('admin',{},function(err,data){
        var name=data.length?data[0].name:'default';
        res.render('home',{title:name})
        // res.send(name);
    })
});

module.exports = router;