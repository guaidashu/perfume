let common = require("../../service/common");
let Users = require("../../models/user");

let UserController = {
    login(req, res) {
        let userName = req.body.userName
        common.back(res, false, (res, result) => {
            result.result = {
                name: userName,
                user_id: '1',
                access: [userName],
                token: userName,
                avator: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png'
            };
            res.cookie('userId', userName, {
                path: '/',
                maxAge: 1000 * 60 * 60 * 60 * 24
            })
            res.json(result)
        })
    },
    getUserInfo(req, res) {
        let page = req.query.page
        let size = req.query.size
        if (!page) {
            page = 1
        }
        if (!size) {
            size = 10
        }
        page = parseInt(page)
        size = parseInt(size)
        Users.paginate({}, {page: page, sort: {"_id": -1}, limit: size}, function (err, doc) {
            common.back(res, err, (res, result) => {
                result.result = doc
                res.json(result)
            })
        })
    }
};

module.exports = UserController;
