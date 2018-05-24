var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const products=require('../model/products');
const orders=require('../model/orders');
const date=new Date();
var value1=new products({
    _id:new mongoose.Types.ObjectId(),
    name:"Vinamilk",
    price:2000,
    created_at: date.getDay()
});
var value2=new orders({
    _id:new mongoose.Types.ObjectId(),
    name:"Home",
    price:6000,
    created_at: date.getDay()
});
value1.save().then(result=>{
    console.log(result);
}).catch(err=>{
    console.error(err);
});
value2.save().then(result=>{
    console.log(result);
}).catch(err=>{
    console.error(err);
});
