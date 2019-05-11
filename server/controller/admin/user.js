let common = require("../../service/common");
let Goods = require('../../models/goods');

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
    }
};

module.exports = UserController;
