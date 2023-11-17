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
    //test relationship

    let newUser = await db.User.findOne({
        where: { id: 2 },
        attributes: ["id", "username", "email"],
        //inclue: db.Group,
        include: { model: db.Group, attributes: ["name", "description"], },
        raw: true,
        nest: true
    })

    // let roles = await db.Group.findOne({
    //     where: { id: 1 },
    //     include: { model: db.Role },
    //     raw: true,
    //     nest: true
    // })

    let r = await db.Role.findAll({
        include: { model: db.Group, where: { id: 1 } },
        raw: true,
        nest: true
    })
    console.log("check new user", newUser)
    console.log("check new r", r)


    let users = []
    users = await db.User.findAll()
    return users

    // try {
    //     const [rows, fields] = await connection.execute(' Select * from user ');
    //     return rows

    // } catch (e) {
    //     console.log(e)
    // }

}
const deleteUser = async (userId) => {

    await db.User.destroy({
        where: { id: userId }
    })
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });


    // try {
    //     const [rows, fields] = await connection.execute('DELETE FROM user WHERE id=?', [id]);
    //     return rows

    // } catch (e) {
    //     console.log(e)
    // }

}
const getUserById = async (id) => {



    let user = {}
    user = await db.User.findOne({
        where: { id: id }
    })
    return user.get({ plain: true })
    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

    // try {
    //     const [rows, fields] = await connection.execute('Select * FROM user WHERE id=?', [id]);
    //     console.log('reow', rows)
    //     return rows

    // } catch (e) {
    //     console.log(e)
    // }
}
const updateUserInfor = async (email, username, id) => {

    await db.User.update(
        { email: email, username: username }, {
        where: {
            id: id
        }
    });

    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'jwt', Promise: bluebird });

    // try {
    //     const [rows, fields] = await connection.execute(' UPDATE user SET email= ? , username= ? WHERE id=?', [email, username, id]);

    //     return rows

    // } catch (e) {
    //     console.log(e)
    // }
}

module.exports = {
    createNewUser, getUserList, deleteUser, getUserById, updateUserInfor
}