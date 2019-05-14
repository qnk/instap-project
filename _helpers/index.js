const path = require('path');

const getTokenFromHeader = require(
    path.normalize(__dirname + '/getTokenFromHeader.js')
);

module.exports = {
    getTokenFromHeader
}