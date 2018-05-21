const express=require('express');
const router=express.Router();
router.get('/',(req,res)=>{
    res.status(200).json({
        mess:'Method Get on orders'
    });
    res.send('Products');
});
router.post('/',(req,res)=>{
    const order={
        name:req.body.name,
        price:req.body.price
    };
    res.status(200).json({
        mess:'Method Post on orders',
        order:order
    });
});
module.exports=router;