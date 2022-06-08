const SearchDatatestModel = require('../model/searchdatatest.model.js')
const SearchUserTempModel = require('../model/usertemp.model')
const SearchXiangXiModel = require('../model/searchgoods.model')
const AdduserCodeModel = require('../model/addusercode.model')
const selectAddressModel = require('../model/useraddress.model')
const UserGoodsModel = require('../model/usergoods.model')
const adddindanModel = require('../model/adddindan.model')
const DinDanXiuGaiChengGongModel = require('../model/xiugaidindanzhuangtai.model')

class SearchDataTestService {
    async searchDataTest(canshu) {
        const res = await SearchDatatestModel.find(
            canshu
            , function (err, docs) {
                if (!err) {
                }
            })
        return res
    }

    async xiangxiGoods(id, canshu) {
        const res = await SearchXiangXiModel.find(
            { "id": parseInt(id) }
            , function (err, docs) {
                if (!err) {
                }
            })
        return res
    }

    async searchusertemp(canshu) {
        const res = await SearchUserTempModel.create(canshu, function (err, docs) {
            if (!err) {
            }
        })
        return res
    }

    async searchusergoods(canshu) {
        const res = await UserGoodsModel.create(canshu, function (err, docs) {
            if (!err) {
            }
        })
        return res
    }

    async GetTempCartList(canshu1, canshu2) {
        const res = await SearchUserTempModel.find({ "userId": canshu1, "id": canshu2 }, function (err, docs) {
            if (!err) {
            }
        })
        if ('[]' === JSON.stringify(res))
            return 0
        else
            return res[0].skuNum
    }

    async GetUsergoodsList(canshu1, canshu2) {
        const res = await UserGoodsModel.find({ "phone": canshu1, "id": canshu2 }, function (err, docs) {
            if (!err) {
            }
        })
        if ('[]' === JSON.stringify(res))
            return 0
        else
            return res[0].skuNum
    }

    async GetTempCartList1(canshu1, canshu2, canshu3, canshu4) {
        const res = await SearchUserTempModel.updateOne({ "userId": canshu1, "id": canshu2 }, { "skuNum": canshu3 + canshu4 }, function (err, docs) {
            if (!err) {
            }
        })
        return res
    }

    async GetUsergoodsList2(canshu1, canshu2, canshu3, canshu4) {
        const res = await UserGoodsModel.updateOne({ "phone": canshu1, "id": canshu2 }, { "skuNum": canshu3 + canshu4 }, function (err, docs) {
            if (!err) {
            }
        })
        return res
    }

    async GetCartList(canshu) {
        const res = await SearchUserTempModel.find({ "userId": canshu }, function (err, docs) {
            if (!err) {
            }
        })
        return res
    }

    async DeleteCartGoods(canshu1, canshu2) {
        const res = await SearchUserTempModel.deleteOne({ "userId": canshu2, "id": canshu1 }, function (err, docs) {
            if (!err) {
            }
        })
        return res
    }

    async DeleteCartGoods2(canshu1, canshu2) {
        const res = await UserGoodsModel.deleteOne({ "phone": canshu2, "id": canshu1 }, function (err, docs) {
            if (!err) {
            }
        })
        return res
    }

    async UpdateChecked(canshu1, canshu2, canshu3) {
        const res = await SearchUserTempModel.updateOne({ "id": canshu1, "userId": canshu3 }, { "isChecked": canshu2 }, function (err, docs) {
            if (!err) {
            }
        })
        return res
    }

    async UpdateChecked2(canshu1, canshu2, canshu3, canshu4) {
        const res = await UserGoodsModel.updateOne({ "id": canshu1, "userId": canshu3, "phone": canshu4 }, { "isChecked": canshu2 }, function (err, docs) {
            if (!err) {
            }
        })
        return res
    }

    async adduserCode(canshu1, canshu2) {
        const res = await AdduserCodeModel.create({ "phone": canshu1, "code": canshu2 }, function (err, docs) {
            if (!err) {
            }
        })
        return res
    }

    async selectuserCode(canshu) {
        const res = await AdduserCodeModel.find({ "phone": canshu }, function (err, docs) {
            if (!err) {
            }
        })
        return res
    }


    async GetAddress(canshu) {
        const res = await selectAddressModel.find({ "phone": canshu }, function (err, docs) {
            if (!err) {
            }
        })
        return res
    }

    async GetCartList1(canshu) {
        const res = await SearchUserTempModel.find({ "userId": canshu }, {
            '_id': 0,
            'id': 1,
            'price': 1,
            'userId': 1,
            'skuNum': 1,
            'skuDefaultImg': 1,
            'skuName': 1,
            'isChecked': 1,
            'skuDesc': 1
        }, function (err, docs) {
            if (!err) {
            }
        })
        return res
    }

    async Createcartlist(canshu) {
        const res = await UserGoodsModel.create(JSON.parse(canshu), function (err, docs) {
            if (err) {
                console.log(err)
            }
        })
        return res
    }


    async UpdateCartList(canshu1, canshu2) {
        const res = await UserGoodsModel.updateMany({ "userId": canshu1 }, { "phone": canshu2 }, function (err, docs) {
            if (!err) {
            }
        })
        return res
    }

    async GetCartList2(canshu) {
        const res = await UserGoodsModel.find({ "phone": canshu }, function (err, docs) {
            if (!err) {
            }
        })
        return res
    }


    async TianJiadindan(canshu1, canshu2, canshu3, canshu4, canshu5, canshu6, canshu7) {
        const order_number = Date.now()
        const res = await adddindanModel.create({
            "loginphone": canshu1,
            "userName": canshu2,
            "phone": canshu1,
            "addressName": canshu4,
            "ordermessage": canshu5,
            "orderDetailList": canshu6,
            "order_number": order_number,
            "paymoney": canshu7
        }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        })
        return order_number
    }

    async DeleteUserGoods(canshu) {
        const res = await UserGoodsModel.deleteMany({
            "phone": canshu,
            "isChecked": 1
        }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        })
        // const res1 = await SearchUserTempModel.remove({
        //     "phone": canshu,
        //     "isChecked": 1
        // }, function (err, docs) {
        //     if (err) {
        //         console.log(err)
        //     }
        // })
        return res
    }

    async DeleteuserTempList(canshu) {
        const res1 = await SearchUserTempModel.deleteMany({
            "userId": canshu
        }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        })
        return res1
    }

    async Huoqudindan(canshu) {
        const res = await adddindanModel.find({
            "order_number": canshu
        }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        })
        return res
    }

    async XiugaiDindanzhuangtai(canshu) {
        const num = await DinDanXiuGaiChengGongModel.countDocuments({})
        const res = await DinDanXiuGaiChengGongModel.create(JSON.parse(canshu), function (err, docs) {
            if (err) {
                console.log(err)
            }
        })
        const res1 = await DinDanXiuGaiChengGongModel.updateOne({ "order_number": canshu},{"id":num+1})
        return res
    }

    async DeleteDindan(canshu) {
        const res = await adddindanModel.deleteOne({ "order_number": canshu }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        })
        return res
    }

    async selectproduct(page, limit) {
        const res = await SearchXiangXiModel.find({ "id": { $gt: (page - 1) * limit, $lt: (page) * limit + 1 } }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        })
        return res
    }

    async selectproductInfo(skuId) {
        const res = await SearchXiangXiModel.find({ "id": Number(skuId) }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        })
        return res
    }

    async selectproducttotal() {
        const res = await SearchXiangXiModel.countDocuments({}, function (err, docs) {
            if (err) {
                console.log(err)
            }
            return docs
        })
        return res
    }

    async SaveSpuInfo(canshu1, canshu2, canshu3) {
        const total = await SearchXiangXiModel.countDocuments({})
        const res = await SearchXiangXiModel.create(
            {
                "id": total + 1,
                "price": canshu2,
                "skuInfo": {
                    "categoryChildName": canshu1,
                    "skuDesc": canshu1,
                    "price": canshu2,
                    "skuName": canshu3,
                    "skuDefaultImg": "http://localhost:3000/images/25.jpg"
                }

            }
            , function (err, docs) {
                if (!err) {
                }
            })
        return res
    }

    async UpdateSpuInfo(canshu1, canshu2, canshu3, canshu4, canshu5, canshu6, canshu7, canshu8, canshu9, canshu10, canshu11, canshu12) {
        const res = await SearchXiangXiModel.updateOne({ "id": canshu1 },
            {
                "id": canshu1,
                "price": canshu2,
                "skuInfo": {
                    "categoryChildName": canshu10,
                    "skuDesc": canshu4,
                    "price": canshu2,
                    "skuName": canshu3,
                    "skuDefaultImg": canshu11,
                    "id": canshu1,
                    "spuId": canshu5,
                    "tmId": canshu6,
                    "categoryID": canshu7,
                    "categoryChildID": canshu8,
                    "categoryName": canshu9,
                    "isSale": canshu12
                }

            }
            , function (err, docs) {
                if (!err) {
                }
            })
        return res
    }

    async selectproductInfokeyword(keyword) {
        const type = typeof keyword;
        if (type == Number) {
            const res = await SearchXiangXiModel.find({
                $or: [{ "id": keyword }]
            }, function (err, docs) {
                if (err) {
                    console.log(err)
                }
            })
            return res
        } else {
            const res = await SearchXiangXiModel.find({
                $or: [{ "price": keyword }
                    , { "skuInfo.price": keyword }
                    , { "skuInfo.skuName": keyword }
                    , { "skuInfo.skuDesc": keyword }
                    , { "skuInfo.categoryName": keyword }]
            }, function (err, docs) {
                if (err) {
                    console.log(err)
                }
            })
            return res
        }

    }

    async selectdindantotal() {
        const res = await DinDanXiuGaiChengGongModel.countDocuments({}, function (err, docs) {
            if (err) {
                console.log(err)
            }
            return docs
        })
        return res
    }

    async selectdindan(page, limit) {
        const res = await DinDanXiuGaiChengGongModel.find({ "id": { $gt: (page - 1) * limit, $lt: (page) * limit + 1 } }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        })
        return res
    }

    async selectdindanInfo(skuId) {
        const res = await DinDanXiuGaiChengGongModel.find({ "id": Number(skuId) }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        })
        return res
    }

    async selectdindankeyword(keyword) {
        const type = typeof keyword;
        if (type == Number) {
            const res = await DinDanXiuGaiChengGongModel.find({
                $or: [{ "id": keyword }]
            }, function (err, docs) {
                if (err) {
                    console.log(err)
                }
            })
            return res
        } else {
            const res = await DinDanXiuGaiChengGongModel.find({
                $or: [{ "userName": keyword }
                    , { "phone": keyword }
                    , { "addressName": keyword }
                    , { "ordermessage": keyword }
                    , { "orderDetailList": keyword }
                    , { "order_number": keyword }
                    , { "paymoney": keyword }]
            }, function (err, docs) {
                if (err) {
                    console.log(err)
                }
            })
            return res
        }
    }

    async deleteproducttest(skuId) {
        const res = await SearchXiangXiModel.deleteOne({ "id": Number(skuId) }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        })
        return res
    }

    async deletedindantest(skuId) {
        const res = await DinDanXiuGaiChengGongModel.deleteOne({ "order_number": skuId }, function (err, docs) {
            if (err) {
                console.log(err)
            }
        })
        return res
    }


}
module.exports = new SearchDataTestService()