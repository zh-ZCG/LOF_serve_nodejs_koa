const AdminModel = require('../model/admin.model.js')

class AdminService {
    async selectadmin(username,password) {
        const res = await AdminModel.find({
            "username": username,
            "password": password
        })
        if('[]'===JSON.stringify(res))
            return 0
        else return 1
    }
}

module.exports = new AdminService()