const { SearchData } = require('../service/searchdata.service')
const adddindanModel = require('../model/adddindan.model')
const DinDanXiuGaiChengGongModel = require('../model/xiugaidindanzhuangtai.model')
const selectAddressModel = require('../model/useraddress.model')
const { searchDataTest, xiangxiGoods, searchusertemp, GetCartList, GetUsergoodsList2, DeleteuserTempList, DeleteUserGoods, DeleteDindan, GetCartList2, GetTempCartList, Huoqudindan, GetTempCartList1, GetUsergoodsList, DeleteCartGoods, DeleteCartGoods2, XiugaiDindanzhuangtai, UpdateChecked, UpdateChecked2, adduserCode, selectuserCode, GetAddress, Createcartlist, GetCartList1, UpdateCartList, searchusergoods, TianJiadindan } = require('../service/searchDataTest.service')
class SearchDataController {
    async searchdata(ctx, next) {
        const {
            address,
            attrsList,
            goodsList,
            total,
            pageNo,
            pageSize,
            totalPages } = ctx.request.body
        //操作数据库
        var data = await SearchData()
        //返回结果
        ctx.body =
        {
            code: 200,
            message: '获取数据成功',
            data: data[0]
        }
    }

    async searchdatatest(ctx) {
        try {
            var data = await searchDataTest(ctx.request.body)
            ctx.body = {
                code: 200,
                message: '获取数据成功',
                data: {
                    "address": [
                        {
                            "tmId": 1,
                            "tmName": "湖南"
                        },
                        {
                            "tmId": 2,
                            "tmName": "北京"
                        },
                        {
                            "tmId": 3,
                            "tmName": "广州"
                        },
                        {
                            "tmId": 4,
                            "tmName": "上海"
                        },
                        {
                            "tmId": 5,
                            "tmName": "深圳"
                        }
                    ],
                    "price": [
                        {
                            "prId": 1,
                            "prValue": "0-50"
                        },
                        {
                            "prId": 2,
                            "prValue": "51-100"
                        },
                        {
                            "prId": 3,
                            "prValue": "101-150"
                        },
                        {
                            "prId": 4,
                            "prValue": "151-200"
                        }
                    ],
                    "goodsList": data
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    async xiangxidata(ctx) {
        try {
            var data = await xiangxiGoods(ctx.params.id, ctx.request.body)
            ctx.body = {
                code: 200,
                message: '获取数据成功',
                data: data[0]
            }
        } catch (err) {
            console.log(err)
        }
    }

    async addtocart(ctx) {
        try {
            var ctx1 = ctx;
            var res = await GetTempCartList(ctx.request.body.userId, ctx.request.body.id);
            if (res) {
                var res1 = await GetTempCartList1(ctx1.request.body.userId, ctx1.request.body.id, ctx1.request.body.skuNum, res);
                ctx.body = {
                    code: 200,
                    message: '修改成功',
                }
            } else {
                var data = await searchusertemp(ctx.request.body)
                ctx.body = {
                    code: 200,
                    message: '添加成功',
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    async addtocart2(ctx) {
        try {
            var ctx1 = ctx;
            var res = await GetUsergoodsList(ctx.params.phone, ctx.request.body.id);
            if (res) {
                var res1 = await GetUsergoodsList2(ctx1.params.phone, ctx1.request.body.id, ctx1.request.body.skuNum, res);
                ctx.body = {
                    code: 200,
                    message: '修改成功',
                }
            } else {
                var data = await searchusergoods(ctx.request.body)
                await UpdateCartList(ctx.request.body.userId, ctx.params.phone)
                await UpdateCartList(ctx.request.body.userId, ctx.params.phone)
                ctx.body = {
                    code: 200,
                    message: '添加成功',
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    async getcartList(ctx) {
        try {
            var data = await GetCartList(ctx.header.usertempid)
            ctx.body = {
                code: 200,
                message: '获取数据成功',
                data
            }
        } catch (err) {
            console.log(err)
        }
    }

    async deletecartgoods(ctx) {
        try {
            var res = await DeleteCartGoods(ctx.params.id, ctx.header.usertempid)
            ctx.body = {
                code: 200,
                message: '删除成功',
            }
        } catch (err) {
            console.log(err)
        }
    }

    async deletecartgoods2(ctx) {
        try {
            var res = await DeleteCartGoods2(ctx.params.id, ctx.params.phone)
            ctx.body = {
                code: 200,
                message: '删除成功',
            }
        } catch (err) {
            console.log(err)
        }
    }

    async updatechecked(ctx) {
        try {
            var data = await UpdateChecked(ctx.params.id, ctx.params.isChecked, ctx.header.usertempid)
            ctx.body = {
                code: 200,
                message: '修改成功',
            }
        } catch (err) {
            console.log(err)
        }
    }

    async updatechecked2(ctx) {
        try {
            var data = await UpdateChecked2(ctx.params.id, ctx.params.isChecked, ctx.header.usertempid, ctx.params.phone)
            ctx.body = {
                code: 200,
                message: '修改成功',
            }
        } catch (err) {
            console.log(err)
        }
    }

    async getCode(ctx) {
        try {
            var res = await selectuserCode(ctx.params.phone)
            if ('[]' === JSON.stringify(res)) {

                let code = ''
                for (var i = 0; i < 6; i++) {
                    code += parseInt(Math.random() * 10)
                }
                var data = await adduserCode(ctx.params.phone, code)
                ctx.body = {
                    result: 200,
                    message: '获取成功',
                    code
                }
            } else {
                ctx.body = {
                    result: 200,
                    message: '获取成功',
                    code: res[0].code
                }
            }

        } catch (err) {
            console.log(err)
        }
    }

    async getAddress(ctx) {
        try {
            var data = await GetAddress(ctx.state.user[0].phone)
            ctx.body = {
                code: 200,
                message: '获取数据成功',
                data
            }
        } catch (err) {
            console.log(err)
        }
    }


    async updatecartlist(ctx) {
        try {
            var data = await GetCartList1(ctx.header.usertempid)
            var res = await Createcartlist(JSON.stringify(data))
            var res1 = await UpdateCartList(ctx.header.usertempid, ctx.params.phone)
            var res2 = await UpdateCartList(ctx.header.usertempid, ctx.params.phone)
            var res3 = await DeleteuserTempList(ctx.header.usertempid)
            ctx.body = {
                code: 200,
                message: '数据修改成功',
            }
        } catch (err) {
            console.log(err)
        }
    }

    async getcartList1(ctx) {
        try {
            var data = await GetCartList2(ctx.params.phone)
            ctx.body = {
                code: 200,
                message: '获取数据成功',
                data
            }
        } catch (err) {
            console.log(err)
        }
    }

    async tianjiadindan(ctx) {
        try {
            const { userName, phone, addressName, ordermessage, orderDetailList, paymoney } = ctx.request.body
            var data = await TianJiadindan(ctx.params.phone, userName, phone, addressName, ordermessage, orderDetailList, paymoney)
            var res = await DeleteUserGoods(ctx.params.phone)
            ctx.body = {
                code: 200,
                message: '获取数据成功',
                data
            }
        } catch (err) {
            console.log(err)
        }
    }

    async huoqudindan(ctx) {
        try {
            var data = await Huoqudindan(ctx.params.orderId)
            ctx.body = {
                code: 200,
                message: '获取数据成功',
                data
            }
        } catch (err) {
            console.log(err)
        }
    }

    async xiugaidindanzhuangtai(canshu) {
        try {
            var data = await adddindanModel.find({ "order_number": canshu }, {
                '_id': 0,
                'loginphone': 1,
                'userName': 1,
                'phone': 1,
                'addressName': 1,
                'ordermessage': 1,
                'orderDetailList': 1,
                'order_number': 1,
                'paymoney': 1
            })
            var res = await XiugaiDindanzhuangtai(JSON.stringify(data), canshu)
            var res1 = await DeleteDindan(canshu)
            var res2 = await DinDanXiuGaiChengGongModel.find({})
            // var res2 = await SelectUserGoodsCheck()
            // var res3 = await DeleteUserGoods(canshu)
            return res2
        } catch (err) {
            console.log(err)
        }
    }

    async getmyOrder(ctx) {
        try {

            var data = await DinDanXiuGaiChengGongModel.find({ "phone": ctx.params.phone })
            ctx.body = {
                code: 200,
                message: '获取数据成功',
                data
            }
        } catch (err) {
            console.log(err)
        }
    }

    async getmyAddress(ctx) {
        try {

            var data = await selectAddressModel.find({ "phone": ctx.params.phone })
            ctx.body = {
                code: 200,
                message: '获取数据成功',
                data
            }
        } catch (err) {
            console.log(err)
        }
    }

    async xiugaimyaddress(ctx) {
        try {
            var data = await selectAddressModel.updateMany({ "address": ctx.request.body})
            ctx.body = {
                code:200,
                message:"修改成功"
            }
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = new SearchDataController()