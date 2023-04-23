const emailvalidator = require('email-validator');

 const validateEmail=(email)=>{
    if (!emailvalidator.validate(email)) {
        return false
    }
    return true
}


module.exports={validateEmail}
