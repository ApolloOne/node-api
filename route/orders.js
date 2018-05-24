const express=require('express');
const mongoose=require('mongoose');
const Order=require('../model/orders');
const router=express.Router();
// get all Orders
router.get('/',(req,res) => {
    res.status(200).json({
        mess:'Method Get on orders',
        Orders:Order.map(value => {
            return {
                _id:value._id,
                name:value.name,
                price:value.price,
                created_at:value.created_at,
                request:{
                    type:"Get",
                    url:`localhost:8080/orders ${value._id}`
                }
            }
        })
    });
});
router.post('/',(req,res)=>{
    const order=new Order({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    });
    order.save()
        .then(doc=>{
            res.status.json({
                mess:"Saved to Database",
                doc:doc
            });
        }).catch(err=>{
        console.error(err);
    });
    res.status(200).json({
        mess:'Method Post on orders',
        order:order
    });
});
router.get('/:orderId',(req,res)=>{
    const id=res.params.orderId;
    Order.findById(id)
        .then(value=>{
            res.status(200).json({
                order:value
            });
        }).catch(err=>{
            console.error(err);
            res.status(404 || 500).json({
                Error:{
                    mess:err.message,
                    status:err.status
                }
            });
    });

});
router.patch('/:orderId',(res,req)=>{
    const id=res.params.orderId;
    const updateOp={};
    for(let ops of Order.findById(id)){
        updateOp[ops.name]=req.body.name;
        updateOp[ops.price]=req.body.price;
    }
    Order.update({_id:id},{$set:updateOp})
        .then(value => {
            res.status(200).json({
                Order:{
                    mess:"update Order",
                    name:value.name,
                    price:value.price
                }
            });
        }).catch(err => {
            console.error(err);
            res.status(404 || 500).json({
                Error:{
                    mess:err.message,
                    status:err.status
                }
            });
    });
});
module.exports=router;