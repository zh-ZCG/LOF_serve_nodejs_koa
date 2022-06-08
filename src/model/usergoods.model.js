const mongoose = require("../db/db.js");

var Schema = mongoose.Schema;
var usergoodsSchema = new Schema({
    id: Number,
    price: String,
    userId:String,
    skuNum: Number,
    phone:{type:String,default:1},
    skuDefaultImg: String,
    skuName: String,
    isChecked: Number,
    skuDesc: String,
}, { collection: "usergoods" });

const UserGoodsModel = mongoose.model("usergood", usergoodsSchema);

module.exports = UserGoodsModel


