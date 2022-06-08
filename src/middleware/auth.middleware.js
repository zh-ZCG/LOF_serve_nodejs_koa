const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
const auth = async (ctx, next) => {
    const { token } = ctx.request.header
    try {
        const user = jwt.verify(token, JWT_SECRET)
        ctx.state.user = user
    } catch (err) {
        switch (err.name) {
            case 'TokenExpiredError':
                console.error('token过期', err)
                return
            case 'JsonWebTokenError':
                console.error('无效的token', err)
                return
        }
    }

    await next()
}

module.exports = {
    auth,
}