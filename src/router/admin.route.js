const Router = require('koa-router');
const router = new Router({ prefix: '/managerapi' })//{prefix:'路径'}
const { adminlogin, adminout, admininfo, productList, productInfo, dindanList, saveSpuInfo, deleteproduct, deletedindan, getdindankeyword,dindanInfo,updateSpuInfo, getskuInfokeyword} = require('../controller/admin.controller')
const { auth } = require('../middleware/auth.middleware')

router.post('/admin/acl/index/login',adminlogin)

router.get('/admin/acl/index/info', auth, admininfo)

router.post('/admin/acl/index/logout',auth, adminout)

router.get('/admin/product/list/:page/:limit', auth, productList)

router.get('/admin/product/getSkuById/:skuId', auth, productInfo)

router.get('/admin/product/getdeleteproductById/:skuId', auth, deleteproduct)

router.post('/admin/product/saveSpuInfo', auth, saveSpuInfo)

router.post('/admin/product/updateSpuInfo', auth, updateSpuInfo)

router.get('/admin/product/getskuInfo/:keyword', auth, getskuInfokeyword)

router.get('/admin/dindan/list/:page/:limit', auth, dindanList)

router.get('/admin/product/getdindanById/:skuId', auth, dindanInfo)

router.get('/admin/dindan/getskuInfo/:keyword', auth, getdindankeyword)

router.get('/admin/product/getdeletedindanById/:skuId', auth, deletedindan)

module.exports = router