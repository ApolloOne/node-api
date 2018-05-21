var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db=mongoose.connection;
mongoose.connect('mongodb://127.0.0.1:27017/node-api');
// create a schema
var orderSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: String,
    quanlity:Number,
    price:Number,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    location: String,
    meta: {
        age: Number,
        website: String
    }
});
// the schema is useless so farorderSchema
// we need to create a model using it
var order = mongoose.model('order', orderSchema);
// make this available to our users in our Node applications
console.log('created collection');
module.exports = order;