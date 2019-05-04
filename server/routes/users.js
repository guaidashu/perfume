var express = require('express');
var router = express.Router();
let LoginController = require('./../controller/login')

router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

// 登录
router.post('/login', function (req, res, next) {
    LoginController.login(res, req)
});

// 登出
router.post('/logout', function (req, res, next) {
    LoginController.logout(req, res)
});

// 登录检查
router.post('/checkLogin', function (req, res, next) {
    LoginController.checkLogin(req, res)
});

module.exports = router;
