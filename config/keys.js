/* if (process.env.NODE.ENV === "production") {
    module.exports = require('./keys.prod');
}else {
    module.exports = require('./keys.dev');
} */

module.exports = {
    mongoURI: "mongodb+srv://Defiance99:nSdJVQqBzFTS2WNs@cluster0.yi1n4.mongodb.net/users?retryWrites=true&w=majority",
    jwt: "secretKey-HATER"
}