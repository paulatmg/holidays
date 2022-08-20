const axios = require('axios').default;
const moment = require('moment');
var mysql = require('mysql');


async function handlerFunction({ fullName, email, countryByUser }) {
    const isEmailValid = await validateEmail({ email: email });
    const isFullNameValid = await validateName({ fullName: fullName });

    if (!isEmailValid || !isFullNameValid) {
        return "TRY AGAIN"
    }

    const resultCountry = await selectedCountry({ countryByUser: countryByUser });

    const finalResult = await processHolidays({ filteredHolidays: resultCountry });

    return "finalResult:", finalResult;
}



async function processHolidays({ filteredHolidays }) {
    const result = filteredHolidays.filter(holiday => {
        return (filteredHolidays.filter(subHoliday => subHoliday.date === holiday.date)).length > 1
    })
    return result;
}


async function selectedCountry({ countryByUser }) {

    var newArray = [];

    for (let i = 0; i < countryByUser.length; i++) {

        var hhuhu = holidays.filter((holiday) => { return holiday.country === countryByUser[i] });
        newArray = newArray.concat(hhuhu);
    }

    return newArray;
}


async function validateEmail({ email }) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (email.match(validRegex)) {
        return true;

    } else {
        return false;

    }
}

async function validateName({ fullName }) {
    if (/^[A-Za-z\s]+$/.test(fullName))
        return true;
    else
        return false;

}

const holidays = [
    { date: "01/01", country: "BR", description: "Universal Fraternization" },
    { date: "04/15", country: "BR", description: "Good Friday" },
    { date: "04/21", country: "BR", description: "Tiradentes' Day" },
    { date: "05/01", country: "BR", description: "Labor Day" },
    { date: "09/07", country: "BR", description: "Independence Day" },
    { date: "10/12", country: "BR", description: "Holy Day Of Brazil's Patron Saint" },
    { date: "11/02", country: "BR", description: "All Soul's Day" },
    { date: "11/15", country: "BR", description: "Proclamation of the Republic" },
    { date: "12/25", country: "BR", description: "Christmas Day" },
    { date: "12/31", country: "BR", description: "New Year's Eve" },
    { date: "01/17", country: "US", description: "Birthday of Martin Luther King" },
    { date: "02/21", country: "US", description: "Presidents' Day" },
    { date: "05/30", country: "US", description: "Memorial Day" },
    { date: "06/20", country: "US", description: "Juneteenth" },
    { date: "07/04", country: "US", description: "Independence Day" },
    { date: "09/05", country: "US", description: "Labor Day" },
    { date: "10/10", country: "US", description: "Columbus' Day" },
    { date: "11/11", country: "US", description: "Veterans' Day" },
    { date: "11/24", country: "US", description: "Thanksgiving Day" },
    { date: "12/26", country: "US", description: "Christmas Day" },
    { date: "12/31", country: "US", description: "New Year's Day" },
    { date: "01/01", country: "UK", description: "New Year's Day" },
    { date: "01/02", country: "UK", description: "New Year's Day" },
    { date: "01/03", country: "UK", description: "New Year's Day" },
    { date: "04/15", country: "UK", description: "Good Friday" },
    { date: "04/18", country: "UK", description: "Easter Monday" },
    { date: "05/02", country: "UK", description: "Early May bank holiday" },
    { date: "06/02", country: "UK", description: "Spring bank holiday" },
    { date: "06/03", country: "UK", description: "Platinum Jubilee bank holiday" },
    { date: "08/29", country: "UK", description: "Summer bank holiday" },
    { date: "12/26", country: "UK", description: "Boxing Day" },
    { date: "12/27", country: "UK", description: "Christmas Day (substitute day)" },
    { date: "01/01", country: "CH", description: "New Year's Day" },
    { date: "04/15", country: "CH", description: "Good Friday" },
    { date: "04/25", country: "CH", description: "Freedom Day" },
    { date: "05/01", country: "CH", description: "Labor Day" },
    { date: "06/10", country: "CH", description: "Portugal Day" },
    { date: "06/16", country: "CH", description: "Corpus Christi" },
    { date: "08/15", country: "CH", description: "Assumption Day" },
    { date: "10/05", country: "CH", description: "Republic Day" },
    { date: "11/01", country: "CH", description: "All Saint's Day" },
    { date: "12/01", country: "CH", description: "Restoration of Independence" },
    { date: "12/08", country: "CH", description: "Immaculate Conception Day" },
    { date: "12/25", country: "CH", description: "Christmas Day" },
    { date: "01/01", country: "CH", description: "New Year's Day" },
    { date: "01/02", country: "CH", description: "New Year's Day" },
    { date: "01/03", country: "CH", description: "New Year's Day" },
    { date: "01/31", country: "CH", description: "Spring Festival Holiday" },
    { date: "02/01", country: "CH", description: "Spring Festival Holiday" },
    { date: "02/02", country: "CH", description: "Spring Festival Holiday" },
    { date: "02/03", country: "CH", description: "Spring Festival Holiday" },
    { date: "02/04", country: "CH", description: "Spring Festival Holiday" },
    { date: "04/03", country: "CH", description: "Ching Ming Festival" },
    { date: "04/04", country: "CH", description: "Ching Ming Festival" },
    { date: "04/05", country: "CH", description: "Ching Ming Festival" },
    { date: "05/01", country: "CH", description: "Labor Day" },
    { date: "05/02", country: "CH", description: "Labor Day" },
    { date: "05/03", country: "CH", description: "Labor Day" },
    { date: "05/04", country: "CH", description: "Labor Day" },
    { date: "06/03", country: "CH", description: "Dragon Boat Festival" },
    { date: "09/10", country: "CH", description: "Mid-Autumn Festival" },
    { date: "09/12", country: "CH", description: "Mid-Autumn Festival" },
    { date: "10/01", country: "CH", description: "Chinese National Day" },
    { date: "10/02", country: "CH", description: "Chinese National Day" },
    { date: "10/03", country: "CH", description: "Chinese National Day" },
    { date: "10/04", country: "CH", description: "Chinese National Day" },
    { date: "10/05", country: "CH", description: "Chinese National Day" },
    { date: "10/06", country: "CH", description: "Chinese National Day" },
    { date: "10/07", country: "CH", description: "Chinese National Day" },
];


module.exports = {
    handlerFunction

}