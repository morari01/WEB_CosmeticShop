function resetErrors(inputs, errorTexts, errorInfo) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("error-input");
    }
    for (let i = 0; i < errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}
function checkRequired(value){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    return value !== "";
}


function checkTextLengthRange(value, min, max){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if(max && length > max) {
        return false;
    }
    if(min && length < min) {
        return false;
    }
    return true;
}

function checkEmail(value){
    let value1 = value.toString().trim();
    if(value1.length==0) return true;
    if(value1.length>0){
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(value);
    }
}

function checkPhone(value){
    if(!value){
        return false;
    }
    value = value.toString().trim();
    const re =/^[+]?\d+$/;
    return re.test(value);
}


function checkNumber(value){
    if(!value){
        return false;
    }
    if(isNaN(value)){
        return false;
    }
    return true;
}

function checkNumberRange(value, min, max){
    if(!value){
        return false;
    }
    if(isNaN(value)){
        return false;
    }
    value = parseFloat(value);
    if(value<min){
        return false;
    }
    if(value>max){
        return false;
    }
    return true;
}

function checkDate(value){
    if(!value){
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    return pattern.test(value);
}


function checkDateIfAfter(value, compareTo){
    if(!value){
        console.log("pattern")
        return false;
    }
    if(!compareTo){
        console.log("compareto")
        return false;
    }
    const pattern = /(\d{4})-(\d{2})-(\d{2})/;
    if(!pattern.test(value)){
        console.log("pattern")
        return false;
    }
    if(!pattern.test(compareTo)){
        console.log("pattern2")
        return false;
    }

    const valueDate = new Date(value);
    const compareToDate = new Date(compareTo);
    /*console.log(valueDate.getDate())
    console.log(compareToDate.getDate())*/

    return valueDate >= compareToDate;

}