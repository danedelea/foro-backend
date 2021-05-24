const AdminCtrl = {};

const crypt = require('./crypt.controller');
const bbdd = require("../database");
const logger = require("../libs/winston");

const keys = require("../config/keys");
const authCtrl = require('./auth.controller');
const mailer = require('../config/mailer');
const generator = require('generate-password');

AdminCtrl.createAdmin = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        let admin = req.body;

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

AdminCtrl.getOlderCard = (req, res) => {
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

AdminCtrl.acceptCard = (req, res) => {
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

AdminCtrl.acceptMymyvCard = (req, res) => {
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

AdminCtrl.rejectCard = (req, res) => {
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

AdminCtrl.rejectMymyvCard = (req, res) => {
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

AdminCtrl.updateCardPlace = (req, res) => {
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

AdminCtrl.getAdminData = (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        let adminId = authCtrl.decriptToken(req.headers[keys.TOKEN_HEADER]).id;
        let query = `SELECT name, lastname, email, DATE_FORMAT(creation_date, "%d-%m-%Y %H:%i:%s") as creation_date, DATE_FORMAT(last_update, "%d-%m-%Y %H:%i:%s") as last_update from admin where id like '${adminId}'`;

        logger.info(`Getting admin data...`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`Admin data does not getted. ${error}`, {
                    __filename
                });
                res.status(400).json({
                    status: keys.FAIL_RESULT,
                    message: "Admin data does not getted"
                });
                return;
            }

            logger.info(`Admin data getted...`, {
                __filename
            });

            res.status(200).send(results[0]);
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }

};

AdminCtrl.checkEmail = (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        let query = `SELECT count(*) as cantidad FROM admin where email like '${req.params.email}'`;

        logger.info(`Checking email... Executing query: ${query}`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`Email does not checked. ${error}`, {
                    __filename
                });
                res.status(400).json({
                    status: keys.FAIL_RESULT,
                    message: "Email does not checked"
                });
                return;
            }

            if (results[0].cantidad === 0) {
                res.status(200).json({
                    status: keys.FAIL_RESULT,
                    message: "Email does not exist"
                });
            } else {
                res.status(200).json({
                    status: keys.SUCCESSFUL_RESULT,
                    message: "Email exists"
                });
            }
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }

};

AdminCtrl.updateAdminData = (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        let adminId = authCtrl.decriptToken(req.headers[keys.TOKEN_HEADER]).id;
        let newAdminInfo = req.body;
        let query = `UPDATE admin SET name = '${newAdminInfo.name}', lastname = '${newAdminInfo.lastname}', email = '${newAdminInfo.email}' WHERE id like '${adminId}'`;

        logger.info(`Updating admin data... Executing query: ${query}`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`Admin data does not updated. ${error}`, {
                    __filename
                });
                res.status(400).json({
                    status: keys.FAIL_RESULT,
                    message: "Admin data does not updated"
                });
                return;
            }

            logger.info(`Admin data updated...`, {
                __filename
            });

            res.status(200).json({
                status: keys.SUCCESSFUL_RESULT,
                message: "Admin data updated"
            });
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }

};

AdminCtrl.checkPassword = (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        let adminId = authCtrl.decriptToken(req.headers[keys.TOKEN_HEADER]).id;
        let query = `SELECT password from admin WHERE id like '${adminId}'`;

        logger.info(`Getting admin password... Executing query: ${query}`, {
            __filename
        });

        bbdd.query(query, async function (error, results, fields) {
            if (error) {
                logger.error(`Admin password does not checked. ${error}`, {
                    __filename
                });
                res.status(400).json({
                    status: keys.FAIL_RESULT,
                    message: "Admin password does not checked"
                });
                return;
            }

            logger.info(`Admin password getted...`, {
                __filename
            });


            if (await crypt.comparePassword(req.body.password, results[0].password)) {
                res.status(200).json({
                    status: keys.SUCCESSFUL_RESULT,
                    message: "Admin password matchs"
                });
            } else {
                res.status(200).json({
                    status: keys.FAIL_RESULT,
                    message: "Admin password does not match"
                });
            }
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }

};

AdminCtrl.updatePassword = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        let adminId = authCtrl.decriptToken(req.headers[keys.TOKEN_HEADER]).id;
        let newAdminPassword = await crypt.encryptPassword(req.body.password);
        let query = `UPDATE admin SET password = '${newAdminPassword}' WHERE id like '${adminId}'`;

        logger.info(`Updating admin password... Executing query: ${query}`, {
            __filename
        });

        bbdd.query(query, async function (error, results, fields) {
            if (error) {
                logger.error(`Admin password does not updated. ${error}`, {
                    __filename
                });
                res.status(400).json({
                    status: keys.FAIL_RESULT,
                    message: "Admin password does not updated"
                });
                return;
            }

            logger.info(`Admin password updated...`, {
                __filename
            });

            res.status(200).json({
                status: keys.SUCCESSFUL_RESULT,
                message: "Admin password updated"
            });

        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }

};

AdminCtrl.deleteAdmin = (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        let adminId = authCtrl.decriptToken(req.headers[keys.TOKEN_HEADER]).id;
        let query = `DELETE FROM admin WHERE id = ${adminId}`;

        logger.info(`Deleting admin... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`Admin does not deleted. ${error}`, {
                    __filename
                });
                res.status(400).json({
                    status: keys.FAIL_RESULT,
                    message: "Admin does not deleted"
                });
                return;
            }

            logger.info(`Admin deleted...`, {
                __filename
            });
            res.status(200).json({
                status: keys.SUCCESSFUL_RESULT,
                message: "Admin deleted"
            });
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }

};

AdminCtrl.deleteAdminByEmail = (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        let query = `DELETE FROM admin WHERE email = '${req.params.email}'`;

        logger.info(`Deleting admin by email... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`Admin does not deleted by email. ${error}`, {
                    __filename
                });
                res.status(400).json({
                    status: keys.FAIL_RESULT,
                    message: "Admin does not deleted by email"
                });
                return;
            }

            logger.info(`Admin deleted by email...`, {
                __filename
            });
            res.status(200).json({
                status: keys.SUCCESSFUL_RESULT,
                message: "Admin deleted by email"
            });
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }

};

AdminCtrl.recoveryPassword = (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {

        let newPassword = generator.generate({
            length: 20,
            numbers: true
        });

        
        console.log(keys.PASSWORD);
        keys.PASSWORD = newPassword;
        var mailOptions = {
            from: 'tinder.unizar.help@gmail.com',
            to: 'juangracia9211@gmail.com',
            subject: 'No reply - Password recovery',
            html: keys.MESSAGE
        };

        mailer.transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(200).json({
                    status: keys.SUCCESSFUL_RESULT,
                    message: "Email does not sent"
                });
            } else {
                res.status(200).json({
                    status: keys.SUCCESSFUL_RESULT,
                    message: 'Email sent: ' + info.response
                });
            }
        });

    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }

};

module.exports = AdminCtrl;