const CardCtrl = {};

const crypt = require('./crypt.controller');
const bbdd = require("../database");
const logger = require("../libs/winston");
var moment = require('moment');

const {
    StringDecoder
} = require('string_decoder');
const decoder = new StringDecoder('utf8');

CardCtrl.getCards = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        let query = `SELECT * from Cards`;
        logger.info(`Getting Cards... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`An error has ocurred getting the Cards. ${error}`, {
                    __filename
                });
                return;
            }
            logger.info(`Cards obtained: ${results.length}`, {
                __filename
            });
            logger.info(`Sending Cards...`, {
                __filename
            });
            res.status(200).send(results);
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }

};


CardCtrl.createCard = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        var newCard = req.body;
        newCard.comments = 0;
        newCard.publicationDate = moment().format("DD-MM-YYYY HH:mm:ss");
        console.log(newCard);

        let query = `INSERT INTO Cards(date, time, place, instagram, description, comments, publication_date) VALUES("${newCard.date}", "${newCard.time}", "${newCard.place}", "${newCard.instagram}", "${newCard.description}", "${newCard.comments}", "${newCard.publicationDate}")`;

        logger.info(`Creating card... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`Card does not created. ${error}`, {
                    __filename
                });
                res.status(400).json({
                    status: "KO",
                    message: "Card does not created"
                });
                return;
            }

            logger.info(`Card created`, {
                __filename
            });
            res.status(200).json({
                status: "OK",
                message: "Card created"
            });
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }


};


module.exports = CardCtrl;