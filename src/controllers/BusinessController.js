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
    getBusiness(result){
        Business.findAll({
            attributes: ['id','name','slogan','weblink','location','address']
        }).then(found=>{
            result(null,found)
        }).catch(error=>result({Error: error},null))
    },
    editBizInfo(bizInfo,result){
        const {error,isValid} = validator.edit(bizInfo)
        if(isValid){
            //Validate id provided
            Business.findByPk(bizInfo.biz_id).then(bizfound=>{
                if(bizfound!==null){
                    bizfound.update({
                        name: bizInfo.name,
                        slogan: bizInfo.slogan,
                        weblink: bizInfo.weblink,
                        location: bizInfo.location,
                        address: bizInfo.address
                    }).then(()=>{
                        result(null,{Message: "Update Successful"})
                    }).catch(err=>result({Error: err},null))
                }else{
                    result({Error: "Invalid Business Provided"},null)
                }
            }).catch(err=>result({Error: err},null))
        }else{
            result({Error: error},null)
        }
    },
    deleteBiz(bizId,result){
        //Ensure id is valid
        Business.findByPk(bizId).then(found=>{
            if(found!==null){
                found.destroy().then(()=>{
                    result(null, {Message: "Business Deletion Successful"})
                }).catch(err=>result({Error: err},null))
            }else{
                result({Error: "Invalid business provided"},null)
            }
        }).catch(error=>result({error:error},null))
    }
}
