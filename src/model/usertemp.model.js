const mongoose = require("../db/db.js");


var Schema = mongoose.Schema;
var userTempSchema = new Schema({
    id: Number,
    userId: String,
    price: String,
    skuNum: Number,
    skuDefaultImg: String,
    skuName: String,
    isChecked: Number,
    skuDesc: String
}, { collection: "userTemps" })

const SearchUserTempModel = mongoose.model("userTemp", userTempSchema);

module.exports = SearchUserTempModel
