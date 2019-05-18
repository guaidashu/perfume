let mongoose = require("mongoose");
let mongoose_paginate = require('mongoose-paginate');
let Schema = mongoose.Schema;
let productSchema = new Schema({
    "productId": String,
    "productName": String,
    "salePrice": Number,
    "checked": String,
    "productNum": Number,
    "productImage": String,
    "productDescription": String,
    "productType": String,
    "productTypeName": String
});

productSchema.plugin(mongoose_paginate);

module.exports = mongoose.model('Good', productSchema, 'goods');
