var express = require('express');
var router = express.Router();
let LoginController = require('./../controller/login')

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
  LoginController.login(res, req)
})

module.exports = router;
