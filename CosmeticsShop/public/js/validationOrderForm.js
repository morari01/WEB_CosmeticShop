function validateForm() {
    const productNameInput = document.getElementById("productName");
    const producerNameInput = document.getElementById("producerName");
    const quantityInput = document.getElementById("quantity");
    const dateShippingInput = document.getElementById("dateShipping");

    const errorProductName = document.getElementById("errorProductName");
    const errorProducerName = document.getElementById("errorProducerName");
    const errorQuantity = document.getElementById("errorQuantity");
    const errorDateShipping = document.getElementById("errorDateShipping");

    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([productNameInput,producerNameInput,quantityInput,dateShippingInput],
        [errorProductName,errorProducerName, errorQuantity, errorDateShipping], errorsSummary);



    let valid = true;

    if (productNameInput.value == -1) {
        valid = false;
        productNameInput.classList.add("error-input");
        errorProductName.innerText = "Pole jest wymagane";
        errorProductName.classList.add("errors-text");
    }

    if (producerNameInput.value == -1) {
        valid = false;
        producerNameInput.classList.add("error-input");
        errorProducerName.innerText = "Pole jest wymagane";
        errorProducerName.classList.add("errors-text");
    }

    if (!checkRequired(quantityInput.value)) {
        valid = false;
        quantityInput.classList.add("error-input");
        errorQuantity.innerText = "Pole jest wymagane";
        errorQuantity.classList.add("errors-text");
    } else if (!checkNumber(quantityInput.value)) {
        valid = false;
        quantityInput.classList.add("error-input");
        errorQuantity.innerText = "Pole powinno byc liczba";
        errorQuantity.classList.add("errors-text");
    } else if(!checkNumberRange(quantityInput.value, 1,1000)){
        valid = false;
        quantityInput.classList.add("error-input");
        errorQuantity.innerText = "Pole powinno byc liczba w zakresie od 1 do 1000";
        errorQuantity.classList.add("errors-text");
    }

    let nowDate = new Date(),
        month = '' + nowDate.getMonth()+1,
        day = '' + nowDate.getDay(),
        year =  nowDate.getFullYear();


    if(month.length===1) month = '0' + month;
    if(day.length===1) day = '0' + day;

    const nowString = `${year}-${month}-${day}`;
    //console.log(nowString);

  //  console.log(dateShippingInput.value);


    if(!checkRequired(dateShippingInput.value)){
        valid = false;
        dateShippingInput.classList.add("error-input");
        errorDateShipping.innerText = "Pole jest wymagane";
        errorDateShipping.classList.add("errors-text");
    } else if(!checkDate(dateShippingInput.value)){
        valid = false;
        dateShippingInput.classList.add("error-input");
        errorDateShipping.innerText = "Pole powinno zawierac date w formacie yyyy-mm-dd (np. 2000-01-01)";
        errorDateShipping.classList.add("errors-text");
    } else if(!checkDateIfAfter(dateShippingInput.value, nowString)){
        valid = false;
        dateShippingInput.classList.add("error-input");
        errorDateShipping.innerText = "Pole powinno zawierac date pozniejsza od dzisiejszej/dzisiejsza";
        errorDateShipping.classList.add("errors-text");
    }


    if(!valid){
        errorsSummary.innerText = "Formularz zawiera bledy!";
        errorsSummary.classList.add("errors-text");
    }

    return valid;

}
