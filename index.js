let fetchResult
let dollarValue;
let hourValue;
let hoursWorkedPerDay;
let daysWorkedPerMonth;
let taxes;
let calculationResult;
let message;

let getDollarValue = async () => {
    console.log('Fetching dollar value')
    fetchResult = await fetch('https://api.exchangeratesapi.io/latest?base=USD');
    dollarValue = await fetchResult.json();
    console.log(dollarValue.rates.BRL);
}

let calc = async () => {
    console.log('Calculating...')
    await getDollarValue();
    hourValue = document.getElementsByClassName('hourValue')[0].value;
    hoursWorkedPerDay = document.getElementsByClassName('numberHoursPerDay')[0].value;
    daysWorkedPerMonth = document.getElementsByClassName('numberDaysPerMonth')[0].value;
    taxes = document.getElementsByClassName('taxes')[0].value;
    calculationResult = hourValue * hoursWorkedPerDay * daysWorkedPerMonth * ((100 - taxes)/100) * dollarValue.rates.BRL;
    message = document.getElementsByClassName('message');
    console.log([hourValue, hoursWorkedPerDay, daysWorkedPerMonth, taxes, dollarValue]);
    message[0].innerHTML = 'R$ ' +calculationResult.toFixed(2);
}

let button = document.getElementsByClassName('btn')[0].addEventListener('click', calc);
