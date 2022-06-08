const { Selectjijiedaohang } = require('../service/jijiedaohang.service')

class JijiedaohangController {
    async jijiedaohang(ctx, next) {
        //操作数据库
        const res = await Selectjijiedaohang()
        //返回结果
        ctx.body =
        {
            code: 200,
            message: '获取数据成功',
            data: res
        }
    }
}

module.exports = new JijiedaohangController()