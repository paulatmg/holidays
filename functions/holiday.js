const axios = require('axios').default;
const moment = require('moment');
var mysql = require('mysql');


async function handlerFunction({ fullName, email, countryByUser }) {
    console.log("parametros:", fullName, email, countryByUser)
    console.log("QUAL PAIIIIIIS", countryByUser)

    const isEmailValid = await validateEmail({ email: email });
    const isFullNameValid = await validateName({ fullName: fullName });

    if (!isEmailValid || !isFullNameValid) {
        return "TRY AGAIN"
    }

    const resultCountry = await selectedCountry({ countryByUser: countryByUser });

    console.log(".dateeee", resultCountry[4].date);

    console.log("result", resultCountry);

    const finalResult = await processHolidays({ filteredHolidays: resultCountry});

    console.log("FINAAAAAAAL", finalResult);

    return "finalResult:", finalResult;


}



async function processHolidays( { filteredHolidays}){
    const result = filteredHolidays.filter(holiday => {
        return (filteredHolidays.filter( subHoliday => subHoliday.date === holiday.date)).length > 1
    })
return result;
}


async function selectedCountry({ countryByUser }) {

    var newArray = [];

    console.log("QUAL PAIIIIIIS", countryByUser)

    for (let i = 0; i < countryByUser.length; i++) {

        var hhuhu = holidays.filter((holiday) => { return holiday.country === countryByUser[i] });
        newArray = newArray.concat(hhuhu);
    }

    console.log("NEWARRAY", newArray);

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
    { date: "12/27", country: "UK", description: "Christmas Day (substitute day)" }
]




// const brazilHolidaysIn2022 = {
//     "01/01": "Universal Fraternization",
//     "04/15": "Good Friday",
//     "04/21": "Tiradentes' Day",
//     "05/01": "Labor Day",
//     "09/07": "Independence Day",
//     "10/12": "Holy Day Of Brazil's Patron Saint",
//     "11/02": "All Soul's Day",
//     "11/15": "Proclamation of the Republic",
//     "12/25": "Christmas Day",
//     "12/31": "New Year's Eve"
// }

// const unitedStatesHolidaysIn2022 = {
//     "01/17": "Birthday of Martin Luther King",
//     "02/21": "Presidents' Day",
//     "05/30": "Memorial Day",
//     "06/20": "Juneteenth",
//     "07/04": "Independence Day",
//     "09/05": "Labor Day",
//     "10/10": "Columbus' Day",
//     "11/11": "Veterans' Day",
//     "11/24": "Thanksgiving Day",
//     "12/26": "Christmas Day",
//     "12/31": "New Year's Day"
// }


// const unitedKingdonHolidaysIn2022 = {
//     "01/01": "New Year's Day",
//     "01/02": "New Year's Day",
//     "01/03": "New Year's Day",
//     "04/15": "Good Friday",
//     "04/18": "Easter Monday",
//     "05/02": "Early May bank holiday",
//     "06/02": "Spring bank holiday",
//     "06/03": "Platinum Jubilee bank holiday",
//     "08/29": "Summer bank holiday",
//     "12/26": "Boxing Day",
//     "12/27": "Christmas Day (substitute day)"
// }

// const chinaHolidaysIn2022 = {
//     "01/01": "New Year's Day",
//     "01/02": "New Year's Day",
//     "01/03": "New Year's Day",
//     "01/31": "Spring Festival Holiday",
//     "02/01": "Spring Festival Holiday",
//     "02/02": "Spring Festival Holiday",
//     "02/03": "Spring Festival Holiday",
//     "02/04": "Spring Festival Holiday",
//     "04/03": "Ching Ming Festival",
//     "04/04": "Ching Ming Festival",
//     "04/05": "Ching Ming Festival",
//     "05/01": "Labor Day",
//     "05/02": "Labor Day",
//     "05/03": "Labor Day",
//     "05/04": "Labor Day",
//     "06/03": "Dragon Boat Festival",
//     "09/10": "Mid-Autumn Festival",
//     "09/12": "Mid-Autumn Festival",
//     "10/01": "Chinese National Day",
//     "10/02": "Chinese National Day",
//     "10/03": "Chinese National Day",
//     "10/04": "Chinese National Day",
//     "10/05": "Chinese National Day",
//     "10/06": "Chinese National Day",
//     "10/07": "Chinese National Day"
// }

// const portugalHolidaysIn2022 = {
//     "01/01": "New Year's Day",
//     "04/15": "Good Friday",
//     "04/25": "Freedom Day",
//     "05/01": "Labor Day",
//     "06/10": "Portugal Day",
//     "06/16": "Corpus Christi",
//     "08/15": "Assumption Day",
//     "10/05": "Republic Day",
//     "11/01": "All Saint's Day",
//     "12/01": "Restoration of Independence",
//     "12/08": "Immaculate Conception Day",
//     "12/25": "Christmas Day"
// }




module.exports = {
    handlerFunction

}