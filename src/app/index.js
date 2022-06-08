//业务
const koa = require('koa');
const static = require('koa-static');
const KoaBody = require('koa-body')
const multer = require('koa-multer')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const adminRouter = require('../router/admin.route')
const jijiedaohangRouter = require('../router/jijiedaohang.route')
const searchdataRouter = require('../router/searchdata.route')
const path = require('path');
const parameter = require('koa-parameter')
const app = new koa();


const upload = multer();
app.use(upload.any())
app.use(cors())
app.use(KoaBody())
app.use(parameter(app))
app.use(bodyParser())
app.use(adminRouter.routes())
app.use(jijiedaohangRouter.routes())
app.use(searchdataRouter.routes())
app.use(static(path.join(__dirname + '/public')))

app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    if (ctx.method == 'OPTIONS') {
        ctx.body = 200;
    } else {
        await next();
    }
});


module.exports = app