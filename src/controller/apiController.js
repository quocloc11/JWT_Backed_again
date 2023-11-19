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
    console.log("check", req.body)
    return res.status(200).json({
        message: 'OK',
        data: 'test api'
    })
}
module.exports = {
    testApi, handleRegister, handleLogin
}