let Types = require("../models/types");
let common = {
    // 获取分页数据断点 开始位置
    getSkipNum(page, pageSize) {
        return (page - 1) * pageSize;
    },
    back(res, err, callback) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
            });
        } else {
            let result = {
                status: 0,
                msg: '',
                result: {}
            }
            callback(res, result)
        }
    },
    getType(data, res, result) {
        Types.find({}, function (err, docs) {
            if (err) {
                return data
            }
            for (let i = 0; i < data.length; i++) {
                for (let j = 0; j < docs.length; j++) {
                    try {
                        if (data[i].productType == docs[j]._id) {
                            data[i].productTypeName = docs[j].name
                            break
                        } else {
                            data[i].productTypeName = ''
                        }
                    } catch (e) {
                        data[i].productTypeName = ''
                        break
                    }
                }
            }
            result.result = {
                count: data.length,
                list: data
            }
            res.json(result)
        })
    }

};

module.exports = common;
