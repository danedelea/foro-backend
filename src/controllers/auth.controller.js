const authCtrl = {};

const jwt = require("jsonwebtoken");
const bbdd = require("../database");
const keys = require("../keys");
const logger = require("../libs/winston");

const {
    StringDecoder
} = require('string_decoder');
const decoder = new StringDecoder('utf8');

// METHOD USED TO SEND TO THE FRONTEND A TOKEN
authCtrl.getToken = async (req, res) => {
    logger.info(`Connecting to database...`, {__filename});
    try {
        let uncodeNick = decoder.write(req.params.nick);
        let query = `SELECT id FROM users WHERE nick = binary '${uncodeNick}'`;
        logger.info(`Getting id user... Executing query: "${query}"`, {__filename});
        // CONNECT
        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`An error has ocurred getting the token. ${error}`, {__filename});
                return;
            }
            if(results.length === 0){
                logger.warn(`There isn't a user with the nick '${uncodeNick}'`, {__filename});
                res.status(200).json({
                    status: "NOK",
                    message: `There isn't a user with the nick '${uncodeNick}'`
                });   
                return; 
            }
            logger.info(`Getting a token..`, {__filename});
            // GET A NEW TOKEN
            const token = jwt.sign({
                id: results[0].id
            }, keys.SECRET_KEY_TOKEN, {
                expiresIn: 86400
            }); // 24H
            logger.info(`Token obtained: "${token}"`, {__filename});
            // SEND THE TOKEN
            res.status(200).json({
                status: "OK",
                message: token
            });
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {__filename});
    }

};

// METHOD USED TO SEND TO THE FRONTEND IF THE TOKEN IS VALID
authCtrl.verifyTokenExternal = (req, res) => {
    logger.info(`(External) Checking if the token is valid...`, {__filename});
    // CHECK IF THE TOKEN IS VALID
    try {
        const token = req.headers[keys.TOKEN_HEADER].split(' ')[1];
        logger.info(`(External) Token obtained: "${token}"`, {__filename});
        const check = jwt.verify(token, keys.SECRET_KEY_TOKEN);
        if (check) {
            logger.info(`(External) Token valid`, {__filename});
            res.status(200).json({
                status: "OK",
                message: "Valid token"
            });
        }
    } catch (error) {
        logger.warn(`(External) Token not valid`, {__filename});
        res.status(200).json({
            status: "NOK",
            message: "Invalid token"
        });
    }
};

// METHOD USED BY THE BACKEND TO KNOW IF THE TOKEN IS VALID
authCtrl.verifyTokenInternal = (req, res, next) => {
    logger.info(`(Internal) Checking if the token is valid...`, {__filename});
    // CHECK IF TOKEN IS VALID
    try {
        const token = req.headers[keys.TOKEN_HEADER].split(' ')[1];
        logger.info(`(Internal) token obtained: "${token}"`, {__filename});
        if (!req.headers[keys.TOKEN_HEADER] || !token || !jwt.verify(token, keys.SECRET_KEY_TOKEN)) {
            logger.warn(`Token not valid`, {__filename});
            return res.status(401).send({
                status: "NOK",
                message: "Unauthorized"
            });
        } else {
            const payload = jwt.verify(token, keys.SECRET_KEY_TOKEN);
            req.userID = payload;
            logger.info(`(Internal) Token valid`, {__filename});
            next();
        }
    } catch (error) {
        logger.warn(`(Internal) Token not valid`, {__filename});
        return res.status(401).send({
            status: "NOK",
            message: "Unauthorized"
        });
    }
};

// METHOD USED BY THE BACKEND TO DECRIPT THE TOKEN
authCtrl.decriptToken = (token) => {
    logger.info(`Decripting token: ${token}`, {__filename});
    // SEND THE DECODE TOKEN
    return jwt.decode(token);
};

module.exports = authCtrl;