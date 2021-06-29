const express = require("express")
const router = express.Router()
//
const {UserController} = require("../controllers")
router.get("/all/:id", (req,res)=>{
    UserController.getUsers(req.params.id, (error,success)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(success)
        }
    })
})
router.patch("/update", (req,res)=>{
    UserController.changeProfile(req.body, (error,success)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(success)
        }
    })
})
router.post("/login", (req,res)=>{
    UserController.login(req.body, (error,success)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(success)
        }
    })
})
router.post("/passwordReset",(req,res)=>{
    UserController.passwordReset(req.body, (error,success)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(success)
        }
    })
})
router.post("/register", (req,res)=>{
    UserController.register(req.body, (error,success)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(success)
        }
    })
})
router.get("/specific/:id", (req,res)=>{
    UserController.getUserById(req.params.id, (error,success)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(success)
        }
    })
})
router.delete("/delete/:id",(req,res)=>{
    UserController.deleteUser(req.params.id, (error,success)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(success)
        }
    })
})
module.exports = router