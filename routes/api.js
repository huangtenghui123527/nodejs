var express = require('express');
var router = express.Router();
exports.db=require('../module/db.js');

var home=require('./home');
var nav=require('./common/nav');
var runingPig=require('./aboutInput/runingPig');
var inputSelect=require('./aboutInput/inputSelect');
var imgTrans=require('./imgHudel/imgTrans');
var puzzleGame=require('./imgHudel/puzzleGame');
var menuList=require('./management/menuList');

router.use('/nav',nav);
router.use('/home',home);
router.use('/runingPig',runingPig);
router.use('/inputSecter',inputSelect);
router.use('/imgTrans',imgTrans);
router.use('/puzzleGame',puzzleGame);
router.use('/menuList',menuList);

module.exports=router;