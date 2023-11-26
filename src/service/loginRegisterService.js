import db from '../models/index'
require('dotenv').config()
import bcrypt from 'bcryptjs';
import { Op } from 'sequelize'
import { getGroupWithRoles } from './JWTService'
import { createJWT } from '../middleware/JWTAction'

const salt = bcrypt.genSaltSync(10);


const hashPassword = (userPassword) => {
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword
}
const checkEmailExist = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })
    if (user) {
        return true;
    }
    return false
}
const checkPhoneExist = async (userPhone) => {
    let user = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (user) {
        return true;
    }
    return false
}

const registerNewUser = async (rawUserData) => {
    try {
        let isEmailExit = await checkEmailExist(rawUserData.email)

        if (isEmailExit === true) {
            return {
                EM: 'The email is already exist',
                EC: 1
            }
        }
        let isPhonelExit = await checkPhoneExist(rawUserData.phone)
        if (isPhonelExit === true) {
            return {
                EM: 'The phone is already exist',
                EC: 1
            }
        }
        let hasPassword = await hashPassword(rawUserData.password)

        //create 
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hasPassword,
            phone: rawUserData.phone,
            groupId: 4
        })
        return {
            EM: 'A user is create successfully!',
            EC: 0
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'Somthing wrong in service',
            EC: -2
        }
    }
}

const checkPassword = (inputPassword, hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword); // true

}
const handleUserLogin = async (rawData) => {
    try {

        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin }
                ]
            }
        })
        if (user) {
            let isCorrectPassword = checkPassword(rawData.password, user.password)
            if (isCorrectPassword === true) {

                let groupWithRoles = await getGroupWithRoles(user)
                let payload = {
                    email: user.email,
                    groupWithRoles,
                    expiresIn: process.env.JWT_EXPIRESIN
                }
                let token = createJWT(payload)
                return {
                    EM: 'OK',
                    EC: 0,
                    DT: {
                        access_token: token,
                        groupWithRoles
                    }
                }
            }
        }
        console.log("Not found user with email/phone", rawData.valueLogin, "password", rawData.password)

        return {
            EM: 'Your email/phone number or password is incorrect',
            EC: 1,
            DT: ''
        }



    } catch (error) {
        console.log(error)
        return {
            EM: 'Somthing wrong in service',
            EC: -2
        }
    }
}
module.exports = {
    registerNewUser, handleUserLogin, hashPassword, checkEmailExist, checkPhoneExist
}