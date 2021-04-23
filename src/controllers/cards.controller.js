const CardCtrl = {};

const crypt = require('./crypt.controller');
const bbdd = require("../database");
const logger = require("../libs/winston");
var moment = require('moment');
const {
    StringDecoder
} = require('string_decoder');

const decoder = new StringDecoder('utf8');

const keys = require("../keys");

CardCtrl.getCards = (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });

    try {
        let query = `SELECT c.id, DATE_FORMAT(STR_TO_DATE(c.date, "%Y-%m-%d"), "%d-%m-%Y") as date, c.time, c.place, c.instagram, c.description, c.publication_date, (SELECT count(*) FROM comments c2 WHERE c2.card_id = c.id) AS comments FROM cards c WHERE STR_TO_DATE(substring(c.publication_date, 1, 10), "%d-%m-%Y") LIKE STR_TO_DATE("${req.params.date}", "%d-%m-%Y") ORDER BY c.publication_date`;

        logger.info(`Getting cards for day "${req.params.date}"...`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`An error has ocurred getting the cards. ${error}`, {
                    __filename
                });
                return;
            }

            for (const result of results) {
                result.model_type = keys.CARD_TYPE_1;
            }

            logger.info(`Cards obtained: ${results.length}`, {
                __filename
            });

            logger.info(`Sending cards...`, {
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

CardCtrl.getMymyvCards = (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });

    try {
        let query = `SELECT mc.id, mc.age, mc.kind, mc.look_for, mc.instagram, mc.description, publication_date, (SELECT count(*) FROM mymyv_comments mc2 WHERE card_id = mc.id) AS comments FROM mymyv_cards mc WHERE STR_TO_DATE(substring(publication_date, 1, 10), "%d-%m-%Y") LIKE STR_TO_DATE("${req.params.date}", "%d-%m-%Y") ORDER BY publication_date`;

        logger.info(`Getting cards for day "${req.params.date}"... `, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`An error has ocurred getting the mymyv cards. ${error}`, {
                    __filename
                });
                return;
            }

            for (const result of results) {
                result.model_type = keys.CARD_TYPE_2;
            }

            logger.info(`Mymyv cards obtained: ${results.length}`, {
                __filename
            });

            logger.info(`Sending cards...`, {
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

CardCtrl.getCardComments = (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });

    try {
        let query = `SELECT c.id, c.comment, c.instagram, substring(c.publication_date, 1, 10) AS publication_date FROM comments c WHERE c.card_id = ${req.params.id_card} ORDER BY publication_date`;

        logger.info(`Getting card comments for card id "${req.params.id_card}"... Executing query: + ${query}`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`An error has ocurred getting the card comments. ${error}`, {
                    __filename
                });
                return;
            }
            logger.info(`Card comments obtained: ${results.length}`, {
                __filename
            });

            logger.info(`Sending card comments...`, {
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

CardCtrl.getMymyvCardComments = (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });

    try {
        let query = `SELECT c.id, c.comment, c.instagram, substring(c.publication_date, 1, 10) AS publication_date FROM mymyv_comments c WHERE c.card_id = ${req.params.id_card} ORDER BY publication_date`;

        logger.info(`Getting mymyv card comments for card id "${req.params.id_card}"... Executing query: + ${query}`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`An error has ocurred getting the mymyv card comments. ${error}`, {
                    __filename
                });
                return;
            }
            logger.info(`Mymyv card comments obtained: ${results.length}`, {
                __filename
            });

            logger.info(`Sending mymyv card comments...`, {
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

        let query = `INSERT INTO cards(date, time, place, instagram, description, publicated) VALUES("${newCard.date}", "${newCard.time}", "${newCard.place}", "${newCard.instagram}", "${newCard.description}", "${newCard.publicated}")`;

        logger.info(`Creating card... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`Card does not created. ${error}`, {
                    __filename
                });
                res.status(400).json({
                    status: keys.FAIL_RESULT,
                    message: "Card does not created"
                });
                return;
            }

            logger.info(`Card created`, {
                __filename
            });
            res.status(200).json({
                status: keys.SUCCESSFUL_RESULT,
                message: "Card created"
            });
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }
};

CardCtrl.createMymyvCard = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        var newMymyvCard = req.body;

        let query = `INSERT INTO mymyv_cards(age, kind, look_for, instagram, description, publicated) VALUES("${newMymyvCard.age}", "${newMymyvCard.kind}", "${newMymyvCard.look_for}", "${newMymyvCard.instagram}", "${newMymyvCard.description}", "${newMymyvCard.publicated}")`;

        logger.info(`Creating mymyv card... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`Mymyv card does not created. ${error}`, {
                    __filename
                });
                res.status(400).json({
                    status: keys.FAIL_RESULT,
                    message: "Mymyv card does not created"
                });
                return;
            }

            logger.info(`Mymyv card created`, {
                __filename
            });
            res.status(200).json({
                status: keys.SUCCESSFUL_RESULT,
                message: "Mymyv card created"
            });
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }
};

CardCtrl.getStatisticsPlacesAllTime = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        let query = `SELECT c.place as title, count(*) AS quantity FROM cards c GROUP BY c.place`;

        logger.info(`Gettins all time places statistics... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`Statistics of all time do not getted. ${error}`, {
                    __filename
                });
                return;
            }

            logger.info(`Statistics of all time getted`, {
                __filename
            });

            logger.info(`Sending statistics of all time...`, {
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

CardCtrl.getStatisticsPlacesThirtyDays = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        let query = `SELECT c.place as title, count(*) AS quantity FROM cards c WHERE STR_TO_DATE(substring(publication_date, 1, 10), "%d-%m-%Y") BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE() GROUP BY c.place`;

        logger.info(`Executing query...`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`Statistics of thirty days do not getted. ${error}`, {
                    __filename
                });
                return;
            }

            logger.info(`Statistics of thirty days getted`, {
                __filename
            });

            logger.info(`Sending statistics of thirty days...`, {
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

CardCtrl.getStatisticsCardsSevenDays = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        let query = `with recursive dates as (
            select curdate() as dte, 1 as lev
            union all
            select dte - interval 1 day, lev + 1
            from dates
            where lev < 7
           )
      select DATE_FORMAT(d.dte, '%d') AS date, count(distinct c.id) AS cards, count(distinct mc.id) AS mymyv_cards
      from dates d 
      left join
           cards c
           on c.publicated = 1 and
              str_to_date(left(c.publication_date, 10), '%d-%m-%Y') >= d.dte and
              str_to_date(left(c.publication_date, 10), '%d-%m-%Y') < d.dte + interval 1 DAY
      left join
           mymyv_cards mc
           on mc.publicated = 1 and
              str_to_date(left(mc.publication_date, 10), '%d-%m-%Y') >= d.dte and
              str_to_date(left(mc.publication_date, 10), '%d-%m-%Y') < d.dte + interval 1 day
      group by d.dte`;

        logger.info(`Executing query...`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`Cards of thirty days do not getted. ${error}`, {
                    __filename
                });
                return;
            }

            logger.info(`Cards of thirty days getted`, {
                __filename
            });

            logger.info(`Sending cards of thirty days...`, {
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

CardCtrl.createComment = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        var newComment = req.body;

        let query = `INSERT INTO comments(comment, instagram, card_id, publication_date) VALUES("${newComment.comment}", "${newComment.instagram}", "${newComment.card_id}", "${newComment.publication_date}")`;

        logger.info(`Creating comment... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`Comment does not created. ${error}`, {
                    __filename
                });
                res.status(400).json({
                    status: keys.FAIL_RESULT,
                    message: "Comment does not created"
                });
                return;
            }

            logger.info(`Comment created`, {
                __filename
            });
            res.status(200).json({
                status: keys.SUCCESSFUL_RESULT,
                message: "Comment created"
            });
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }
};

