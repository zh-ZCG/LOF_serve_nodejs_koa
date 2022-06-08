const mongoose = require("../db/db.js");


var Schema = mongoose.Schema;
var searchxiangxiSchema = new Schema({
    skuInfo:Array,
    price: String,
    id:Number
    // address: String,
    // categroyID: String,
    // categroyChildID: String,
    // categroyName: String,
    // categroyChildName: String,
    // keyword: String
}, { collection: "xiangxigoods" })

const SearchXiangXiModel = mongoose.model("xiangxigood", searchxiangxiSchema);

module.exports = SearchXiangXiModel
