//jwt
var jwt = require('jsonwebtoken')
const AccountModel = require('../models/account')

const middlewareCntroller = {

    //verifyToken
    verifyToken: async (req, res, next) => {
        const token = req.headers.token

        if (!token) {
            return res.status(401).json({ success: false, message: "You're not authenticated" })
        }

        //Bearer
        const accessToken = token.split(" ")[1]
        jwt.verify(accessToken, process.env.ACCESSTOKEN_MK, (err, user) => {
            if (err) {
                return res.status(403).json({ success: false, message: "Token is not valid" })
            }
            req.user = user

            AccountModel.findOne({ _id: req.user.userId }).then(data => {
                if (!data) {
                    return res.status(401).json({ success: false, message: "You're not authenticated" })
                }

                next()
            }).catch(err => {
                return res.status(501).json({ success: false, message: "Server Error" })
            })
        })
    }
}

module.exports = middlewareCntroller