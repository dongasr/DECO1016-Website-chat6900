
//defining all variables that will be used
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const birthday = document.getElementById('birthday');
const email = document.getElementById('email');
const confirmEmail = document.getElementById('confirmEmail');
const mobileNumber = document.getElementById('mobileNumber');

const address = document.getElementById('address');
const city = document.getElementById('city');
const postcode = document.getElementById('postcode');
const state = document.getElementById('state');

const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

const form = document.getElementById('form1');


//colour style codes
const green = '#4CAF50';
const red = '#F44336';
const red2 = '#ff4242';
const gray = '#ccc';




///Validate functions//////////////////////////////////////

function validateFirstName(){
  if(checkEmpty(firstName)) return;
  if(!checkOnlyLetters(firstName)) return;
  return true;
}

function validateLastName(){
  if(checkEmpty(lastName)) return;
  if(!checkOnlyLetters(lastName)) return;
  return true;
}

function validateBirthday(){
  if(checkEmpty(birthday)) return;
  return true;
}

function validateMobileNumber(){
  if(checkEmpty(mobileNumber)) return;
  if(!checkOnlyNumbers(mobileNumber)) return;
  return true;
}

function validatePassword(){
  if(checkEmpty(password)) return;
  if(!meetLength(password, 3, 20)) return;



//Four options for password validation///////////
  //1 - password must have at least 1 letter (a)
  //2 - password must have at least 1 letter and 1 number (a, 1)
  //3 - password must have upper case, lower case & number (a, A, 1)
  //4 - password must have upper case, lower case, numbers and special characters (a, A, 1, #)
  if(!containsCharacters(password, 3)) return;
  return true;
}

function validateConfirmPassword(){
  if(password.className !== 'valid'){
    setInvalid(confirmPassword, 'Password must be valid');
    return;
  }
  //if the password matches
  if(password.value !== confirmPassword.value){
    setInvalid(confirmPassword, 'Password does not match');
    return;
  } else {
    setValid(confirmPassword);
  }
  return true;
}

function validateEmail(){
  if(checkEmpty(email)) return;
  if(!containsCharacters(email, 5)) return;
  return true;
}

function validateConfirmEmail(){
  if(email.className !== 'valid'){
    setInvalid(confirmEmail, 'Email must be valid');
    return;
  }
  //if email matches
  if(email.value !== confirmEmail.value){
    setInvalid(confirmEmail, 'Email doesnt not match');
    return;
  } else {
    setValid(confirmEmail);
  }
  return true;
}

function validateAddress(){
  if(checkEmpty(address)) return;
  return true;
}

//local storage
localStorage.setItem('address', address);
localStorage.getItem('address');

function validateCity(){
  if(checkEmpty(city)) return;
  if(!checkOnlyLetters(city)) return;
  return true;
}

function validatePostcode(){
  if(checkEmpty(postcode)) return;
  if(!checkOnlyNumbers(postcode)) return;
  if(!meetLength(postcode, 4, 5)) return;
  return true;
}

function validateState(){
  if(checkEmpty(state)) return;
  return true;
}





//////////////////////////////////////////////////////////////////
//Other functions

//will check if the input box is empty 
//if so, will display message
function checkEmpty(field){
  if(isEmpty(field.value.trim())){
    setInvalid(field,`${field.name} must not be empty`);
    return true;
  } else {
    setValid(field);
    return false;
  }
}

function isEmpty(value){
  if(value === '') return true;
  return false;
}


//if invalid, border colour will change to red
function setInvalid(field, message){
  field.className = 'invalid';
  field.nextElementSibling.innerHTML = message;
  field.nextElementSibling.style.color = red;
  field.style.borderColor = red2;
}

function setValid(field){
  field.className = 'valid';
  field.nextElementSibling.innerHTML = '';
  field.nextElementSibling.style.color = green;
  field.style.borderColor = gray;
}

//function must only contain letters
function checkOnlyLetters(field){
  if(/^[a-zA-Z ]+$/.test(field.value)){
    setValid(field);
    return true;
  } else {
    setInvalid(field, `${field.name} must contain only letters`);
    return false;
  }
}

//function must only contain numbers
function checkOnlyNumbers(field){
  if(/^[0-9]*$/.test(field.value)){
    setValid(field);
    return true;
  } else {
    setInvalid(field, `${field.name} must contain only numbers`);
    return false;
  }
}

//function must meet the length required (min and max)
function meetLength(field, minLength, maxLength){
  if(field.value.length >= minLength && field.value.length < maxLength){
    setValid(field);
    return true;
  } else if(field.value.length < minLength){
    setInvalid(field, `${field.name} must be at least ${minLength} characters long`);
    return false;
  } else {
    setInvalid(field, `${field.name} must be shorter than ${maxLength} characters`);
    return false;
  }
}

//various cases of regular expressions to choose from
//I have used case 3
//Cases 1-4 Used for password validation
//Case 5 used for email validation
function containsCharacters(field, code){
  let regEx;
  switch(code){
    //letters
    case 1:
      regEx = /(?=.*[a-zA-Z])/;
      return matchWithRegEx(regEx, field, 'Must contain at least one letter');

    //letter & number
    case 2:
      regEx = /(?=.*\d)(?=.*[a-zA-Z])/;
      return matchWithRegEx(regEx, field, 'Must contain at least one letter and one number');
    
    //uppercase & lowercase & number
    case 3:
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/;
      return matchWithRegEx(regEx, field, 'Must contain at least one upper case and lower case letter and one number');
    
    //uppercase, lowercase, number, special character
    case 4: 
      regEx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/;
      return matchWithRegEx(regEx, field, 'Must contain at least one upper case and lower case letter, one number, and one special character');

    case 5:
        regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return matchWithRegEx(regEx, field, 'Email is not valid');
    default:
      return false;
  }
}

function matchWithRegEx(regEx, field, message){
  if(field.value.match(regEx)){
    setValid(field);
    return true;
  } else {
    setInvalid(field, message);
    return false;
  }
}



