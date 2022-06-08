const jwt = require('jsonwebtoken')

const { createUser, selectUser, createAddress } = require('../service/user.service')
const { selectuserCode } = require('../service/searchDataTest.service')

const { JWT_SECRET } = require('../config/config.default')
class UserController {
    async register(ctx, next) {
        const { phone, password, code } = ctx.request.body
        const codepanduan = await selectuserCode(phone)
        if (codepanduan[0].code == code) {
            const data = await selectUser(phone)
            if ('[]' === JSON.stringify(data)) {
                const res = await createUser(phone, password)
                const res1 = await createAddress(phone)
                ctx.body =
                {
                    code: 200,
                    message: '用户注册成功',
                    result: {
                        phone: res.phone
                    },
                }
            } else {
                ctx.body = {
                    code: 201,
                    message: '用户存在'
                }
            }
        }

    }

    async Login(ctx, next) {
        const { phone } = ctx.request.body
        try {
            const { password, ...res } = await selectUser(phone)
            ctx.body = {
                code: 200,
                message: '登录成功',
                result: {
                    token: jwt.sign(res, JWT_SECRET, { expiresIn: '10d' })
                }
            }
        } catch (err) {
            console.error('登录失败', err)
        }
    }

    async usermessage(ctx, next) {
        try {
            ctx.body = {
                code: 200,
                phone: ctx.state.user[0].phone
            }
        } catch (err) {
            console.error('登录失败', err)
        }
    }
}

module.exports = new UserController()