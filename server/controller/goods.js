let common = require("../service/common");
let Goods = require('../models/goods');
let Types = require("../models/types");
let User = require('./../models/user');

let GoodsController = {
    // 获取商品列表
    getGoodsList(req, res) {

        let page = parseInt(req.param("page"));
        let pageSize = parseInt(req.param("pageSize"));
        let priceGt = parseInt(req.param("priceGt")), priceLte = parseInt(req.param("priceLte"));
        if (!priceGt) {
            priceGt = 0
        }
        if (!priceLte) {
            priceLte = 0
        }
        let skip = common.getSkipNum(page, pageSize);
        let sort = parseInt(req.param("sort"));
        let productName = req.param("productName");
        let productType = req.param("productType");
        let params = {};
        if (priceGt > 0 && priceLte === 0) {
            params = {
                salePrice: {
                    $gt: priceGt
                }
            }
        } else if (priceLte > 0 && priceGt <= priceLte) {
            params = {
                salePrice: {
                    $gt: priceGt,
                    $lte: priceLte
                }
            }
        }
        if (productType != 'all') {
            params.productType = productType
        }
        if (productName != '') {
            params.productName = {$regex: productName}
        }

        // 排序
        let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
        goodsModel.sort({'salePrice': sort});

        goodsModel.exec({}, function (err, doc) {
            common.back(res, err, function (res, result) {
                // 进行类型的名称匹配
                common.getType(doc, res, result)
            })
        })
    },

    // 加入到购物车
    addCart(req, res) {
        let userId = req.cookies.userId, productId = req.body.productId;
        User.findOne({
            userId: userId
        }, (err, userDoc) => {
            common.back(res, err, function (res, result) {
                if (userDoc) {
                    let goodsItem = null
                    userDoc.cartList.forEach(function (item) {
                        if (item.productId === productId) {
                            goodsItem = item
                            item.productNum++
                        }
                    })
                    // 如果已经有此商品，则将数量加1
                    if (goodsItem) {
                        userDoc.save((err, doc) => {
                            common.back(res, err, function (res2, result2) {
                                result2.result = 'suc'
                                res2.json(result2)
                            })
                        })
                    } else {
                        // 否则新增添加的商品
                        Goods.findOne({productId: productId}, (err, doc) => {
                            common.back(res, err, function (res1, result1) {
                                doc.productNum = 1;
                                doc.checked = 1;
                                userDoc.cartList.push(doc);
                                userDoc.save((err2, doc) => {
                                    common.back(res1, err2, function (res2, result2) {
                                        result2.result = 'suc'
                                        res2.json(result2)
                                    })
                                })
                            })
                        })
                    }

                }
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
    getGoodsInfo(req, res) {
        let condition = {_id: req.body._id}
        Goods.find(condition, function (err, doc) {
            common.back(res, err, function (res, result) {
                common.getType(doc, res, result)
            })
        })
    },
    getOrderInfo(req, res){
        let condition = {
            userId: req.cookies.userId
        }
        let orderId = req.body.orderId
        User.find(condition, function (err, doc) {
            common.back(res, err, function (res, result) {
                let orderList = doc[0].orderList
                let order = {}
                orderList.forEach((item) => {
                    if (item.orderId === orderId){
                        order = item
                    }
                })
                result.result = order
                res.json(result)
            })
        })
    }
}

module.exports = GoodsController;
