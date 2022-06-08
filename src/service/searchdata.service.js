const SearchDataModel = require('../model/searchdata.model.js')
class SearchDataService {
    async SearchData() {
        const res = await SearchDataModel.find({}, function (err, docs) {
            if (!err) {

            }
        })
        return res
    }
}

module.exports = new SearchDataService()