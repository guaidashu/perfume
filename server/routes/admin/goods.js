let GoodsController = require('../../controller/admin/goods');

let path = require('path');
let multer = require('multer');
let upload = multer({dest: path.join(__dirname, '../../../static/upload')});

let express = require('express');
let router = express.Router();

// 获取所有商品信息
router.get('/getGoodsInfo', function (req, res, next) {
    GoodsController.getGoodsInfo(req, res)
});

// 图片上传处理
router.post('/uploadImage', upload.single('file'), function (req, res, next) {
    GoodsController.updateImage(req, res)
});

// 添加商品
router.post('/addGoods', function (req, res, next) {
    GoodsController.addGoods(req, res)
});

// 删除商品
router.post('/deleteGoods', function (req, res, next) {
    GoodsController.deleteGoods(req, res)
});

// 修改商品信息
router.post('/updateGoods', function (req, res, next) {
    GoodsController.updateGoods(req, res)
});

// 上传类型
router.post("/uploadType", function (req, res, next) {
    GoodsController.uploadType(req, res)
});

// 获取所有类型信息
router.post("/getTypeData", function (req, res, next) {
    GoodsController.getTypeData(req, res)
});

// 修改类型信息
router.post("/uploadTypeInfo", function (req, res, next) {
    GoodsController.uploadTypeInfo(req, res)
});

// 删除类型信息
router.post("/deleteType", function (req, res, next) {
    GoodsController.deleteType(req, res)
});

// 获取所有商品类型数据
router.post("/getTypeAllData", function (req, res, next) {
    GoodsController.getTypeAllData(req, res)
});

module.exports = router;