CardCtrl.createMymyvComment = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        var newComment = req.body;

        let query = `INSERT INTO mymyv_comments(comment, instagram, card_id, publication_date) VALUES("${newComment.comment}", "${newComment.instagram}", "${newComment.card_id}", "${newComment.publication_date}")`;

        logger.info(`Creating mymyv comment... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`Mymyv comment does not created. ${error}`, {
                    __filename
                });
                res.status(400).json({
                    status: keys.FAIL_RESULT,
                    message: "Mymyv comment does not created"
                });
                return;
            }

            logger.info(`Mymyv comment created`, {
                __filename
            });
            res.status(200).json({
                status: keys.SUCCESSFUL_RESULT,
                message: "Mymyv comment created"
            });
        });
    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }
};

CardCtrl.normalSearch = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        var normalSearch = req.body;
        let query = `SELECT c.id, DATE_FORMAT(STR_TO_DATE(c.date, "%Y-%m-%d"), "%d-%m-%Y") as date, c.time, c.place, c.instagram, c.description, c.publication_date, (SELECT count(*) FROM comments c2 WHERE c2.card_id = c.id) AS comments FROM cards c WHERE`;

        if (normalSearch.date !== null) {
            query += ` STR_TO_DATE(c.date, "%Y-%m-%d") = str_to_date("${normalSearch.date}", "%Y-%m-%d")`;
        }
        if (normalSearch.place !== null) {
            if (normalSearch.date !== null) {
                query += " AND";
            }
            query += ` c.place LIKE "${normalSearch.place}"`;
        }

        query += `ORDER BY DATE_FORMAT(STR_TO_DATE(c.date, "%Y-%m-%d"), "%d-%m-%Y")`;

        logger.info(`Searching for "${normalSearch.date}" date and "${normalSearch.place}" place... Executing query...`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`Searching does not made. ${error}`, {
                    __filename
                });
                return;
            }

            logger.info(`Searching made. Sending results...`, {
                __filename
            });

            for (const result of results) {
                result.model_type = keys.CARD_TYPE_1;
            }

            res.status(200).send(results);

        });

    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }
};

CardCtrl.mymyvSearch = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        var mymyvSearch = req.body;
        let query = `SELECT mc.id, mc.age, mc.kind, mc.look_for, mc.instagram, mc.description, mc.publication_date, (SELECT count(*) FROM comments c2 WHERE c2.card_id = mc.id) AS comments FROM mymyv_cards mc WHERE`;

        if (mymyvSearch.min_age !== null || mymyvSearch.max_age !== null) {
            if(mymyvSearch.min_age !== null && mymyvSearch.max_age === null){
                query += ` mc.age >= ${mymyvSearch.min_age}`;
            } else if(mymyvSearch.min_age === null && mymyvSearch.max_age !== null){
                query += ` mc.age <= ${mymyvSearch.max_age}`;
            } else if (mymyvSearch.min_age !== null && mymyvSearch.max_age !== null) {
                query += ` mc.age >= ${mymyvSearch.min_age} && mc.age <= ${mymyvSearch.max_age}`;   
            }

        }

        if (mymyvSearch.kind !== null) {
            if (mymyvSearch.min_age !== null || mymyvSearch.max_age !== null) {
                query += " AND";
            }
            query += ` mc.kind like '${mymyvSearch.kind}'`
        }

        if (mymyvSearch.look_for !== null) {
            if (mymyvSearch.min_age !== null || mymyvSearch.max_age !== null || mymyvSearch.kind !== null) {
                query += " AND";
            }
            query += ` mc.look_for like '${mymyvSearch.look_for}'`
        }

        query += ` ORDER BY mc.publication_date`
        console.log(query);
        logger.info(`Searching for "${mymyvSearch.max_age}" max age, "${mymyvSearch.min_age}" min age, "${mymyvSearch.kind}" kind and "${mymyvSearch.look_for}" look for... Executing query...`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`Searching does not made. ${error}`, {
                    __filename
                });
                return;
            }

            logger.info(`Searching made. Sending results...`, {
                __filename
            });

            for (const result of results) {
                result.model_type = keys.CARD_TYPE_1;
            }

            res.status(200).send(results);

        });

    } catch (error) {
        logger.error(`An error has ocurred connecting to database: ${error}`, {
            __filename
        });
    }
};


module.exports = CardCtrl;