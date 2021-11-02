const CustomErrorApi = require("./custom-error")
const UnAuthorised   = require('./Unauthorised')
const NOT_FOUND      = require("./not-found-Error")
const BadRequest     = require("./badRequestError")


module.exports = {
    CustomErrorApi,
    UnAuthorised,
    NOT_FOUND,
    BadRequest
}