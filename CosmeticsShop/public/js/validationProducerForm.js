function validateForm() {
    const nameInput = document.getElementById('name');
    const countryInput = document.getElementById('country');
    const cityInput = document.getElementById('city');
    const phoneInput = document.getElementById('phone');
    const emailInput = document.getElementById('email');

    const errorName = document.getElementById('errorName');
    const errorCountry = document.getElementById('errorCountry');
    const errorCity = document.getElementById('errorCity');
    const errorPhone = document.getElementById('errorPhone');
    const errorEmail = document.getElementById('errorEmail');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([nameInput,countryInput,cityInput,phoneInput,emailInput], [errorName, errorCountry, errorCity, errorPhone, errorEmail], errorsSummary);

    let valid = true;

    if(!checkRequired(nameInput.value)){
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole jest wymagane";
        errorName.classList.add("errors-text");
    } else if (!checkTextLengthRange(nameInput.value,2,50)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole powinno zawierac od 2 do 50 znakow";
        errorName.classList.add("errors-text");
    }


    if(!checkRequired(countryInput.value)){
        valid = false;
        countryInput.classList.add("error-input");
        errorCountry.innerText = "Pole jest wymagane";
        errorCountry.classList.add("errors-text");
    } else if (!checkTextLengthRange(countryInput.value,2,50)) {
        valid = false;
        countryInput.classList.add("error-input");
        errorCountry.innerText = "Pole powinno zawierac od 2 do 50 znakow";
        errorCountry.classList.add("errors-text");
    }


    if(!checkRequired(cityInput.value)){
        valid = false;
        cityInput.classList.add("error-input");
        errorCity.innerText = "Pole jest wymagane";
        errorCity.classList.add("errors-text");
    } else if (!checkTextLengthRange(cityInput.value,2,50)) {
        valid = false;
        cityInput.classList.add("error-input");
        errorCity.innerText = "Pole powinno zawierac od 2 do 50 znakow";
        errorCity.classList.add("errors-text");
    }



    if(!checkRequired(phoneInput.value)){
        valid = false;
        phoneInput.classList.add("error-input");
        errorPhone.innerText = "Pole jest wymagane";
        errorPhone.classList.add("errors-text");
    } else if (!checkTextLengthRange(phoneInput.value,9,15)) {
        valid = false;
        phoneInput.classList.add("error-input");
        errorPhone.innerText = "Pole powinno zawierac prawidlowy numer telefonu";
        errorPhone.classList.add("errors-text");
    } else if(!checkPhone(phoneInput.value)){
        valid = false;
        phoneInput.classList.add("error-input");
        errorPhone.innerText = "Pole powinno zawierac prawidlowy numer telefonu";
        errorPhone.classList.add("errors-text");
    }


    if(!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierac prawidlowy adres email";
        errorEmail.classList.add("errors-text");
    }


    if(!valid){
        errorsSummary.innerText = "Formularz zawiera bledy!";
        errorsSummary.classList.add("errors-text");
    }

    return valid;
}

