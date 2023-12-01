import e from 'express'
import loginRegisterService from '../service/loginRegisterService'
const testApi = (req, res) => {
    return res.status(200).json({
        message: 'OK',
        data: 'test api'
    })
}
const handleRegister = async (req, res) => {
    try {
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing required parmeters',
                EC: '1',
                DT: '',
            })
        }
        if (req.body.password && req.body.password.length < 4) {
            return res.status(200).json({
                EM: 'Your password must haave more han 3 letters',
                EC: '1',
                DT: '',
            })
        }
        let data = await loginRegisterService.registerNewUser(req.body)

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: '',
        })

    } catch (e) {
        return res.status(500).json({
            EM: 'error',
            EC: '-1',
            DT: '',
        })
    }
}
const handleLogin = async (req, res) => {
    try {
        let data = await loginRegisterService.handleUserLogin(req.body)

        if (data && data.DT && data.DT.access_token) {

            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 })
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error',
            EC: '-1',
            DT: '',
        })
    }

}
const handleLogout = async (req, res) => {
    try {
        res.clearCookie("jwt")
        return res.status(200).json({
            EM: 'clear cookies ',
            EC: 0,
            DT: '',
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error',
            EC: '-1',
            DT: '',
        })
    }
}
module.exports = {
    testApi, handleRegister, handleLogin, handleLogout
}