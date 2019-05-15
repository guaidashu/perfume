let common = require("../service/common");
let Goods = require('../models/goods');
let User = require('./../models/user');

let GoodsController = {
  // 获取商品列表
  getGoodsList(req, res) {

    let page = parseInt(req.param("page"));
    let pageSize = parseInt(req.param("pageSize"));
    let priceLevel = req.param("priceLevel");
    let priceGt = 0, priceLte = 0;
    let skip = common.getSkipNum(page, pageSize);
    let sort = parseInt(req.param("sort"));
    let params = {};
    if (priceLevel !== 'all') {
      switch (priceLevel) {
        case '0':
          priceGt = 0;
          priceLte = 100;
          break;
        case '1':
          priceGt = 100;
          priceLte = 500;
          break;
        case '2':
          priceGt = 500;
          priceLte = 1000;
          break;
        case '3':
          priceGt = 1000;
          priceLte = 2000;
          break;
      }
      params = {
        salePrice: {
          $gt: priceGt,
          $lte: priceLte
        }
      }
    }

    // 排序
    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({'salePrice': sort});

    goodsModel.exec({}, function (err, doc) {
      common.back(res, err, function (res, result) {
        result.result = {
          count: doc.length,
          list: doc
        }
        res.json(result)
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
              item.productNum ++
            }
          })
          // 如果已经有此商品，则将数量加1
          if (goodsItem){
            userDoc.save((err, doc) => {
              common.back(res, err, function (res2, result2) {
                result2.result = 'suc'
                res2.json(result2)
              })
            })
          }else {
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
  }
}

module.exports = GoodsController;
