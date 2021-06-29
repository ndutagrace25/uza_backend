const isEmpty = require("is-empty")
module.exports = {
    register(info){
         //
         let error = {};
         if(isEmpty(info.username)){
             error.username = "Username value not found.";
         }
         if(isEmpty(info.firstName)){
             error.firstName = "Firstname empty. Insert a value.";
         }
         if(isEmpty(info.lastName)){
             error.lastName = "Lastname empty. Feed in a value.";
         }
         if(isEmpty(info.password)){
             error.password = "Password field empty.";
         }
         if(isEmpty(info.contact)){
             error.contact = "Telephone number required.";
         }
         if(isEmpty(info.email)){
             error.email = "Kindly provide an email..for Official communication";
         }
         if(isEmpty(info.business_id)){
            error.business_id = "Provide the business associated with the User";
        }
         return {error, isValid: isEmpty(error)}
    },
    login(userInfo){
        let error = {};
        if(isEmpty(userInfo.username)){
            error.username = "Username empty.";
        }
        if(isEmpty(userInfo.password)){
            error.password = "Password empty.";
        }
        return {error, isValid: isEmpty(error)}
    },
    delete(info){
        let error = {}
        if(isEmpty(info)){
            error.id = "Provide the User id param"
        }
        return{error, isValid:isEmpty(error)}
    },
    getByBusiness(info){
        let error = {}
        if(isEmpty(info)){
            error.id = "Provide the Business id param"
        }
        return{error, isValid:isEmpty(error)} 
    },
    getByUser(info){
        let error = {}
        if(isEmpty(info)){
            error.id = "Provide the User id param"
        }
        return{error, isValid:isEmpty(error)} 
    },
    profile(userInfo){
        let error = {}
        if(isEmpty(userInfo.userId)){
            error.userId = "Provide the User to modify"
        }
        if(isEmpty(userInfo)){
            error.values = "Provide the values to update"
        }
        return{error, isValid: isEmpty(error)}
    },
    passreset(info){
        let error = {};
        if(isEmpty(info.username)){
            error.username = "Username to update passord missing."
        }
        if(isEmpty(info.password)){
            error.password = "What`s the new password?"
        }
        if(isEmpty(info.contact)){
            error.contact = "Provide a contact to verify against"
        }
        return {error, isValid: isEmpty(error)}
    }
}