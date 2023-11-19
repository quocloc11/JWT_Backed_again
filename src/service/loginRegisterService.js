import db from '../models/index'
import bcrypt from 'bcryptjs';


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


module.exports = {
    registerNewUser
}