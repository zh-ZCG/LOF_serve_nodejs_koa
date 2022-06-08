const Router = require('koa-router');
const router = new Router({ prefix: '/api' })//{prefix:'路径'}
const { jijiedaohang } = require('../controller/jijiedaohang.controller')

//头季节导航
router.get('/jijiedaohang', jijiedaohang)

module.exports = router