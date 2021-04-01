const bcrypt = require("bcryptjs");
const crypto = require('crypto');
const config = require('../keys.js');

const bcryptCtrl = {
    async encryptPassword(password) {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    },
    async comparePassword(password, passwordHashed) {
        return await bcrypt.compare(password, passwordHashed);
    },
    async encryptText(text) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(config.ALGORITH,  config.SECRET_KEY_CRYPTO, iv);

        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
        return iv.toString('hex') + ":" + encrypted.toString('hex');

    },
    async decryptText(text) {
        const splitData = text.split(':');
        
        const decipher = crypto.createDecipheriv(config.ALGORITH,  config.SECRET_KEY_CRYPTO, Buffer.from(splitData[0], 'hex'));
        const decrpyted = Buffer.concat([decipher.update(Buffer.from(splitData[1], 'hex')), decipher.final()]);
        return decrpyted.toString();
    }

};


module.exports = bcryptCtrl;