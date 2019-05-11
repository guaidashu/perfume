let GoodsController = require('../../controller/admin/goods');

let path = require('path');
let multer = require('multer');
let upload = multer({dest: path.join(__dirname, '../../../static/upload')});

let express = require('express');
let router = express.Router();

router.get('/getGoodsInfo', function (req, res, next) {
    GoodsController.getGoodsInfo(req, res)
});

router.post('/uploadImage', upload.single('file'), function (req, res, next) {
    GoodsController.updateImage(req, res)
});

router.post('/addGoods', function (req, res, next) {
    GoodsController.addGoods(req, res)
});

router.post('/deleteGoods', function (req, res, next) {
    GoodsController.deleteGoods(req, res)
});

module.exports = router;
