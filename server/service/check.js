let checkTools = {
    checkUrl(req) {
        let urls = require('./../conf/url')
        for (let i in urls) {
            if (req.originalUrl.indexOf(urls[i]) > -1) {
                return true
            }
        }
        return false
    }
};

let check = {
    checkLogin(req, res, next) {
        if (req.cookies.userId) {
            next()
        } else {
            if (checkTools.checkUrl(req)) {
                next()
            } else {
                res.json({
                    status: 1001,
                    msg: '当前未登录',
                    result: ''
                })
            }
        }
    }
};

module.exports = check;
