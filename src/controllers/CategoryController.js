const Category = require("../../models").Categories
const validator = require("../validators").categoryValidator
module.exports = {
    createCategory(catInfo,result){
        const {error,isValid} = validator.createCat(catInfo)
        if(isValid){
            Category.create({
                name: catInfo.name
            }).then(()=>{
                result(null,{Message: "Category Added Successfully"})
            }).catch(err=>result({Error:err},null))
        }else{
            result({Error:error},null)
        }
    },
    editCategory(catInfo,result){
        const {error, isValid} = validator.editCat(catInfo)
        if(isValid){
            //Ensure the id provided exists
            Category.findByPk(parseInt(catInfo.category_id)).then(catfound=>{
                if(catfound!==null){
                    catfound.update({
                        name: catInfo.name
                    }).then(()=>{
                        result(null,{Message: "Update Successful"})
                    }).catch(err=>result({Error:err},null))
                }else{
                    result({Error: "Invalid Category Provided"},null)
                }
            }).catch(err=>result({Error: err},null))
        }else{
            result({Error: error},null)
        }
    },
    allCategories(result){
        Category.findAll({
            attributes: ['id','name']
        }).then((categories)=>{
            result(null,categories)
        }).catch(err=>result({Error: err},null))
    },
    deleteCat(catId,result){
        Category.findByPk(catId).then((catFound)=>{
            if(catFound!==null){
                catFound.destroy().then(()=>{
                    result(null,{Message: "Category Deleted Successfully"})
                }).catch(err=>result({Error: err},null))
            }else{
                result({Error: "Invalid Category provided!"},null)
            }
        }).catch(err=>result({Error:err},null))
    }
}