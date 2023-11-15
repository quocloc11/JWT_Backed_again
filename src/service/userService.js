import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models/index'

// get the promise implementation, we will use bluebird

// create the connection, specify bluebird as Promise


const salt = bcrypt.genSaltSync(10);


const hashPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashPassword(password)

    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPass
        })
    }
    catch (e) {
        console.log(e)

    }


}
const getUserList = async () => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });


    try {
        const [rows, fields] = await connection.execute(' Select * from user ');
        return rows

    } catch (e) {
        console.log(e)
    }

}
const deleteUser = async (id) => {

    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });


    try {
        const [rows, fields] = await connection.execute('DELETE FROM user WHERE id=?', [id]);
        return rows

    } catch (e) {
        console.log(e)
    }

}
const getUserById = async (id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

    try {
        const [rows, fields] = await connection.execute('Select * FROM user WHERE id=?', [id]);
        console.log('reow', rows)
        return rows

    } catch (e) {
        console.log(e)
    }
}
const updateUserInfor = async (email, username, id) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

    try {
        const [rows, fields] = await connection.execute(' UPDATE user SET email= ? , username= ? WHERE id=?', [email, username, id]);

        return rows

    } catch (e) {
        console.log(e)
    }
}

module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfor
}