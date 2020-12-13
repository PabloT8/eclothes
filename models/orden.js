var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var schema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: "Usuarios"},
    name: {type: Schema.Types.String, ref: "Usuarios"},
    email: {type: Schema.Types.String, ref: "Usuarios"},
    cart: {type: Object, require: true}
});

module.exports = mongoose.model("Orden", schema);