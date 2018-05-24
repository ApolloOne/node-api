const express=require('express');
const mongoose=require('mongoose');
var Product=require('../model/products');
const router=express.Router();
// Get all product
router.get('/',(req,res)=>{
    Product.find()
        .exec()
        .then( doc => {
            res.status(200).json({
                count:doc.length,
                product:doc.map(value=>{
                    return {
                        name:value.name,
                        price:value.price,
                        request:{
                            type:'method Get',
                            url:'Localhost:8080/products/'+value._id,
                        },
                        created_at:value.created_at
                    }
                })
            });
        })
        .catch(err=>{
            console.error(err);
        })
});
// Post product
router.post('/',(req,res)=>{
    const product=new Product({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price
    });
    product
        .save()
        .then(result=>{
        console.log(result)})
        .catch(err=>{
        console.error(err)
    });
    res.status(200).json({
        mess:'Method post on Product',
        product:product
    });
});
// Get A product
router.get('/:productId',(req,res)=>{
    const id=req.params.productId;
    Product.findById(id)
        .exec()
        .then(doc=>{
            console.log(doc);
            res.status(200).json(doc);
        }).catch(err => {
            console.error(err);
            res.status(500).json({
                mess:err.message,
                status:err.status
            });
        });
});
// update product
router.patch('/:productId',(req,res)=>{
    const id=req.params.productId;
    const updateOp={};
    for(let ops of Product.findById(id)){
        updateOp[ops.name]=req.body.name;
        updateOp[ops.price]=req.body.price;
    }
    Product.update({_id:id},{$set:updateOp})
        .then(value=>{
            res.status(200).json({
                Update:{
                    mess:'Product updated',
                    name:value.name,
                    price:value.price
                }
            });
        })
        .catch(err => {
            console.error(err);
            res.status(404 || 500).json({
                Error:{
                    mess:err.message,
                    status:err.status
                }
            });
        })
});
// delete product
router.delete('/:productId',(req,res)=>{
    const id=req.params.productId;
    Product.remove({_id:id})
        .then(value=>{
            res.status(200).json({
                removed:{
                    mess:"removed",
                    id:value._id,
                    name:value.name,
                    request:{
                        type:'Post',
                        url:'localhost:8080/products'+value._id
                    }
                }
            })
        }).catch(err=>{
            console.error(err);
            res.status(404 || 500).json({
                Error:{
                    mess:err.message,
                    status:err.status
                }
            });
    })
});
module.exports=router;