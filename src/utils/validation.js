const validator =require ("validator");

const validateSignUpData = (req)=>{
    const {firstName , lastName , emailId , password} = req.body;
    if(!firstName || !lastName){
        throw new Error("name is not valid");
    }else if(!validator.isEmail(emailId)){
        throw new Error("email is not valid");
    }else if(!validator.isStrongPassword(password, {
        minLength: 8, 
        minLowercase: 1,
        minUppercase: 1, 
        minNumbers: 1, 
        minSymbols: 1})){
        throw new Error("password is not strong enough");
    }
}

module.exports = {
    validateSignUpData,
}