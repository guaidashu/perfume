let common = require("../service/common");
let User = require('./../models/user')

let LoginController = {
  login(res, req) {
    let params = {
      userName: req.body.userName,
      userPwd: req.body.userPwd
    }
    User.findOne(params, (err, doc) => {
      common.back(res, err, function (res, result) {
        if (doc) {
          res.cookie('userId', doc.userId, {
            path: '/',
            maxAge: 1000 * 60 * 60
          })
          // req.session.user = doc
          result.result = {
            userName: doc.userName,
            userId: doc.userId
          }
          res.json(result)
        } else {
          result.result = '用户名或密码错误'
          result.status = 1
          res.json(result)
        }
      })
    })
  }
}

module.exports = LoginController
