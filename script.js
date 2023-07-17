const buttonSubmit = document.querySelector('#submitButton');
const dayInput = document.querySelector('#day');
const monthInput = document.querySelector('#month');
const yearInput = document.querySelector('#year');
const dayResult = document.querySelector('#dayResult');
const monthResult = document.querySelector('#monthResult');
const yearResult = document.querySelector('#yearResult');
const errorDayField = document.querySelector('#errorDay');
const errorMonthField = document.querySelector('#errorMonth');
const errorYearField = document.querySelector('#errorYear');
const yearLabel = document.querySelector('#yearLabel');
const monthLabel = document.querySelector('#monthLabel');
const dayLabel = document.querySelector('#dayLabel');
const emptyFieldErr = 'This field is required';
const futureDateErr = 'Must be in the past';
const wrongValueErr = 'Must be a valid number';
const wrongDayErr = 'Must be a valid day';
const wrongMonthErr = 'Must be a valid month';
const daysInMonths = [31,28,31,30,31,30,31,31,30,31,30,31];

buttonSubmit.addEventListener('click',e=>{
    e.preventDefault();
    if(validateInputs()){
        const result = calcDate();
        showResult(result);
    }
});
function validateInputs(){
    const inputs = [dayInput,monthInput,yearInput];  
    let validDateInputs = [];
    inputs.forEach(input =>{
        if (input.value=='') {
            showError(input,emptyFieldErr);
        } else if (isNaN(input.value)||input.value<1){
                showError(input,wrongValueErr);
        } else {
            resetErrors(input);    
            validDateInputs.push(input);
        }
    });
    if(validDateInputs.length === 3) {
        if(validateDate(validDateInputs)){
            return true;
        }
    } 
    return false;
}
function validateDate(arr){
    const actualDate = new Date();
    const actualYear = actualDate.getFullYear();
    const actualMonth = actualDate.getMonth()+1;
    const actualDay = actualDate.getDate();
    const year = parseInt(arr[2].value);
    const month = parseInt(arr[1].value);
    const day = parseInt(arr[0].value);
    let validDatesArray = [];
    if(year===actualYear){
        if(month>actualMonth){
            showError(monthInput,futureDateErr)
        }
        else if(month===actualMonth){
            if(day>actualDay){
                showError(dayInput,futureDateErr)
            }
            else {
                return true;
            }
        } 
        else {     
            if(validateDay(day,month,year)){
                return true;
            } else {
                showError(dayInput,wrongDayErr);
            }
        }
    } else {
        if (validateYear(year,actualYear)){
            validDatesArray.push(year);
        }
        if (validateMonth(month)){
            validDatesArray.push(month);
        }
        if (validateDay(day,month,year)){
            validDatesArray.push(day);
        }
        if(validDatesArray.length === 3){
            return true;
        }
    }
    return false;
};
function validateDay(day,month,year){
    if(day>daysInMonths[month-1]){
        if ((month-1 == 1) && (day == 29)){
            let tryDate = new Date(year,month-1,day);
            let tryMonth = tryDate.getMonth();
            if (tryMonth==1){
                return true;
            } else {
                showError(dayInput,wrongDayErr)
                return false;
            }
        }
        else {
            showError(dayInput,wrongDayErr)
            return false;
        }
    } else {
        return true;
    }
};
function validateMonth(month){
    if(month>12){
        showError(monthInput,wrongMonthErr);
        return false;
    } else {
        return true;
    }
}
function validateYear(year,actualYear){
    if(year>actualYear){
        showError(yearInput,futureDateErr);
        return false;
    } else {
        return true;
    }
}
function calcDate(){
    let actualDate = new Date();
    let actualMonth = actualDate.getMonth()+1;
    let actualDay = actualDate.getDate();
    let year = parseInt(yearInput.value);
    let month = parseInt(monthInput.value);
    let day = parseInt(dayInput.value);
    let dateEntered = new Date(year,(month-1),day);
    let result = [];
    let totalDayDifference = Math.round((actualDate - dateEntered)/3600000/24);
    let yearDifference = Math.floor(totalDayDifference/365); 
    let monthDifference,dayDifference;
    if(month>actualMonth){
        monthDifference = actualMonth+12-month;
    } else {
        monthDifference = actualMonth-month;
    }
    if(day>actualDay){
        monthDifference--;
        dayDifference = actualDay+daysInMonths[actualMonth-2]-day;
    } else {
        if(day===29){
            dayDifference = actualDay - day - 1;
        } else {
            dayDifference = actualDay - day;
        }
    }
    result.push(yearDifference);
    result.push(monthDifference);
    result.push(dayDifference);
    return result;
};
function numberAnimation(num,end,element){
    if (num<=end){
        element.innerHTML = num;
        setTimeout(function(){
            numberAnimation(num+1,end,element)
        },10);
    }
}
function showResult(resultArr){
    numberAnimation(0,resultArr[0],yearResult);
    numberAnimation(0,resultArr[1],monthResult);
    numberAnimation(0,resultArr[2],dayResult);
}
function showError(input,errorMessage){
    input.style = 'border: 1px solid var(--clr-primary-light-red);';
    if(input.id == 'day') {
        errorDayField.innerHTML = errorMessage;
        dayLabel.style = 'color: var(--clr-primary-light-red);'
    }
    if(input.id == 'month') {
        errorMonthField.innerHTML = errorMessage;
        monthLabel.style = 'color: var(--clr-primary-light-red);'
    }
    if(input.id == 'year') {
        errorYearField.innerHTML = errorMessage;
        yearLabel.style = 'color: var(--clr-primary-light-red);'
    }
}
function resetErrors(input){
    input.style = 'border: 1px solid var(--clr-neutral-light-grey);';
    if(input.id == 'day') {
        errorDayField.innerHTML = '';
        dayLabel.style = 'color: var(--clr-neutral-smokey-grey);'
    }
    if(input.id == 'month') {
        errorMonthField.innerHTML = '';
        monthLabel.style = 'color: var(--clr-neutral-smokey-grey);'
    }
    if(input.id == 'year') {
        errorYearField.innerHTML = '';
        yearLabel.style = 'color: var(--clr-neutral-smokey-grey);'
    }
}