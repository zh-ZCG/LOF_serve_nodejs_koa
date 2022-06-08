const mongoose = require("../db/db.js");

var Schema = mongoose.Schema;
var adminSchema = new Schema({
    username: { type: String },
    password: { type: String },
}, { collection: "admins" });

const AdminModel = mongoose.model("admin", adminSchema);

module.exports = AdminModel