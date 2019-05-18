let mongoose = require("mongoose");
let mongoose_paginate = require('mongoose-paginate');
let Schema = mongoose.Schema;
let typesSchema = new Schema({
    "name": String
});

typesSchema.plugin(mongoose_paginate);

module.exports = mongoose.model('Types', typesSchema, 'types');
