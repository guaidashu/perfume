let UserController = require("./../../controller/admin/user");

var express = require('express');
var router = express.Router();

router.post("/login", function (req, res, next) {
    UserController.login(req, res)
});

module.exports = router;
