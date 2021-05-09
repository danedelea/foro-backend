const AdminCtrl = {};

const crypt = require('./crypt.controller');
const bbdd = require("../database");
const logger = require("../libs/winston");

const keys = require("../keys");

AdminCtrl.createAdmin = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        let admin = req.body;

        admin.name = await crypt.encryptText(admin.name);
        admin.lastname = await crypt.encryptText(admin.lastname);
        admin.email = await crypt.encryptText(admin.email);
        admin.password = await crypt.encryptPassword(admin.password);

        let query = `INSERT INTO admin(name, lastname, email, password, creation_date, last_update) VALUES("${admin.name}", "${admin.lastname}", "${admin.email}", "${admin.password}", "${admin.creation_date}", "${admin.last_update}");`;

        logger.info(`Creating admin... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`Admin does not created. ${error}`, {
                    __filename
                });
                res.status(400).json({
                    status: keys.FAIL_RESULT,
                    message: "Admin does not created"
                });
                return;
            }

            logger.info(`Admin created...`, {
                __filename
            });

            res.status(200).json({
                status: keys.SUCCESSFUL_RESULT,
                message: "Admin created"
            });
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }

};

AdminCtrl.getOlderCard = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        let query = `call get_older_card()`;

        logger.info(`Getting older card... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`Older card does not getted. ${error}`, {
                    __filename
                });
                res.status(400).send(results);
                return;
            }

            logger.info(`Older card getted...`, {
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

AdminCtrl.acceptCard = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        let query = `UPDATE cards SET publicated = 1, publication_date = '${req.body.current_date}' WHERE id = ${req.body.card_id}`;

        logger.info(`Accepted card... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`Card does not accepted. ${error}`, {
                    __filename
                });
                res.status(400).json({
                    status: keys.FAIL_RESULT,
                    message: "Card does not accepted"
                });
                return;
            }

            logger.info(`Card accepted...`, {
                __filename
            });

            res.status(200).json({
                status: keys.SUCCESSFUL_RESULT,
                message: "Card accepted"
            });
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }

};

AdminCtrl.acceptMymyvCard = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        let query = `UPDATE mymyv_cards SET publicated = 1, publication_date = '${req.body.current_date}' WHERE id = ${req.body.card_id}`;

        logger.info(`Accepted mymyv card... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`Mymyv card does not accepted. ${error}`, {
                    __filename
                });
                res.status(400).json({
                    status: keys.FAIL_RESULT,
                    message: "Mymyv card does not accepted"
                });
                return;
            }

            logger.info(`Mymyv card accepted...`, {
                __filename
            });

            res.status(200).json({
                status: keys.SUCCESSFUL_RESULT,
                message: "Mymyv card accepted"
            });
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }

};

AdminCtrl.rejectCard = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        let query = `DELETE FROM cards WHERE id = ${req.params.card_id}`;

        logger.info(`Deleting card... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`Card does not deleted. ${error}`, {
                    __filename
                });
                res.status(400).json({
                    status: keys.FAIL_RESULT,
                    message: "Card does not deleted"
                });
                return;
            }

            logger.info(`Card deleted...`, {
                __filename
            });
            res.status(200).json({
                status: keys.SUCCESSFUL_RESULT,
                message: "Card deleted"
            });
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }

};

AdminCtrl.rejectMymyvCard = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        let query = `DELETE FROM mymyv_cards WHERE id = ${req.params.card_id}`;

        logger.info(`Deleting mymyv card... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`Mymyv card does not deleted. ${error}`, {
                    __filename
                });
                res.status(400).json({
                    status: keys.FAIL_RESULT,
                    message: "Mymyv card does not deleted"
                });
                return;
            }

            logger.info(`Mymyv card deleted...`, {
                __filename
            });
            res.status(200).json({
                status: keys.SUCCESSFUL_RESULT,
                message: "Mymyv card deleted"
            });
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }
};

AdminCtrl.updateCardPlace = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        
        let query = `UPDATE cards SET place = '${req.body.place}' WHERE id = ${req.body.id}`;

        logger.info(`Updating card place... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`Card does not updated. ${error}`, {
                    __filename
                });
                res.status(400).json({
                    status: keys.FAIL_RESULT,
                    message: "Card does not updated"
                });
                return;
            }

            logger.info(`Card updated...`, {
                __filename
            });
            res.status(200).json({
                status: keys.SUCCESSFUL_RESULT,
                message: "Card updated"
            });
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }

};

module.exports = AdminCtrl;