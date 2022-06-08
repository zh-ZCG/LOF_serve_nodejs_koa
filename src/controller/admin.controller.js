const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/config.default')
const { selectadmin } = require('../service/admin.service')
const { selectproduct, selectproducttotal, selectproductInfo, SaveSpuInfo, selectdindanInfo, deletedindantest,deleteproducttest, UpdateSpuInfo, selectdindankeyword, selectdindan,selectdindantotal, selectproductInfokeyword} = require('../service/searchDataTest.service')
class adminController {
    async adminlogin(ctx) {
        const { username, password } = ctx.request.body
        try {
            let res = await selectadmin(username, password)
            if (res == 0) {
                ctx.body = {
                    code: 201,
                    message: '登录失败,无该管理员'
                }
            } else {
                ctx.body = {
                    code: 200,
                    message: '登录成功',
                    data: {
                        token: jwt.sign({ res }, JWT_SECRET, { expiresIn: '10d' })
                    }
                }
            }
        } catch (err) {
            console.error('登录失败', err)
        }
    }

    async admininfo(ctx) {
        const { token } = ctx.query.token
        ctx.body = {
            code: 200,
            data: {
                token,
                name: 'admin',
                avatra: '111111'
            }
        }
    }
    async adminout(ctx) {
        ctx.body = {
            code: 200,
            message: '退出成功'
        }

    }

    async productList(ctx) {
        const { page, limit } = ctx.params
        try {
            const res = await selectproducttotal()
            const result = await selectproduct(page, limit)
            ctx.body = {
                code: 200,
                data: {
                    total: res,
                    records: result
                }
            }
        } catch (err) {
            console.log("获取失败")
        }

    }

    async productInfo(ctx) {
        const { skuId } = ctx.params
        try {
            const result = await selectproductInfo(skuId)
            ctx.body = {
                code: 200,
                data: {
                    result
                }
            }
        } catch (err) {
            console.log("获取失败")
        }

    }
    
    async deleteproduct(ctx) {
        const { skuId } = ctx.params
        try {
            const result = await deleteproducttest(skuId)
            ctx.body = {
                code: 200,
                data: {
                    result
                }
            }
        } catch (err) {
            console.log("获取失败")
        }

    }

    async deletedindan(ctx) {
        const { skuId } = ctx.params
        try {
            const result = await deletedindantest(skuId)
            ctx.body = {
                code: 200,
                data: {
                    result
                }
            }
        } catch (err) {
            console.log("获取失败")
        }

    }

    async saveSpuInfo(ctx) {
        try {
            const { categoryChildName, price, skuName } = ctx.request.body
            const result = await SaveSpuInfo(categoryChildName, price, skuName)
            ctx.body = {
                code: 200,
                data: {
                    // result
                }
            }
        } catch (err) {
            console.log("获取失败")
        }

    }

    async updateSpuInfo(ctx) {
        try {
            const { id, price, skuName, skuDesc, spuId, tmId, categoryID, categoryChildID, categoryName, categoryChildName, skuDefaultImg, isSale } = ctx.request.body[0]
            const result = await UpdateSpuInfo(id, price, skuName, skuDesc, spuId, tmId, categoryID, categoryChildID, categoryName, categoryChildName, skuDefaultImg, isSale)
            ctx.body = {
                code: 200,
                data: {
                    // result
                }
            }
        } catch (err) {
            console.log("获取失败")
        }

    }

    async getskuInfokeyword(ctx) {
        let keyword = ctx.params.keyword;
        try {
            const result = await selectproductInfokeyword(keyword)
            ctx.body = {
                code: 200,
                data: {
                    result
                }
            }
        } catch (err) {
            console.log("获取失败")
        }

    }

    async dindanList(ctx) {
        const { page, limit } = ctx.params
        try {
            const res = await selectdindantotal()
            const result = await selectdindan(page, limit)
            ctx.body = {
                code: 200,
                data: {
                    total: res,
                    records: result
                }
            }
        } catch (err) {
            console.log("获取失败")
        }

    }

    async dindanInfo(ctx) {
        const { skuId } = ctx.params
        try {
            const result = await selectdindanInfo(skuId)
            ctx.body = {
                code: 200,
                data: {
                    result
                }
            }
        } catch (err) {
            console.log("获取失败")
        }

    }

    async getdindankeyword(ctx) {
        let keyword = ctx.params.keyword;
        try {
            const result = await selectdindankeyword(keyword)
            ctx.body = {
                code: 200,
                data: {
                    result
                }
            }
        } catch (err) {
            console.log("获取失败")
        }

    }

}

module.exports = new adminController()