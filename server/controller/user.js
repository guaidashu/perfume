let User = require('./../models/user');
let common = require('./../service/common');
require('./../util/util');
let md5 = require('md5-node');

let UserController = {
    cartList(req, res) {
        let userId = req.cookies.userId
        User.findOne({userId: userId}, function (err, doc) {
            common.back(res, err, function (res, result) {
                if (doc) {
                    result.result = doc.cartList
                    res.json(result)
                }
            })
        })
    },
    delCart(req, res) {
        let userId = req.cookies.userId
        let productId = req.body.productId
        // $pull 删除指定的数据
        User.update({userId: userId}, {$pull: {'cartList': {'productId': productId}}}, function (err, doc) {
            common.back(res, err, function (res, result) {
                result.result = 'suc'
                res.json(result)
            })
        })
    },
    cartEdit(req, res) {
        let userId = req.cookies.userId
        let productId = req.body.productId
        let productNum = req.body.productNum
        let checked = req.body.checked
        User.update({userId: userId, "cartList.productId": productId}, {
            "cartList.$.productNum": productNum,
            "cartList.$.checked": checked
        }, function (err, doc) {
            common.back(res, err, function (res, result) {
                result.result = 'suc'
                res.json(result)
            })
        })
    },
    editCheckAll(req, res) {
        let userId = req.cookies.userId
        let checkAll = req.body.checkAll
        User.findOne({userId: userId}, function (err, user) {
            common.back(res, err, function (res, result) {
                if (user) {
                    user.cartList.forEach((item) => {
                        item.checked = checkAll
                    })
                    user.save((err1, doc) => {
                        common.back(res, err1, (res, result) => {
                            result.result = 'suc'
                            res.json(result)
                        })
                    })
                }
            })
        })
    },
    addressList(req, res) {
        let userId = req.cookies.userId
        User.findOne({userId: userId}, function (err, doc) {
            common.back(res, err, (res, result) => {
                result.result = doc.addressList
                res.json(result)
            })
        })
    },
    setDefaultAddress(req, res) {
        let userId = req.cookies.userId
        let addressId = req.body.addressId
        if (!addressId) {
            common.back(res, false, (res, result) => {
                result.status = 1003
                result.msg = 'addressId is null'
                res.json(result)
            })
        }
        User.findOne({userId: userId}, function (err, doc) {
            common.back(res, err, (res, result) => {
                let addressList = doc.addressList
                addressList.forEach((item) => {
                    if (item.addressId === addressId) {
                        item.isDefault = true
                    } else {
                        item.isDefault = false
                    }
                })
                doc.save((err1, doc1) => {
                    common.back(res, err1, (res, result) => {
                        result.result = ''
                        res.json(result)
                    })
                })
            })
        })
    },
    delAddress(req, res) {
        let userId = req.cookies.userId
        let addressId = req.body.addressId
        if (!addressId) {
            common.back(res, false, (res, result) => {
                result.status = 1003
                result.msg = 'addressId is null'
                res.json(result)
            })
        }
        User.update({userId: userId}, {
            $pull: {
                'addressList': {
                    'addressId': addressId
                }
            }
        }, function (err, doc) {
            common.back(res, err, (res, result) => {
                result.result = 'suc'
                res.json(result)
            })
        })
    },
    payMent(req, res) {
        let userId = req.cookies.userId
        let orderTotal = req.body.orderTotal
        let addressId = req.body.addressId
        let goodsList = []
        User.findOne({userId: userId}, function (err, doc) {
            common.back(res, err, (res, result) => {
                let address = {}
                // 获取当前用户选择的地址信息
                doc.addressList.forEach((item) => {
                    if (addressId === item.addressId) {
                        address = item
                    }
                })
                // 获取用户购物车选中的要购买的商品信息
                doc.cartList.filter((item) => {
                    if (parseInt(item.checked) === 1) {
                        goodsList.push(item)
                    }
                })
                let platform = '600'
                let r1 = Math.floor(Math.random() * 10)
                let r2 = Math.floor(Math.random() * 10)
                let sysDate = new Date().Format('yyyyMMddhhmmss')
                let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
                let orderId = platform + r1 + r2 + sysDate
                let order = {
                    orderId: orderId,
                    orderTotal: orderTotal,
                    addressInfo: address,
                    goodsList: goodsList,
                    orderStatus: '1',
                    createDate: ''
                }
                doc.orderList.push(order)
                doc.save((err1, doc1) => {
                    common.back(res, err1, (res, result) => {
                        result.result = {
                            orderId: order.orderId,
                            orderTotal: order.orderTotal
                        }
                        res.json(result)
                    })
                })

            })
        })
    },
    // 注册 逻辑处理函数
    register(req, res) {
        let userInfo = new User({
            userId: req.body.phone,
            userName: req.body.userName,
            userPwd: md5(req.body.password),
            userPhone: req.body.phone
        })
        userInfo.save(function (err, doc) {
            common.back(res, err, function (res, result) {
                res.json(result)
            })
        })
    },
    // 添加新地址
    addNewAddress(req, res) {
        let condition = {userId: req.cookies.userId}
        // 构造要添加的地址数据
        let address = {
            addressId: md5(condition.userId + req.body.postCode + req.body.streetName),
            userName: req.body.userName,
            streetName: req.body.streetName,
            postCode: req.body.postCode,
            tel: req.body.tel
        }
        // 首先根据cookie里的用户id获取到用户信息，如果正确查找到，则进行添加操作
        User.findOne(condition, function (err, doc) {
            common.back(res, err, function (res, result) {
                // 将构造好的地址数据添加到用户信息
                doc.addressList.push(address)
                // 更新(存储)到数据库
                doc.save(function (err, docs) {
                    common.back(res, err, function (res, result) {
                        res.json(result)
                    })
                })
            })
        })
    }
};

module.exports = UserController;
