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
    },
    getRootPath() {
        //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
        let curWwwPath = window.document.location.href;
        //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
        let pathName = window.document.location.pathname;
        // console.log(pathName)
        // let pos = curWwwPath.indexOf(pathName);
        // //获取主机地址，如： http://localhost:8083
        // let localhostPaht = curWwwPath.substring(0, pos);
        // //获取带"/"的项目名，如：/uimcardprj
        // let projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
        // return (localhostPaht + projectName);
        return pathName
    }

};

module.exports = common;
