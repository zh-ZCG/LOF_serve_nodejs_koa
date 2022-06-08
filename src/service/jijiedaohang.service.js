const JijiedaohangModel = require('../model/jijiedaohang.model.js')

class JijiedaohangService {
    async Selectjijiedaohang() {
        const res = await JijiedaohangModel.find({}, function (err, docs) {
            if (!err) {

            }
        })
        // }, function (err) {
        //     if (!err) {
        //         console.log("插入成功")
        //     }
        // })
        // console.log(res)
        return res
    }
}

module.exports = new JijiedaohangService()