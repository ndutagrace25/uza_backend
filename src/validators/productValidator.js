const isEmpty = require("is-empty")
module.exports = {
    createPrdct(info){
        let error = {}
        if(isEmpty(info.name)){
            error.name = "Provide the Product Name"
        }
        if(isEmpty(info.color)){
            error.color = "Provide the Product Color"
        }
        if(isEmpty(info.quantity)){
            error.name = "Provide Product Quantity"
        }
        if(isEmpty(info.type)){
            error.type = "Provide Product Type(i.e Men,Women)"
        }
        if(info.type!=="Men"|| info.type !== "Women"){
            error.type = "Provide type as either 'Men' or 'Women'"
        }
        if(isEmpty(info.brand)){
            error.brand = "Provide Product Brand(e.g., Nike,Mtush)"
        }
        if(isEmpty(info.size)){
            error.size = "Provide the Product Size(e.g.,M,XL,32)"
        }
        if(isEmpty(info.category_id)){
            error.category_id = "Provide Product Category"
        }
        if(isEmpty(info.business_id)){
            error.business_id = "Provide Business the Product belongs to"
        }
        return {error,isValid:isEmpty(error)}
    },
    editPrdct(info){
        let error = {}
        if(isEmpty(info)){
            error.values = "Provide the fields to Update"
        }
        if(isEmpty(info.product_id)){
            error.product_id = "Provide the product to Update"
        }
        return{ error, isValid:isEmpty(error)}
    },
    specificPrdct(info){
        let error = {}
        if(isEmpty(info)){
            error.id = "Provide Product id"
        }
        return{error, isValid:isEmpty(error)}
    },
    byCategory(info){
        let error = {}
        if(isEmpty(info)){
            error.id = "Provide Category id"
        }
        return{error, isValid:isEmpty(error)}
    }
}