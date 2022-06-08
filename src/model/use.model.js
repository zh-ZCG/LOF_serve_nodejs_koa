const mongoose = require("../db/db.js");

var Schema = mongoose.Schema;
var userSchema = new Schema({
    phone: { type: String },
    password: { type: String },
}, { collection: "users" });

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel


