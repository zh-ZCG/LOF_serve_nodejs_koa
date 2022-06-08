const Router = require('koa-router');
const router = new Router({ prefix: '/api' })//{prefix:'路径'}
const { searchdata, searchdatatest, xiangxidata, addtocart, addtocart2, getcartList, getmyOrder, getmyAddress, xiugaimyaddress, xiugaidindanzhuangtai, deletecartgoods, huoqudindan, deletecartgoods2, updatechecked, updatechecked2, getCode, getAddress, updatecartlist, getcartList1, tianjiadindan } = require('../controller/searchdata.controller')
const { validator, validator1 } = require('../middleware/searchdata.middleware.js')
const { register, Login, usermessage } = require('../controller/user.controller')
const { verifyLogin } = require('../middleware/user.middleware')
const { auth } = require('../middleware/auth.middleware')
const alipaySdk = require('../db/alipay.js')
const AlipayFormData = require('alipay-sdk/lib/form').default

const axios = require('axios')
//头季节导航
router.post('/searchdata', searchdata)

router.post('/searchdatatest', validator, searchdatatest)

router.get('/goodsinfo/:id', xiangxidata)

router.post('/cart/addToCart/:skuId/:skuNum', validator1, addtocart)

router.post('/cart/addToCart/:skuId/:skuNum/:phone', validator1, addtocart2)

router.get('/cart/List', getcartList)

router.get('/cart/List/:phone', getcartList1)

router.delete('/cart/deleteCart/:id', deletecartgoods)

router.delete('/cart/deleteCart/:id/:phone', deletecartgoods2)

router.get('/cart/checkCart/:id/:isChecked', updatechecked)

router.get('/cart/checkCart/:id/:isChecked/:phone', updatechecked2)

router.get('/user/passport/sendCode/:phone', getCode)

router.post('/user/passport/register', register)

router.post('/user/passport/login', verifyLogin, Login)

router.get('/user/passport/auth/getUserInfo', auth, usermessage)

router.get('/user/userAddress/auth/findUserAddressList/:phone', auth, getAddress)

router.post('/order/auth/submitOrder/:phone', auth, tianjiadindan)

router.get('/payment/:orderId', auth, huoqudindan)

router.get('/user/usersgoods/update/:phone', auth, updatecartlist)

router.post('/payment/zhifu', auth, function (ctx, next) {
    let orderId = ctx.request.body.orderId;
    var price = Number(parseFloat(ctx.request.body.price).toFixed(2));
    // Number(parseFloat(ctx.request.body.price).toFixed(2));
    // totalAmount: price.toFixed(2),
    //开始对接
    const formData = new AlipayFormData();
    formData.setMethod('get');
    formData.addField('bizContent', {
        outTradeNo: orderId,
        product_code: 'FAST_INSTANT_TRADE_PAY',
        totalAmount: price.toFixed(2),
        subject: '花'
    });
    formData.addField('returnUrl', 'http://localhost:8080/#/paysuccess');
    const result = alipaySdk.exec(
        'alipay.trade.page.pay',
        {},
        { formData: formData },
    );
    result.then(resp => {
        ctx.body = {
            data: {
                code: 200,
                success: true,
                msg: '支付中',
                paymentUrl: resp
            }
        }
    })

})

router.post('/payment/zhifujieguo', auth,async function (ctx, next) {
    let out_trade_no = ctx.request.body.out_trade_no;
    let trade_no = ctx.request.body.trade_no;
    //开始对接
    const formData = new AlipayFormData();
    formData.setMethod('get');
    formData.addField('bizContent', {
        out_trade_no,
        trade_no
    });
    await alipaySdk.exec(
        'alipay.trade.query',
        {},
        { formData: formData },
    ).then(async resData => {
        await axios({
            methods: 'get',
            url: resData
        }).then(async data => {
            let r = data.data.alipay_trade_query_response;
            if (r.code === '10000') {
                switch (r.trade_status) {
                    case 'WAIT_BUYER_PAY':
                        ctx.body = {
                            code: 0,
                            data: {
                                msg: '支付宝有交易但没付款'
                            }
                        }
                        break;
                    case 'TRADE_CLOSED':
                        ctx.body = {
                            code: 1,
                            data: {
                                msg: '交易关闭'
                            }
                        }
                        break;
                    case 'TRADE_FINISHED':
                        ctx.body = {
                            code: 2,
                            data: {
                                msg: '交易完成不可退款'
                            }
                        }
                        break;
                    case 'TRADE_SUCCESS':
                        await xiugaidindanzhuangtai(out_trade_no);
                        ctx.body = {
                            code: 3,
                            data: {
                                msg: '交易完成'
                            }
                        }
                        break;
                }
            } else if (r.code === '40004') {
                ctx.body = {
                    code: 4,
                    msg: '交易不存在'
                }
            }
        }).catch(err => {
            ctx.body = {
                code: 500,
                msg: '交易失败',
                err
            }
        })
    })

})

router.get('/order/auth/:phone', auth, getmyOrder)

router.get('/order/dizhi/:phone', auth, getmyAddress)

router.post('/order/auth/submitOrder/:phone', auth, xiugaimyaddress)

module.exports = router