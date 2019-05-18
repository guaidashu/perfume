let common = require("../../service/common");
let Goods = require('../../models/goods');
let Types = require("../../models/types");
let fs = require('fs');

let GoodsController = {
    getGoodsInfo(req, res) {
        let page = req.query.page
        let size = req.query.size
        if (!page) {
            page = 1
        }
        if (!size) {
            size = 10
        }
        page = parseInt(page)
        size = parseInt(size)
        Goods.paginate({}, {page: page, sort: {"_id": -1}, limit: size}, function (err, doc) {
            common.back(res, err, (res, result) => {
                result.result = doc
                res.json(result)
            })
        })
    },
    updateImage(req, res) {
        let tmpPath = req.file.path
        let ext = '.' + req.file.originalname.split('.')[1];
        let fileName = req.file.filename + ext
        let targetPath = req.file.path + ext
        fs.rename(tmpPath, targetPath, function (err, data) {
            common.back(res, false, (res, result) => {
                result.result = {
                    fileName: req.file.filename,
                    filePath: fileName
                }
                res.json(result)
            })
        })
    },
    addGoods(req, res) {
        let goods = new Goods({
            productName: req.body.productName,
            salePrice: req.body.salePrice,
            productImage: req.body.productImage,
            productId: req.body.productId,
            productDescription: req.body.productDescription,
            productType: req.body.productType
        })
        goods.save(function (err, doc) {
            common.back(res, err, function (res, result) {
                res.json(result)
            })
        })
    },
    deleteGoods(req, res) {
        let condition = {
            _id: req.body._id
        }
        Goods.deleteOne(condition, function (err, doc) {
            common.back(res, err, function (res, result) {
                res.json(result)
            })
        })
    },
    updateGoods(req, res) {
        let condition = {
            _id: req.body._id
        }
        let updateData = {
            productName: req.body.productName,
            salePrice: req.body.salePrice,
            productImage: req.body.productImage,
            productId: req.body.productId,
            productDescription: req.body.productDescription,
            productType: req.body.productType
        }
        Goods.updateOne(condition, updateData, function (err, doc) {
            common.back(res, err, function (res, result) {
                res.json(result)
            })
        })
    },
    uploadType(req, res) {
        let types = new Types({
            name: req.body.name
        })
        types.save(function (err, doc) {
            common.back(res, err, function (res, result) {
                res.json(result)
            })
        })
    },
    getTypeData(req, res) {
        let page = req.query.page
        let size = req.query.size
        if (!page) {
            page = 1
        }
        if (!size) {
            size = 10
        }
        page = parseInt(page)
        size = parseInt(size)
        Types.paginate({}, {page: page, sort: {"_id": -1}, limit: size}, function (err, doc) {
            common.back(res, err, (res, result) => {
                result.result = doc
                res.json(result)
            })
        })
    },
    getTypeAllData(req, res) {
        Types.find({}, function (err, docs) {
            common.back(res, err, function (res, result) {
                result.result = docs
                res.json(result)
            })
        })
    },
    uploadTypeInfo(req, res) {
        let condition = {
            _id: req.body._id
        }
        let data = {
            name: req.body.name
        }
        Types.updateOne(condition, data, function (err, doc) {
            common.back(res, err, function (res, result) {
                res.json(result)
            })
        })
    },
    deleteType(req, res) {
        let condition = {
            _id: req.body._id
        }
        Types.deleteOne(condition, function (err, doc) {
            common.back(res, err, function (res, result) {
                res.json(result)
            })
        })
    }
};

module.exports = GoodsController;
