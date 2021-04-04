const winston = require("winston");
const path = require('path');
const moment = require('moment');

const formatLog = winston.format.combine(
    winston.format.simple(),
    winston.format.timestamp(),
    winston.format.printf(info => `${formatLevel(info)} [${moment().format("DD-MM-YYYY | HH:mm:ss.SSS")}] [${path.basename(info.__filename)}] ${info.message}`)
);

const logger =
    winston.createLogger({
        level: "info",
        exitOnError: "false",
        format: formatLog,
        transports: [
            new winston.transports.Console(),
            new winston.transports.File({
                filename: `${__dirname}/../logs/tinder_unizar_logs_${moment().format("DD-MM-YYYY")}.log`
            })
        ]
    });

function formatLevel(info) {
    if (info.level.toUpperCase() === "INFO") {
        return "INFO ";
    } else if (info.level.toUpperCase() === "WARN") {
        return "WARN ";
    } else {
        return info.level.toUpperCase();
    }
}
module.exports = logger;