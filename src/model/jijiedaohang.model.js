const mongoose = require("../db/db.js");

var Schema = mongoose.Schema;
var jijiedaohangSchema = new Schema({})

const JijiedaohangModel = mongoose.model("test1", jijiedaohangSchema);

module.exports = JijiedaohangModel


