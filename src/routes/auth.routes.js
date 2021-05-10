const { Router } = require('express');
const router = Router();

const authCtrl = require('../controllers/auth.controller');

// /server/auth
router.get('/gettoken/:nick', authCtrl.getToken);
router.get('/verifytoken', authCtrl.verifyTokenExternal);
router.post('/checkcredentials', authCtrl.checkCredentials);

module.exports = router;