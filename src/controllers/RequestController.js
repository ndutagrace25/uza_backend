const Requests = require("../../models").Requests
const validator = require("../validators").requestValidator
module.exports = {
    createRequest(reqInfo, result){
        const {error,isValid} = validator.reqCreate(reqInfo)
        if(isValid){
            Requests.create({
                quantity: parseInt(reqInfo.quantity),
                product_id: parseInt(reqInfo.product_id),
                date: reqInfo.date
            }).then(reqCreated=>{
                result(null, {Message: "Request Added Successfully"})
            }).catch(err=>result({Error: err},null))
        }else{
            result({Error:error},null)
        }
    },
    
}