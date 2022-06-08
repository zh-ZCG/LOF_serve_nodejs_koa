const mongoose = require("../db/db.js");

var Schema = mongoose.Schema;
var dindanschema = new Schema({
    loginphone: String,
    userName: String,
    phone: String,
    addressName: String,
    ordermessage: String,
    orderDetailList: Array,
    order_number: String,
    paymoney:String
}, { collection: "dindans" })

const adddindanModel = mongoose.model("dindan", dindanschema);

module.exports = adddindanModel