if (process.env.NODE.ENV === "production") {
    module.exports = require('./keys.prod');

}else if (process.env.NODE.ENV === "test") {
    module.exports = require('./keys.test');
}else {
    module.exports = require('./keys.dev');
}
