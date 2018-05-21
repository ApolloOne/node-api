var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1:27017/node-api');
// create a schema
var productSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name: String,
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

// the schema is useless so far
// we need to create a model using it
var product = mongoose.model('product', productSchema);

// make this available to our users in our Node applications
module.exports = product;
