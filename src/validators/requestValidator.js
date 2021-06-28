const isEmpty = require("is-empty")
module.exports = {
    reqCreate(info){
        let error = {}
        if(isEmpty(info.product_id)){
            error.product_id = "Provide the requested product as well"
        }
        if(isEmpty(info.quantity)){
            error.quantity = "Provide the number of requests"
        }
        if(isEmpty(info.date)){
            error.date = "Provide the date"
        }
        return {error, isValid:isEmpty(error)}
    }

}