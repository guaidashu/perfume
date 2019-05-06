var mongoose = require("mongoose");
// 链接mongodb数据库
mongoose.connect('mongodb://127.0.0.1:27017/dumall', {useNewUrlParser: true});

mongoose.connection.on('connected', function () {
  console.log('connect successful')
})

mongoose.connection.on('error', function () {
  console.log('connect failed')
})

mongoose.connection.on('disconnected', function () {
  console.log('disconnect')
})

module.exports = mongoose
