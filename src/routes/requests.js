const express = require("express")
const router = express.Router()
//import the controller
const requestController = require("../controllers").RequestController
router.post("/create", (req,res)=>{
    requestController.createRequest(req.body, (error,created)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(created)
        }
    })
})
module.exports= router