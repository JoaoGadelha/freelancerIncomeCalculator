let fetchResult
let currValue;
let hourValue;
let hoursWorkedPerDay;
let daysWorkedPerMonth;
let taxes;
let calculationResult;
let message;
import { currencies } from './currencies.js';
let secondSelectMustBeEqualtoFirstSelect = true;

let getCurrValue = async () => {
    console.log('Fetching currency value')
    fetchResult = await fetch('https://api.exchangeratesapi.io/latest?base=USD');
    currValue = await fetchResult.json();
    console.log(currValue.rates[document.getElementsByClassName('firstSelect')[0].value]/currValue.rates[document.getElementsByClassName('secondSelect')[0].value]);
    currValue = currValue.rates[document.getElementsByClassName('secondSelect')[0].value]/currValue.rates[document.getElementsByClassName('firstSelect')[0].value];
}

let setSecondSelect = () => {
    if (secondSelectMustBeEqualtoFirstSelect) {
        console.log(document.getElementsByClassName('firstSelect')[0].value)
        document.getElementsByClassName('secondSelect')[0].value = document.getElementsByClassName('firstSelect')[0].value;
    }
}

let calc = async () => {
    console.log('Calculating...')
    await getCurrValue();
    hourValue = document.getElementsByClassName('hourValue')[0].value;
    hoursWorkedPerDay = document.getElementsByClassName('numberHoursPerDay')[0].value;
    daysWorkedPerMonth = document.getElementsByClassName('numberDaysPerMonth')[0].value;
    taxes = document.getElementsByClassName('taxes')[0].value;
    calculationResult = hourValue * hoursWorkedPerDay * daysWorkedPerMonth * ((100 - taxes) / 100) * currValue;
    message = document.getElementsByClassName('message');
    console.log([hourValue, hoursWorkedPerDay, daysWorkedPerMonth, taxes, currValue]);
    message[0].innerHTML = currencies[document.getElementsByClassName('secondSelect')[0].value] + ' ' + calculationResult.toFixed(2);
    message[0].className = 'message';
    document.getElementsByClassName('secondSelect')[0].className = 'secondSelect';
    document.getElementsByClassName('switchCurr')[0].className = 'small switchCurr';
    secondSelectMustBeEqualtoFirstSelect = false;
}


document.getElementsByClassName('firstSelect')[0].onchange = setSecondSelect;
document.getElementsByClassName('btn')[0].addEventListener('click', calc);
document.getElementsByClassName('secondSelect')[0].onchange = calc;
