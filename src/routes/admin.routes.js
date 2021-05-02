const { Router } = require('express');
const router = Router();

const adminCtrl = require('../controllers/admin.controller');
const authCtrl = require('../controllers/auth.controller');

// /server/admin
router.post('/createadmin', adminCtrl.createAdmin);
router.get('/getoldercard', adminCtrl.getOlderCard);
router.put('/acceptcard', adminCtrl.acceptCard);
router.put('/acceptmymyvcard', adminCtrl.acceptMymyvCard);

module.exports = router;