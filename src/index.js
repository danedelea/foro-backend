const logger = require("./libs/winston");
const path = require('path');

require("./database");
const app = require("./app");

app.listen(app.get('port'));
logger.info(`Server on port ${app.get('port')}`, {__filename});
