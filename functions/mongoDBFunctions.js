const axios = require('axios').default;
const moment = require('moment');
const { MongoClient, ObjectId } = require('mongodb');
var mysql = require('mysql');


async function handleAllFunctions({ firstName, lastName, dob, email, phoneNumber, address }) {
    console.log("parametros:", firstName, lastName, dob, email, phoneNumber, address)
    const isDobValid = await validateDate({ date: dob });
    const isEmailValid = await validateEmail({ email1: email[0], email2: email[1], email3: email[2] });
    const isPhoneNumberValid = await validatePhoneNumber({ phone: phoneNumber });
    const isFirstNameValid = await validateName({ name: firstName });
    const isLastNameValid = await validateLastName({ name: lastName });
    const isAddressValid = await validateAddress({ address: address });

    if (!isDobValid || !isEmailValid || !isPhoneNumberValid || !isFirstNameValid || !isLastNameValid || !isAddressValid) {
        return "TRY AGAIN"
    }

    const connectionToUsers = await openConnection({ url: "mongodb+srv://paulatmg:Paula1512@paulatmg.atezy.mongodb.net/?retryWrites=true&w=majority", dbName: "paula", collectionName: "users" });
    const resultado = await connectionToUsers.find({ "email": { $in: email } }).toArray();

    console.log("RESULTADOOOOO:", resultado);

    if (resultado.length) {
        return "THIS USER ALREADY EXISTS. TRY AGAIN!"
    }

    const insertResult = await connectionToUsers.insertMany([{ fName: firstName, lName: lastName, phoneNumber: phoneNumber, dob: dob, email: email, address: address }]);

    console.log("insertResult:", insertResult);

    const returnID = insertResult.insertedIds[0];
    return "Your ID:", returnID;

}

async function validateDate({ date }) {
    return moment(date, 'YYYY-MM-DD').isValid();
}


async function validateEmail({ email1, email2, email3 }) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    console.log("EMAAAAIL:", email1, email2, email3);

    if (email1.match && email2.match && email3.match(validRegex)) {
        return true;
    } else {
        return false;
    }
}


async function validatePhoneNumber({ phone }) {
    console.log("PHONE", phone, typeof phone);
    return phone.toString().match(/\d/g).length === 10;
}


async function validateName({ name }) {
    if (/^[A-Za-z\s]+$/.test(name))
        return true;
    else
        return false;

}

async function validateLastName({ name }) {
    if (/^[A-Za-z\s]+$/.test(name))
        return true;
    else
        return false;
}


async function validateAddress({ address }) {
    var regex = /[,#-\/\s\!\@\$.....]/gi;
    if (regex.test(address)) {
        return true;
    }
    return false;
}

async function openConnectionwithMongo({ url, dbName, collectionName }) {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    return db.collection(collectionName);
}


async function executeDBComand({ query, connection }) {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            if (error) {
                return reject(error.message);
            }
            return resolve(results)
        })
    })
}


async function openConnectionwithMySQL({ host, user, password, database }) {
    var connection = mysql.createConnection({
        host: host,
        user: user,
        password: password,
        database: database
    });

    connection.connect();
    return connection;
}

async function handlerFunction({ userID }) {

    console.log("QUAL MONGO ID:", userID);

    const connection = await openConnectionwithMySQL({ host: "ebh2y8tqym512wqs.cbetxkdyhwsb.us-east-1.rds.amazonaws.com", user: "q2w01mu95z1r9p9x", password: "b3cthljmoxgfhpyt", database: "zgwqhx5rlwm7kj0u" });
    const selectUserbyID = `SELECT * FROM users WHERE \`id\`  = ${userID}`;
    const test = await executeDBComandID({ query: selectUserbyID, connection });

    console.log("TEEEEEST:", test);

    if (test.length !== 0) {
        const connectionToPurchase = await openConnectionwithMongo({ url: "mongodb+srv://paulatmg:Paula1512@paulatmg.atezy.mongodb.net/?retryWrites=true&w=majority", dbName: "paula", collectionName: "purchase" });
        return (await connectionToPurchase.find({ mySQLuserID: test[0].id }).toArray());
    }
    else {
        return "This user does not exisists";
    }

}


async function executeDBComandID({ query, connection }) {
    return new Promise((resolve, reject) => {
        connection.query(query, (error, results, fields) => {
            if (error) {
                return reject(error.message);
            }
            return resolve(results)
        })
    })
}



module.exports = {
    handleAllFunctions,
    handlerFunction
}