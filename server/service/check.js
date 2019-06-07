let checkTools = {
    checkUrl(req) {
        //获取未登录也允许放行的url
        let urls = require('./../conf/url')
        //如果 url在允许放行的url里面就允许放行，返回true;否则就返回flase
        for (let i in urls) {
            if (req === '/') {
                return true
            }
            try {
                // 后台的url的检查
                if (req.originalUrl.indexOf(urls[i]) > -1) {
                    return true
                }
            } catch (e) {
                //前台的url的检查
                if (req.indexOf(urls[i]) > -1) {
                    return true
                }
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
    },
    // 登录拦截检查前端的页面是否放行
    checkUrl(url) {
        return checkTools.checkUrl(url);
    }
};

module.exports = check;
