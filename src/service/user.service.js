const UserModel = require('../model/use.model.js')
const selectAddressModel = require('../model/useraddress.model')

class UserService {
    async createUser(phone, password) {
        const res = await UserModel.create({
            "phone": phone,
            "password": password
        })
        return res
    }

    async selectUser(phone) {
        const res = await UserModel.find({
            "phone": phone
        })
        return res
    }

    async createAddress(phone) {
        const res = await selectAddressModel.create({
            "phone": phone,
            "address": [{
                'addressName': '',
                'userName': '',
                'phone': '',
                'isCheck': 0
            }, {
                'addressName': '',
                'userName': '',
                'phone': '',
                'isCheck': 0
            }, {
                'addressName': '',
                'userName': '',
                'phone': '',
                'isCheck': 0
            }]
        })
        return res
    }
}

module.exports = new UserService()