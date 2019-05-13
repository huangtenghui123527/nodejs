

var express = require('express');
var router = express.Router();
var db=require('../module/db.js');

/* GET home page. */
router.get('/', function(req, res) {
    db.find('admin',{},function(err,userData){
        res.render('index',{title:userData[0].name});
    })
});


module.exports = router;
