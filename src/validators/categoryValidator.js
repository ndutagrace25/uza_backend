const isEmpty = require("is-empty")
module.exports = {
    createCat(info){
        let error = {}
        if(isEmpty(info.name)){
            error.name = "Provide Category name"
        }
        return {error, isValid:isEmpty(error)}
    },
    editCat(info){
        let error = {}
        if(isEmpty(info.category_id)){
            error.category_id = "Provide Category to Update"
        }
        if(isEmpty(info)){
            error.value = "Provide Category Name to Update"
        }
        return{error,isValid:isEmpty(error)}
    }
}