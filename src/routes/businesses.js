//Import dependencies
const express = require("express")
const router = express.Router()
//
//Import the controller file
const {BusinessController} = require("../controllers")
router.get("/all",(req,res)=>{
    BusinessController.getBusiness((error,businesses)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(businesses)
        }
    })
})
router.post("/create",(req,res)=>{
    BusinessController.createBusiness(req.body,(error,created)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(created)
        }
    })
})
router.patch("/update", (req,res)=>{
    BusinessController.editBizInfo(req.body,(error,updated)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(updated)
        }
    })
})
router.delete("/delete/:id", (req,res)=>{
    BusinessController.deleteBiz(req.params.id,(error,deleted)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(deleted)
        }
    })
})
module.exports = router