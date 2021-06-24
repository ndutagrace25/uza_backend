const isEmpty = require("is-empty")
module.exports = {
    create(bizInfo){
        let error = {}
        if(isEmpty(bizInfo.name)){
            error.name = "Provide the business name"
        }
        if(isEmpty(bizInfo.slogan)){
            error.slogan = "Provide your Business Tagline"
        }
        if(isEmpty(bizInfo.location)){
            error.location = "Where are you based?"
        }
        return {error, isValid: isEmpty(error)}
    },
    edit(bizId){
        let error = {}
        if(isEmpty(bizId)){
            error.values = "Provide either or all of this(name,slogan,weblink,location,address)"
        }
        if(isEmpty(bizId.biz_id)){
            error.biz_id = "Provide the business to update"
        }
        return{error, isValid: isEmpty(error)}
    }
}