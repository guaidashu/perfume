
let GoodsController = require('../controller/goods')

var express = require('express');
var router = express.Router();


// 获取商品列表
router.get('/', function (req, res, next) {
  GoodsController.getGoodsList(req, res)
});

// 加入到购物车
router.post('/addCart', function (req, res, next) {
  GoodsController.addCart(req, res)
})


module.exports = router;