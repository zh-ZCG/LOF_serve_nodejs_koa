const { selectUser } = require('../service/user.service')


const verifyLogin = async (ctx, next) => {

    const { phone, password } = ctx.request.body

    const res = await selectUser(phone)

    try {
        if ('[]'===JSON.stringify(res)) {
            console.log('用户名不存在')
            ctx.body = {
                message: '用户名不存在'
            }
            return
        }

        if (!(password === res[0].password)) {
            console.log('密码错误')
            ctx.body = {
                message: '密码错误'
            }
            return
        }
    } catch (err) {
        console.error(err)
    }
    await next()
}




module.exports = {
    verifyLogin,
}