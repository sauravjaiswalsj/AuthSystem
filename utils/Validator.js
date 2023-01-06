const validateName = (name)=>{
    const nameRegex = new RegExp(/[a-zA-Z][a-zA-Z]+[a-zA-Z]$/)
    return nameRegex.test(name);
  }
  
  const validateEmail = (email)=>{

    const reg = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");
  
    return reg.test(email);
  }
  
  const validatePassword = (password)=>{
  const passwordRegex = new RegExp("^(?=.*[0-9])"
                         + "(?=.*[a-z])(?=.*[A-Z])"
                         + "(?=.*[@#$%^&+=])"
                         + "(?=\\S+$).{8,20}$");

  const passwordRegexCheck = new RegExp("^(?=.*[0-9])"
                         + "(?=.*[a-z])(?=.*[A-Z])"
                         + "(?=\\S+$).{8,20}$");                        
  
    return passwordRegexCheck.test(password);
  }
  
  module.exports = {
    validateName,
    validateEmail,
    validatePassword
  }