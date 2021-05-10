const { Router } = require('express');
const router = Router();

const adminCtrl = require('../controllers/admin.controller');
const authCtrl = require('../controllers/auth.controller');

// /server/admin
router.post('/createadmin', adminCtrl.createAdmin);
router.get('/getoldercard', adminCtrl.getOlderCard);
router.put('/acceptcard', adminCtrl.acceptCard);
router.put('/acceptmymyvcard', adminCtrl.acceptMymyvCard);
router.delete('/rejectcard/:card_id', adminCtrl.rejectCard);
router.delete('/rejectmymyvcard/:card_id', adminCtrl.rejectMymyvCard);
router.put('/updateCardPlace', adminCtrl.updateCardPlace);
router.get('/getadmindata/:email', adminCtrl.getAdminData);

module.exports = router;