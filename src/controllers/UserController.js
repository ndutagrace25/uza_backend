const Users = require("../../models").Users
const Business = require("../../models").Businesses
const bcrypt = require("bcryptjs")
const {userValidator} = require("../validators")
const secret = require("../../config").keys
const sequelize = require("sequelize")
const Op = sequelize.Op
module.exports = {
    register(userInfo,result){
        const {error,isValid} = userValidator.register(userInfo)
        if(isValid){
            //Encrypt the password
            const hashedPass = bcrypt.hashSync(userInfo.password, 12);
            //Ensure no other user exists by the given values
            Users.findAll({
                where: {
                  [Op.or]: [{
                      username: userInfo.username,
                    },
                    {
                      contact: userInfo.contact,
                    },
                    {
                      email: userInfo.email,
                    },
                  ],
                },
                raw: true,
              }).then(user=>{
                if (user.length > 0) {
                    err = [];
                    user.forEach((u) => {
                      if (u.username == userInfo.username) {
                        err.push("Username exists");
                      }
                      if (u.email == userInfo.email) {
                        err.push("Email already exists");
                      }
                      if (u.contact == userInfo.contact) {
                        err.push("Contact already exists");
                      }
                    });
                    result({
                        Error: err,
                      },
                      null
                    );
                  }else{
                      //Proceed to registration
                      //Ensure business id provided is valid
                      Business.findByPk(userInfo.business_id).then(business=>{
                        if(business!==null){
                          Users.create({
                            username: userInfo.username,
                            first_name: userInfo.firstName,
                            last_name: userInfo.lastName,
                            email: userInfo.email,
                            contact: userInfo.contact,
                            password: hashedPass,
                            business_id: userInfo.business_id
                          }).then(()=>{
                            result(null, {Message: "User Created Successfully"})
                          }).catch(err=>result({Error: err},null))
                        }else{
                          result({Error: "Invalid business Provided"},null)
                        }
                      }).catch(err=>result({Error: err},null))
                  }
              }).catch(err=>result({Error: err},null))
        }else{
            result({Error: error},null)
        }
    },
    login(userInfo,result){
      const {error, isValid} = userValidator.login(userInfo)
      if(isValid){
        Users.findOne({
          where: {
            username: userInfo.username,
          },
          raw: true,
        })
        .then((user) => {
          if (user) {
            bcrypt
              .compare(userInfo.password, user.password)
              .then((isMatch) => {
                if (isMatch) {
                  const data = {
                    firstName: user.first_name,
                    lastName: user.last_name,
                    username: user.username,
                    phone_number: user.contact,
                    email: user.email,
                    id: user.id,
                    businessId: user.business_id,
                  };
                  jwt.sign(
                    data,
                    secret.secretKey, {
                      expiresIn: "30",
                    },
                    (error, token) => {
                      if (error) {
                        result({
                            Error: "An error occured while trying to login.",
                          },
                          null
                        );
                      } else {
                        result(null, {
                          token,
                        });
                      }
                    }
                  );
                } else {
                  result({
                      Error: "Wrong username or password.",
                    },
                    null
                  );
                }
              });
          } else {
            result({
                Error: "Wrong username or password.",
              },
              null
            );
          }
        })
        .catch((error) => {
          result({Error: error}, null);
        });
      }else{
        result({Error: error},null)
      }
    },
    getUsers(businessId,result){
      const {error, isValid} = userValidator.getByBusiness(businessId)
      if(isValid){
        Business.findByPk(businessId).then(biz=>{
          if(biz!==null){
            Users.findAll({
              where: {
                business_id: businessId
              }
            }).then(users=>{
              result(null, users)
            }).catch(err=>result({Error: err},null))
          }else{
            result({Error: "Invalid Business"},null)
          }
        }).catch(err=>result({Error: err},null))
    
      }else{
        result({Error: error},null)
      }
    },
    getUserById(userId,result){
      const {error, isValid} = userValidator.getByUser(userId)
      if(isValid){
        Users.findOne({
          where: {
            id: userId
          }
        }).then(user=>{
          result(null, user)
        }).catch(err=>result({Error: err},null))
      }else{
        result({Error: error},null)
      }
    },
    changeProfile(userInfo,result){
      const {error,isValid} = userValidator.profile(userInfo)
      if(isValid){
        Users.findByPk(userInfo.userId).then(user=>{
          if(user!==null){
            user.update({
              first_name: userInfo.firstName,
              username: userInfo.username,
              last_name: userInfo.lastName,
              email: userInfo.email,
              contact: userInfo.contact,
            }).then(()=>{
              result(null, {Message: "Profile Update Successful"})
            }).catch(err=>result({Error: err},null))
          }else{
            result({Error: "Invalid User"},null)
          }
        }).catch(err=>result({Error: err},null))
      }else{
        result({Error: error}, null)
      }
    },
    passwordReset(userInfo,result){
      const {error, isValid} = userValidator.passreset(userInfo)
      if(isValid){
        const newpass = bcrypt.hashSync(userInfo.password, 12);
        Users.findOne({
            where: {
              [Op.and]: [{
                  username: resetData.username,
                },
                {
                  contact: resetData.contact,
                },
              ],
            },
          })
          .then((user) => {
            if (user !== null) {
              user
                .update({
                  password: newpass,
                })
                .then(() => {
                  result(null, {
                    message: "Password Update Successfull",
                  });
                })
                .catch((err) =>
                  result({
                      error: err,
                    },
                    null
                  )
                );
            } else {
              result({
                  error: "Invalid Contact given",
                },
                null
              );
            }
          })
          .catch((err) => {
            result({
                error: err,
              },
              null
            );
          });
      }else{
        result({Error: error},null)
      }
    },
    deleteUser(userId,result){
      const {error,isValid} = userValidator.delete(userId)
      if(isValid){
        Users.findByPk(parseInt(userId)).then(user=>{
          if(user!==null){
            user.destroy().then(()=>{
              result(null,{Message: "User Deleted Successfully"})
            }).catch(err=>result({Error: err},null))
          }else{
            result({Error: "Invalid User Provided"},null)
          }
        }).catch(err=>result({Error: err},null))
      }else{
        result({Error: error},null)
      }
    }
}