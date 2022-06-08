const mongoose = require("../db/db.js");


var Schema = mongoose.Schema;
var usercodeschema = new Schema({
    // id: Number,
    // userId: String,
    // price: String,
    // skuNum: Number,
    // skuDefaultImg: String,
    // skuName: String,
    // isChecked: Number,
    // skuDesc: String
    phone:String,
    code:String

}, { collection: "userCodes" })

const AdduserCodeModel = mongoose.model("userCode", usercodeschema);

module.exports = AdduserCodeModel