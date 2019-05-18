var express = require('express');
var router = express.Router();
let LoginController = require('./../controller/login')
let UserController = require('./../controller/user')

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});


// 登录 接口
router.post('/login', function (req, res, next) {
    LoginController.login(res, req)
});

// 登出 接口
router.post('/logout', function (req, res, next) {
    LoginController.logout(req, res)
});

// 登录检查
router.post('/checkLogin', function (req, res, next) {
    LoginController.checkLogin(req, res)
});

// 获取购物车数据
router.post('/cartList', function (req, res, next) {
    UserController.cartList(req, res)
});

// 删除购物车商品
router.post('/cartDel', function (req, res, next) {
    UserController.delCart(req, res)
});

// 商品编辑()
router.post('/cartEdit', function (req, res, next) {
    UserController.cartEdit(req, res)
});

// 购物车编辑
router.post('/editCheckAll', function (req, res, next) {
    UserController.editCheckAll(req, res)
});

// 查询用户地址接口
router.post('/addressList', function (req, res, next) {
    UserController.addressList(req, res)
});

// 设置默认地址
router.post('/setDefaultAddress', function (req, res, next) {
    UserController.setDefaultAddress(req, res)
});

// 删除地址接口
router.post('/delAddress', function (req, res, next) {
    UserController.delAddress(req, res)
});

// 生成订单
router.post("/payMent", function (req, res, next) {
    UserController.payMent(req, res)
});

// 注册
router.post('/register', function (req, res, next) {
    UserController.register(req, res)
});

// 添加新地址
router.post("/addNewAddress", function (req, res, next) {
    UserController.addNewAddress(req, res)
});

module.exports = router;
