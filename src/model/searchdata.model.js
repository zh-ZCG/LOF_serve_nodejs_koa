const mongoose = require("../db/db.js");


var Schema = mongoose.Schema;
var searchdataSchema = new Schema({
    // address: { type: String },
    // price: { type: Number },
    // name: { type: String },
    // categroyID: { type: Number },
    // categroyChildID: { type: Number },
    // categroyName: { type: String },
    // categroyChildName: { type: String },
    // order: { type: String },
    // pageNo: { type: Number },
    // pageSize: { type: Number },
    // keyword: { type: String }
})

const SearchDataModel = mongoose.model("searchdata", searchdataSchema);

module.exports = SearchDataModel
