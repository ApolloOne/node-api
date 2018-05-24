var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://127.0.0.1:27017/node-api');
// create a schema
var productSchema = new Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String,required:true},
    price:{type:Number,required:true},
    created_at: Date,
    admin: Boolean,
    location: String,
    meta: {
        age: Number,
        website: String
    }
});

var product = mongoose.model('product', productSchema);

module.exports = product;
