const express = require("express")
const router = express.Router()
const CategoryController = require("../controllers").CategoryController
//
router.post("/create",(req,res)=>{
    CategoryController.createCategory(req.body,(error,created)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(created)
        }
    })
})
router.get("/all", (req,res)=>{
    CategoryController.allCategories((error,categories)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(categories)
        }
    })
})
router.patch("/update",(req,res)=>{
    CategoryController.editCategory(req.body,(error,edited)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(edited)
        }
    })
})
router.delete("/delete/:id",(req,res)=>{
    CategoryController.deleteCat(req.params.id, (error,deleted)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(deleted)
        }
    })
})
module.exports = router