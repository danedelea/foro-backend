const userCtrl = {};

const crypt = require('./crypt.controller');
const bbdd = require("../database");
const logger = require("../libs/winston");
var moment = require('moment');

const {
    StringDecoder
} = require('string_decoder');
const decoder = new StringDecoder('utf8');

userCtrl.getUsers = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        let query = `SELECT * from users`;
        logger.info(`Getting users... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`An error has ocurred getting the users. ${error}`, {
                    __filename
                });
                return;
            }
            logger.info(`Users obtained: ${results.length}`, {
                __filename
            });
            logger.info(`Sending Users...`, {
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

userCtrl.getUserCityAndNick = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        let query = `SELECT city, nick from users where id = ${req.userID.id}`;
        logger.info(`Getting user city and nick... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, async function (error, results, fields) {
            if (error) {
                logger.error(`An error has ocurred getting the user city and nick. ${error}`, {
                    __filename
                });
                return;
            }
            logger.info(`Sending user city and nick...`, {
                __filename
            });
            res.status(200).json({
                city_name: results[0].city,
                nick: results[0].nick
            });
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }

};

userCtrl.getUsersOfCity = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        let uncodeCity = decoder.write(req.params.city);
        let query = 
        `SELECT us.id, us.nick, us.name, us.last_name, us.city, us.profile_photo, us.interests, TIMESTAMPDIFF(year, us.birth_date, now()) age, IF ((SELECT f2.id_fav FROM favourites f2 WHERE f2.id_user = ${req.userID.id} AND f2.id_fav = us.id), "TRUE", "FALSE") favourite, IF ((SELECT r2.id_recipient_user FROM requests r2 WHERE r2.id_sender_user = ${req.userID.id} AND r2.id_recipient_user = us.id), "TRUE", "FALSE") message FROM users us WHERE us.id NOT IN (SELECT DISTINCT iu.interacted_user_id FROM interacted_users iu WHERE iu.main_user_id = ${req.userID.id}) AND us.city = "${uncodeCity}" AND us.id != ${req.userID.id} ORDER BY rand() LIMIT 10`;

        logger.info(`Getting users of city... Executing query: "${query}"`, {
            __filename
        });
        bbdd.query(query, async function (error, results, fields) {
            if (error) {
                logger.error(`An error has ocurred getting the users of city. ${error}`, {
                    __filename
                });
                return;
            }

            for (const user of results) {
                user.name = await crypt.decryptText(user.name);
                user.last_name = await crypt.decryptText(user.last_name);
            }
            
            logger.info(`Sending users of city...`, {
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

userCtrl.updateUserPhoto = async (req, res) => {
    //console.log(req.file);
    /*
    bbdd.getConnection(function (err, connection) {
        if (err) throw err;

        console.log("Connection successful");
        connection.query(`UPDATE users SET profile_photo = "${(req.file.path).replace('\\', '/')}" WHERE id = ${req.params.id}`, function (error, results, fields) {

            connection.release();
            console.log("Connection released");
            res.status(200).json({
                status: "OK",
                message: "Photo uploaded"
            });

            if (error) return;
        });
    });
    */
};

userCtrl.createUser = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        var newUser = req.body;

        logger.info(`Encripting user data...`, {
            __filename
        });

        newUser.name = await crypt.encryptText(newUser.name);
        newUser.surname = await crypt.encryptText(newUser.surname);
        newUser.pass = await crypt.encryptPassword(newUser.pass);
        newUser.email = await crypt.encryptText(newUser.email);
        newUser.phone = await crypt.encryptText(newUser.phone);

        let query = `INSERT INTO users(nick, name, last_name, password, email, phone, city, profile_photo, interests, creation_date, birth_date, blocked) VALUES("${newUser.nick}", "${newUser.name}", "${newUser.surname}", "${newUser.pass}", "${newUser.email}", "${newUser.phone}", "${newUser.city}", "${newUser.profile_photo}", "${newUser.interests}", "${newUser.creationDate}", "${newUser.birthDate}", ${newUser.blocked})`;

        logger.info(`Creating user... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`User does not created. ${error}`, {
                    __filename
                });
                res.status(400).json({
                    status: "KO",
                    message: "User does not created"
                });
                return;
            }

            logger.info(`User created`, {
                __filename
            });
            res.status(200).json({
                status: "OK",
                message: "User created"
            });
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }


};

userCtrl.userExists = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        logger.info(`Decripting nick...`, {
            __filename
        });
        let uncodeNick = decoder.write(req.params.nick);

        let query = `SELECT id FROM users WHERE nick = binary '${uncodeNick}'`;
        logger.info(`Checking user... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`User does not checked. ${error}`, {
                    __filename
                });
                res.status(400).json({
                    status: "KO",
                    message: "User does not checked"
                });
                return;
            }

            if (results.length > 0) {
                logger.info(`User exists`, {
                    __filename
                });
                res.status(200).json({
                    status: "OK",
                    message: "User exists"
                });
            } else {
                logger.info(`User does not exists`, {
                    __filename
                });
                res.status(200).json({
                    status: "NOK",
                    message: "User does not exists"
                });
            }
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }

};

userCtrl.passwordsMatch = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        let query = `SELECT password FROM users WHERE nick = binary '${req.body.nick}'`;
        logger.info(`Checking user... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, async function (error, results, fields) {
            if (error) {
                logger.error(`Passwords do not checked. ${error}`, {
                    __filename
                });
                res.status(400).json({
                    status: "KO",
                    message: "Passwords do not checked"
                });
                return;
            }

            const match = await crypt.comparePassword(req.body.pass, results[0].password);

            if (match) {
                logger.info(`Passwords match`, {
                    __filename
                });
                res.status(200).json({
                    status: "OK",
                    message: "Passwords match"
                });
            } else {
                logger.warn(`Passwords no not match`, {
                    __filename
                });
                res.status(200).json({
                    status: "NOK",
                    message: "Passwords do not match"
                });
            }
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }

};

userCtrl.setInteractedUser = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        let query = `INSERT INTO interacted_users(main_user_id, interacted_user_id) VALUES(${req.userID.id},${req.body.id_interacted_user})`;
        logger.info(`Setting interacted user data... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, async function (error, results, fields) {
            if (error) {
                logger.error(`An error has ocurred setting interacted user data. ${error}`, {
                    __filename
                });
                return;
            }
            res.status(200).json({
                status: "OK",
                message: "Data setted"
            });
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }

};

userCtrl.reloadInteractedUsers = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        
        let query = `DELETE FROM interacted_users WHERE main_user_id = ${req.userID.id}`;
        logger.info(`Reloading interacted users... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, async function (error, results, fields) {
            if (error) {
                logger.error(`An error has ocurred reloading interacted users. ${error}`, {
                    __filename
                });
                return;
            }
            res.status(200).json({
                status: "OK",
                message: "Data reloaded"
            });
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }

};

userCtrl.addFavourite = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        
        let query = `INSERT INTO favourites(id_user, id_fav) VALUES (${req.userID.id}, ${req.params.idfav})`;
        logger.info(`Adding user to favourites... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, async function (error, results, fields) {
            if (error) {
                logger.error(`An error has ocurred adding user to favourites. ${error}`, {
                    __filename
                });
                return;
            }
            res.status(200).json({
                status: "OK",
                message: "User added to favourites"
            });
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }

};

userCtrl.removeFavourite = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        
        let query = `DELETE FROM favourites WHERE id_user = ${req.userID.id} and id_fav = ${req.params.idfav}`;
        logger.info(`Deleting user from favourites... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, async function (error, results, fields) {
            if (error) {
                logger.error(`An error has ocurred deleting user from favourites. ${error}`, {
                    __filename
                });
                return;
            }
            res.status(200).json({
                status: "OK",
                message: "User deleted from favourites"
            });
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }

};

module.exports = userCtrl;