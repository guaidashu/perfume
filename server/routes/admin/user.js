let UserController = require("./../../controller/admin/user");

var express = require('express');
var router = express.Router();

// 后台的登录处理
router.post("/login", function (req, res, next) {
    UserController.login(req, res)
});

// 获取所有用户信息
router.get("/getUserInfo", function (req, res, next) {
    UserController.getUserInfo(req, res)
});

// 修改用户密码
router.post('/changePassword', function (req, res, next) {
    UserController.changePassword(req, res)
});

// 删除用户
router.post("/deleteUser", function (req, res, next) {
    UserController.deleteUser(req, res)
});

module.exports = router;
