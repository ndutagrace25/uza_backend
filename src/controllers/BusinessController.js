const Business = require("../../models").Businesses
const sequelize = require("sequelize")
const validator = require("../validators/businessValidator")
module.exports = {
    createBusiness(businessInfo,result){
        //Validate post input
        const {error,isValid} = validator.create(businessInfo)
        if(isValid){
            Business.create({
                name: businessInfo.name,
                slogan: businessInfo.slogan,
                location: businessInfo.location,
                address: businessInfo.address,
                weblink: businessInfo.weblink
            }).then(created=>{
                result(null,{Message: "Business Created Successfully"})
            }).catch(err=>result({Error:err}.null))
        }else{
            result({Error: error},null)
        }
    },
    getBusiness(){
        Business.findAll({
            attributes: ['id','name','slogan','weblink','location','address']
        }).then(found=>{
            result(null,found)
        }).catch(error=>result({Error: error},null))
    },
    editBizInfo(bizInfo,result){

    },
    deleteBiz(bizId){
        
    }
}
