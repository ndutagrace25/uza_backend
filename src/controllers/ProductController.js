const Products = require("../../models").Products
const {productValidator} = require("../validators")
module.exports = {
    createProduct(productInfo,result){
        const {error,isValid} = productValidator.createPrdct(productInfo)
        if(isValid){
            Products.create({
                name: productInfo.name,
                color: productInfo.color,
                quantity: productInfo.quantity,
                type: productInfo.type,
                brand: productInfo.brand,
                size: productInfo.size,
                category_id: productInfo.category_id,
                business_id: productInfo.business_id
            }).then(()=>{
                result(null,{Message: "Product Added Successfully"})
            }).catch(err=>result({Error: err},null))
        }else{
            result({Error: error},null)
        }
    },
    editProduct(productInfo, result){
        const {error, isValid} = productValidator.editPrdct(productInfo)
        if(isValid){
            //Ensure product exists
            Products.findByPk(productInfo.product_id).then(product=>{
                if(product!==null){
                    product.update({
                        name: productInfo.name,
                        color: productInfo.color,
                        quantity: productInfo.quantity,
                        type: productInfo.type,
                        brand: productInfo.brand,
                        size: productInfo.size,
                        category_id: productInfo.category_id,
                    }).then(()=>{
                        result(null,{Message: "Product Update Successful"})
                    }).catch(err=>result({Error: err},null))
                }else{
                    result({Error: "Invalid product provided"},null)
                }
            }).catch(err=>result({Error: err},null))
        }else{
            result({Error: error},null)
        }
    },
    allProducts(result){
        Products.findAll({

        }).then((products)=>{
            result(null, products)
        }).catch(err=>result({Error:err},null))
    },
    specificPrdct(product_id,result){
        const {error,isValid} = productValidator.specificPrdct(product_id)
        if(isValid){
            Products.findByPk(product_id).then(prdct=>{
                if(prdct!==null){
                    result(null,prdct)
                }else{
                    result({Error: "Invalid Product"},null)
                }
            }).catch(err=>result({Error: err},null))
        }else{
            result({Error: error},null)
        }
    },
    prdctByCategory(category_id,result){
        const {error,isValid} = productValidator.byCategory(category_id)
        if(isValid){
            Products.findOne({
                where:{
                    category_id: category_id
                }
            }).then((product)=>{
                if(product!==null){
                    result(null, product)
                }else{
                    result({Error: "Invalid Category Provided"},null)
                }
            }).catch(err=>result({Error:err},null))
        }else{
            result({Error: error},null)
        }
    },
    deleteProduct(productId,result){
        Products.findByPk(productId).then((product)=>{
            if(product!==null){
                product.destroy().then(()=>{
                    result(null,{Message:"Product Deleted Successfully"})
                }).catch(err=>result({Error: err},null))
            }else{
                result({Error:"Invalid Product Provided"},null)
            }
        }).catch(err=>result({Error: err},null))
    }
}