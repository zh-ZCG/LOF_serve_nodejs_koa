const mongoose = require("../db/db.js");


var Schema = mongoose.Schema;
var dindanzhuangtaiSchema = new Schema({
    id:{type:Number,default:1},
    loginphone: String,
    userName: String,
    phone: String,
    addressName: String,
    ordermessage: String,
    orderDetailList: Array,
    order_number: String,
    paymoney: String

}, { collection: "wanchengdindans" })

const DinDanXiuGaiChengGongModel = mongoose.model("wanchengdindan", dindanzhuangtaiSchema);

module.exports = DinDanXiuGaiChengGongModel
