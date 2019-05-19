let common = require("../service/common");
let User = require('./../models/user')
let md5 = require("md5-node");

let LoginController = {
    // 登录接口
    login(res, req) {
        let params = {
            userName: req.body.userName,
            userPwd: md5(req.body.userPwd)
        }
        User.findOne(params, (err, doc) => {
            common.back(res, err, function (res, result) {
                if (doc) {
                    res.cookie('userId', doc.userId, {
                        path: '/',
                        maxAge: 1000 * 60 * 60
                    })
                    res.cookie("userName", doc.userName, {
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
    },

    // 登出
    logout(req, res) {
        res.cookie("userId", "", {
            path: "/",
            maxAge: -1
        })
        res.cookie("userName", "", {
            path: "/",
            maxAge: -1
        })
        res.json({
            status: 0,
            msg: '',
            result: ''
        })
    },

    // 登录检查
    checkLogin(req, res) {
        try {
            if (req.cookies.userId) {
                res.json({
                    status: 0,
                    msg: '',
                    result: {
                        userName: req.cookies.userName
                    }
                })
            } else {
                res.json({
                    status: 1,
                    msg: '当前未登录',
                    result: ''
                })
            }
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = LoginController
