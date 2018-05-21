const express=require('express');
const router=express.Router();
router.get('/',(req,res)=>{
    res.status(200).json({
        mess:'Method get on Product'
    });
});
router.get('/param',(req,res)=>{
   const user=req.param('user');
   res.send('User '+user);
});
router.get('/:productId',(req,res)=>{
    const id=req.params.productId;
    if(typeof id === 'string'){
        res.send('Passed Param is '+id);
    }
});
module.exports=router;