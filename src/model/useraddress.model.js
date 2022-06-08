const mongoose = require("../db/db.js");

var Schema = mongoose.Schema;
var useraddressSchema = new Schema({
    phone: { type: String },
    address:{type:Array}
}, { collection: "useraddresss" });

const selectAddressModel = mongoose.model("useraddress", useraddressSchema);

module.exports = selectAddressModel

