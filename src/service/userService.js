import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';


// get the promise implementation, we will use bluebird

// create the connection, specify bluebird as Promise


const salt = bcrypt.genSaltSync(10);


const hashPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword
}

const createNewUser = (email, password, username) => {
    let hashPass = hashPassword(password)


    connection.query(
        'INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashPass, username],
        function (err, results, fields) {
            if (err) {
                console.log(err)
            }

        }
    );
}
const getUserList = async () => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

    let users = []
    //  connection.query(
    //     'Select * from users ',
    //     function (err, results, fields) {
    //         if (err) {
    //             console.log(err)
    //             return users
    //         }
    //         users = results
    //         console.log("run", users)
    //         return users

    //     }
    // );
    try {
        const [rows, fields] = await connection.execute(' Select * from users ');
        return rows

    } catch (e) {
        console.log(e)
    }

}
module.exports = {
    createNewUser, getUserList
}