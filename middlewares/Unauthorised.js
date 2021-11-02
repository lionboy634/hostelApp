const {StatusCodes}    = require("http-status-codes")
const CustomErrorApi = require('./custom-error')
class UnAuthorised extends CustomErrorApi{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}


module.exports = UnAuthorised