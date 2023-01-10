function validateForm() {
    const nameInput = document.getElementById('name');
    const productTypeInput = document.getElementById('productType');
    const capacityInput = document.getElementById('capacity');
    const priceInput = document.getElementById('price');

    const errorName = document.getElementById('errorName');
    const errorProductType = document.getElementById('errorProductType');
    const errorCapacity = document.getElementById('errorCapacity');
    const errorPrice = document.getElementById('errorPrice');

    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([nameInput,productTypeInput,capacityInput,priceInput], [errorName, errorProductType, errorCapacity, errorPrice], errorsSummary);

    let valid = true;

    if (!checkRequired(nameInput.value)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole jest wymagane";
        errorName.classList.add("errors-text");
    } else if (!checkTextLengthRange(nameInput.value, 2, 50)) {
        valid = false;
        nameInput.classList.add("error-input");
        errorName.innerText = "Pole powinno zawierac od 2 do 50 znakow";
        errorName.classList.add("errors-text");
    }

    if (!checkRequired(productTypeInput.value)) {
        valid = false;
        productTypeInput.classList.add("error-input");
        errorProductType.innerText = "Pole jest wymagane";
        errorProductType.classList.add("errors-text");
    } else if (!checkTextLengthRange(productTypeInput.value, 2, 50)) {
        valid = false;
        productTypeInput.classList.add("error-input");
        errorProductType.innerText = "Pole powinno zawierac od 2 do 50 znakow";
        errorProductType.classList.add("errors-text");
    }

    if (!checkRequired(capacityInput.value)) {
        valid = false;
        capacityInput.classList.add("error-input");
        errorCapacity.innerText = "Pole jest wymagane";
        errorCapacity.classList.add("errors-text");
    } else if (!checkNumber(capacityInput.value)) {
        valid = false;
        capacityInput.classList.add("error-input");
        errorCapacity.innerText = "Pole powinno byc liczba";
        errorCapacity.classList.add("errors-text");
    } else if (!checkTextLengthRange(capacityInput.value, 1, 5)) {
        valid = false;
        capacityInput.classList.add("error-input");
        errorCapacity.innerText = "Pole powinno zawierac od 2 do 50 znakow";
        errorCapacity.classList.add("errors-text");
    }

    if (!checkRequired(priceInput.value)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole jest wymagane";
        errorPrice.classList.add("errors-text");
    } else if (!checkTextLengthRange(priceInput.value, 2, 6)) {
        valid = false;
        priceInput.classList.add("error-input");
        errorPrice.innerText = "Pole powinno zawierac od 2 do 6 znakow";
        errorPrice.classList.add("errors-text");
    }

    if(!valid){
        errorsSummary.innerText = "Formularz zawiera bledy!";
        errorsSummary.classList.add("errors-text");
    }

    return valid;

}




