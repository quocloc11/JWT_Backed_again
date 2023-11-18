const testApi = (req, res) => {
    return res.status(200).json({
        message: 'OK',
        data: 'test api'
    })
}

module.exports = {
    testApi
}