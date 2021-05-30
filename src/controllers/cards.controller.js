const CardCtrl = {};

const bbdd = require("../database");
const logger = require("../libs/winston");

const keys = require("../config/keys");

CardCtrl.getCards = (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });

    try {
        let query = `SELECT c.id, DATE_FORMAT(c.date, "%d-%m-%Y") as date, c.time, c.place, c.instagram, c.description, c.publication_date, (SELECT count(*) FROM comments c2 WHERE c2.card_id = c.id) AS comments FROM cards c WHERE DATE_FORMAT(c.publication_date, "%d-%m-%Y") LIKE "${req.params.date}" AND c.publicated = 1 ORDER BY c.publication_date`;

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

CardCtrl.getPeopleCards = (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });

    try {
        let query = `SELECT mc.id, mc.age, mc.kind, mc.look_for, mc.instagram, mc.description, mc.publication_date, (SELECT count(*) FROM people_comments mc2 WHERE card_id = mc.id) AS comments FROM people_cards mc WHERE DATE_FORMAT(mc.publication_date, "%d-%m-%Y") LIKE "${req.params.date}" AND mc.publicated = 1 ORDER BY publication_date`;

        logger.info(`Getting people cards for day "${req.params.date}"... `, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`An error has ocurred getting the people cards. ${error}`, {
                    __filename
                });
                return;
            }

            for (const result of results) {
                result.model_type = keys.CARD_TYPE_2;
            }

            logger.info(`People cards obtained: ${results.length}`, {
                __filename
            });

            logger.info(`Sending people cards...`, {
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
        let query = `SELECT c.id, c.comment, c.instagram, DATE_FORMAT(publication_date, '%d-%m-%Y') AS publication_date  FROM comments c WHERE c.card_id = ${req.params.id_card} ORDER BY publication_date`;

        logger.info(`Getting card comments for card id "${req.params.id_card}"...`, {
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

CardCtrl.getPeopleCardComments = (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });

    try {
        let query = `SELECT c.id, c.comment, c.instagram, DATE_FORMAT(publication_date, '%d-%m-%Y') AS publication_date FROM people_comments c WHERE c.card_id = ${req.params.id_card} ORDER BY publication_date`;

        logger.info(`Getting people card comments for card id "${req.params.id_card}"...`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`An error has ocurred getting the people card comments. ${error}`, {
                    __filename
                });
                return;
            }
            logger.info(`People card comments obtained: ${results.length}`, {
                __filename
            });

            logger.info(`Sending people card comments...`, {
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
        console.log(newCard);

        let query = `INSERT INTO cards(date, time, place, instagram, description, sending_date, publicated) VALUES("${newCard.date}", "${newCard.time}", "${newCard.place}", "${newCard.instagram}", "${newCard.description}", "${newCard.sending_date}", "${newCard.publicated}")`;

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

CardCtrl.createPeopleCard = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        var newPeopleCard = req.body;

        let query = `INSERT INTO people_cards(age, kind, look_for, instagram, description, sending_date, publicated) VALUES("${newPeopleCard.age}", "${newPeopleCard.kind}", "${newPeopleCard.look_for}", "${newPeopleCard.instagram}", "${newPeopleCard.description}", "${newPeopleCard.sending_date}", "${newPeopleCard.publicated}")`;

        logger.info(`Creating people card... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`People card does not created. ${error}`, {
                    __filename
                });
                res.status(400).json({
                    status: keys.FAIL_RESULT,
                    message: "People card does not created"
                });
                return;
            }

            logger.info(`People card created`, {
                __filename
            });
            res.status(200).json({
                status: keys.SUCCESSFUL_RESULT,
                message: "People card created"
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
        let query = `SELECT c.place as title, count(*) AS quantity FROM cards c WHERE c.publicated = 1 GROUP BY c.place`;

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
        let query = `SELECT c.place as title, count(*) AS quantity FROM cards c WHERE c.publicated = 1 AND DATE_FORMAT(c.publication_date, '%Y-%m-%d') BETWEEN CURDATE() - INTERVAL 30 DAY AND CURDATE() GROUP BY c.place`;

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
      select DATE_FORMAT(d.dte, '%d') AS date, count(distinct c.id) AS cards, count(distinct mc.id) AS people_cards
      from dates d 
      left join
           cards c
           on c.publicated = 1 and
              c.publication_date >= d.dte and
              c.publication_date < d.dte + interval 1 DAY
      left join
           people_cards mc
           on mc.publicated = 1 and
              mc.publication_date >= d.dte and
              mc.publication_date < d.dte + interval 1 day
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

CardCtrl.createPeopleComment = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        var newComment = req.body;

        let query = `INSERT INTO people_comments(comment, instagram, card_id, publication_date) VALUES("${newComment.comment}", "${newComment.instagram}", "${newComment.card_id}", "${newComment.publication_date}")`;

        logger.info(`Creating people comment... Executing query: "${query}"`, {
            __filename
        });

        bbdd.query(query, function (error, results, fields) {
            if (error) {
                logger.error(`People comment does not created. ${error}`, {
                    __filename
                });
                res.status(400).json({
                    status: keys.FAIL_RESULT,
                    message: "People comment does not created"
                });
                return;
            }

            logger.info(`People comment created`, {
                __filename
            });
            res.status(200).json({
                status: keys.SUCCESSFUL_RESULT,
                message: "People comment created"
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
        let query = `SELECT c.id, DATE_FORMAT(c.date, "%d-%m-%Y") as date, c.time, c.place, c.instagram, c.description, c.publication_date, (SELECT count(*) FROM comments c2 WHERE c2.card_id = c.id) AS comments FROM cards c WHERE c.publicated = 1`;

        if (normalSearch.date !== "") {
            query += ` AND date_format(c.date, "%Y-%m-%d") = str_to_date("${normalSearch.date}", "%Y-%m-%d")`;
        }
        if (normalSearch.place !== "") {
            query += ` AND c.place LIKE "${normalSearch.place}"`;
        }

        query += ` ORDER BY c.date, c.id`;

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

CardCtrl.peopleSearch = async (req, res) => {
    logger.info(`Connecting to database...`, {
        __filename
    });
    try {
        var peopleSearch = req.body;
        let query = `SELECT mc.id, mc.age, mc.kind, mc.look_for, mc.instagram, mc.description, mc.publication_date, (SELECT count(*) FROM comments c2 WHERE c2.card_id = mc.id) AS comments FROM people_cards mc WHERE mc.publicated = 1`;

        if (peopleSearch.min_age !== null || peopleSearch.max_age !== null) {
            if(peopleSearch.min_age !== null && peopleSearch.max_age === null){
                query += ` AND mc.age >= ${peopleSearch.min_age}`;
            } else if(peopleSearch.min_age === null && peopleSearch.max_age !== null){
                query += ` AND mc.age <= ${peopleSearch.max_age}`;
            } else if (peopleSearch.min_age !== null && peopleSearch.max_age !== null) {
                query += ` AND mc.age >= ${peopleSearch.min_age} && mc.age <= ${peopleSearch.max_age}`;   
            }
        }

        if (peopleSearch.kind !== "") {
            query += ` AND mc.kind like '${peopleSearch.kind}'`
        }

        if (peopleSearch.look_for !== "") {
            query += ` AND mc.look_for like '${peopleSearch.look_for}'`
        }

        query += ` ORDER BY mc.publication_date`;

        logger.info(`Searching for "${peopleSearch.max_age}" max age, "${peopleSearch.min_age}" min age, "${peopleSearch.kind}" kind and "${peopleSearch.look_for}" look for... Executing query...`, {
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
                result.model_type = keys.CARD_TYPE_2;
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