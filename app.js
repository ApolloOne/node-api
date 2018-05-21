const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const products=require('./route/products');
const orders=require('./route/orders');
// connect to database
var db=mongoose.connection;
var Schema=mongoose.Schema;
const morgan=require('morgan');
var app=express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello World!'));
app.use('/products',products);
app.use('/orders',orders);
// if has a error
app.use((req,res,next)=>{
    const error=new Error('Not found');
    error.status=404;
    next(error);
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        err:{
            mess:error.message,
            status:error.status
        }
    });
});
const server=app.listen(8080,function () {
    console.log("Server listening port is ",server.address().port);
});
