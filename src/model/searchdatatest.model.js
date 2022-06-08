const mongoose = require("../db/db.js");


var Schema = mongoose.Schema;
var searchdatatestSchema = new Schema({
    // address: String,
    // price: String,
    // categroyID: String,
    // categroyChildID: String,
    // categroyName: String,
    // categroyChildName: String,
    // keyword: String
}, { collection: "goodsLists" })

const SearchDatatestModel = mongoose.model("goodsList", searchdatatestSchema);

module.exports = SearchDatatestModel
