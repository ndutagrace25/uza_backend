const express = require("express")
const router = express.Router()
//
const {ProductController} = require("../controllers")
router.get("/all",(req,res)=>{
    ProductController.allProducts((error,products)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(products)
        }
    })
})
router.post("/create", (req,res)=>{
    ProductController.createProduct(req.body,(error,created)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(created)
        }
    })
})
router.patch("/update", (req,res)=>{
    ProductController.editProduct(req.body, (error, success)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(success)
        }
    })
})
router.get("/specific/:id", (req,res)=>{
    ProductController.specificPrdct(req.params.id, (error,success)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(success)
        }
    })
})
router.get("/category/:id", (req,res)=>{
    ProductController.prdctByCategory(req.params.id, (error,success)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(success)
        }
    })
})
router.delete("/delete/:id", (req,res)=>{
    ProductController.deleteProduct(req.params.id,(error,success)=>{
        if(error){
            res.status(400).json(error)
        }else{
            res.status(200).json(success)
        }
    })
})
module.exports = router