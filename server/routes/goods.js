let GoodsController = require('../controller/goods')

var express = require('express');
var router = express.Router();


// 获取商品列表
router.get('/list', function (req, res, next) {
    GoodsController.getGoodsList(req, res)
});

// 加入到购物车
router.post('/addCart', function (req, res, next) {
    GoodsController.addCart(req, res)
});

// 获取所有类型信息
router.post("/getTypeAllData", function (req, res, next) {
    GoodsController.getTypeAllData(req, res)
});

// 获取商品信息
router.post("/getGoodsInfo", function (req, res, next) {
    GoodsController.getGoodsInfo(req, res)
});

// 获取订单信息
router.post("/getOrderInfo", function (req, res, next) {
    GoodsController.getOrderInfo(req, res)
});

module.exports = router;
