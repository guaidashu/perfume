let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchma = new Schema({
  "userId": Number,
  "userName": String,
  "password": String
});

module.exports = mongoose.model('AdminUser', userSchma, 'admin_users');
