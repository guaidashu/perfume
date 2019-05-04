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

}

module.exports = common
