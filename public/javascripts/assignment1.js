function validateEmail() {
    let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    let emailInput = document.getElementById("email");
    let errorDiv = document.getElementById("emailError");
    if(regex.test(emailInput.value) == true){
        return true;
    }
    try {
        if (regex.test(emailInput.value) != true) {
            throw "Please provide a valid email address.";
        }
        emailInput.style.background = "";
        errorDiv.innerHTML = "";
        errorDiv.style.display = "none";
        emailInput.value = emailInput.value.toLowerCase();
    }
    catch (msg) {
        errorDiv.innerHTML = msg;
        errorDiv.style.display = "block";
        emailInput.style.background = "rbg(255,233,233)";
    }
}
function validateFirstName() {
    let firstName = document.getElementById("firstName");
    let errorDiv = document.getElementById("firstNameError");
    if(firstName.value.length > 2){
        return true;
    }else{
        try {
            if (firstName.value.length < 2) {
                throw "First name must be at least 2 characters long";
            }
            firstName.style.background = "";
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }
        catch (msg) {
            errorDiv.style.display = "block";
            errorDiv.innerHTML = msg;
            firstName.style.background = "rbg(255,233,233)";
        }
    }
}
function validateLastName() {
    let lastName = document.getElementById("lastName");
    let errorDiv = document.getElementById("lastNameError");
    if(lastName.value.length > 2){
        return true;
    }else{
        try {
            if (lastName.value.length < 2) {
                throw "Last name must be at least 2 characters long";
            }
            lastName.style.background = "";
            errorDiv.style.display = "none";
            errorDiv.innerHTML = "";
        }
        catch (msg) {
            errorDiv.style.display = "block";
            errorDiv.innerHTML = msg;
            lastName.style.background = "rbg(255,233,233)";
        }
    }
}
function verifyValues() {
    validateEmail();
    validateFirstName();
    validateLastName();
    if(validateLastName() == true & validateFirstName() == true & validateEmail()){
        location.href = "./";
    }
}
let send = document.getElementById("send");
if (send.addEventListener) {
    send.addEventListener("click", verifyValues, false);
} else if (send.attachEvent) {
    send.attachEvent("onclick", verifyValues);
}