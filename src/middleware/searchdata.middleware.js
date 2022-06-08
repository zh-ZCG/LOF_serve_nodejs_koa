const validator = async (ctx, next) => {
    try {
        ctx.verifyParams({
            categroyName: { type: 'string', required: false, allowEmpty: true },
            categroyID: { type: 'string', required: false, allowEmpty: true },
            categroyChildName: { type: 'string', required: false, allowEmpty: true },
            categroyChildID: { type: 'string', required: false, allowEmpty: true },
            keyword: { type: 'string', required: false, allowEmpty: true },
            price: { type: 'string', required: false, allowEmpty: true },
            address: { type: 'string', required: false, allowEmpty: true },
        })
    } catch (err) {
        console.log(err)
    }
    await next(

    )
}

const validator1 = async (ctx, next) => {
    try {
        ctx.verifyParams({
            skuId: { type: 'string', required: false, allowEmpty: true },
            skuNum: { type: 'string', required: false, allowEmpty: true }
        })
    } catch (err) {
        console.log(err)
    }
    await next(

    )
}
module.exports = {
    validator,
    validator1
}