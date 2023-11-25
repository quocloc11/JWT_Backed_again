import db from '../models/index'
import { checkEmailExist, checkPhoneExist, hashPassword } from './loginRegisterService'
const getAllUser = async () => {

    try {
        let users = await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "sex"],

            include: { model: db.Group, attributes: ["name", "description"], },
        })
        if (users) {
            return {
                EM: "get data success",
                EC: 0,
                DT: users,
            }
        } else {
            return {
                EM: "Something wrong with service",
                EC: 1,
                DT: [],
            }
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Something wrong with service",
            EC: 1,
            DT: [],
        }
    }
}
const getUserWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        const { count, rows } = await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "username", "email", "phone", "sex", "address"],

            include: { model: db.Group, attributes: ["name", "description", "id"], },
            order: [['id', 'ASC']],

        })
        let totalPages = Math.ceil(count / limit)
        let data = {
            totalRows: count,
            totalPage: totalPages,
            users: rows
        }
        return {
            EM: "OK",
            EC: 0,
            DT: data,
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "Something wrong with service",
            EC: 1,
            DT: [],
        }
    }
}
const createNewUser = async (data) => {

    try {
        let isEmailExit = await checkEmailExist(data.email)

        if (isEmailExit === true) {
            return {
                EM: 'The email is already exist',
                EC: 1,
                DT: "email"
            }
        }
        let isPhonelExit = await checkPhoneExist(data.phone)
        if (isPhonelExit === true) {
            return {
                EM: 'The phone is already exist',
                EC: 1,
                DT: 'phone'
            }
        }
        let hasPassword = await hashPassword(data.password)

        await db.User.create({ ...data, password: hasPassword })
        return {
            EM: "OK",
            EC: 0,
            DT: [],
        }
    } catch (e) {
        console.log(e)
    }
}
const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: "Error with empty GroupId",
                EC: 1,
                DT: 'group',
            }
        }
        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if (user) {
            await user.update({
                username: data.username,
                address: data.address,
                sex: data.sex,
                groupId: data.groupId

            }
            )
            return {
                EM: "Update user succeeds",
                EC: 0,
                DT: '',
            }
        } else {
            return {
                EM: "User not found",
                EC: 2,
                DT: '',
            }
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "something wrongs with service",
            EC: 1,
            DT: [],
        }
    }
}
const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id }
        })
        if (user) {
            await user.destroy()
            return {
                EM: "Delete user succeds",
                EC: 0,
                DT: [],
            }
        } else {
            return {
                EM: "user not exist",
                EC: 2,
                DT: [],
            }
        }
    } catch (e) {
        console.log(e)
        return {
            EM: "error from service",
            EC: 1,
            DT: [],
        }
    }
}

module.exports = {
    getAllUser, createNewUser, updateUser, deleteUser, getUserWithPagination
}