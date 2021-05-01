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

module.exports = AdminCtrl;