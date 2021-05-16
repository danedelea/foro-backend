const { Router } = require('express');
const router = Router();

const adminCtrl = require('../controllers/admin.controller');
const authCtrl = require('../controllers/auth.controller');

// /server/admin
router.post('/createadmin', authCtrl.verifyTokenInternal, adminCtrl.createAdmin);
router.get('/getoldercard', authCtrl.verifyTokenInternal, adminCtrl.getOlderCard);
router.put('/acceptcard', authCtrl.verifyTokenInternal, adminCtrl.acceptCard);
router.put('/acceptmymyvcard', authCtrl.verifyTokenInternal, adminCtrl.acceptMymyvCard);
router.delete('/rejectcard/:card_id', authCtrl.verifyTokenInternal, adminCtrl.rejectCard);
router.delete('/rejectmymyvcard/:card_id', authCtrl.verifyTokenInternal, adminCtrl.rejectMymyvCard);
router.put('/updateCardPlace', authCtrl.verifyTokenInternal, adminCtrl.updateCardPlace);
router.get('/getadmindata', authCtrl.verifyTokenInternal, adminCtrl.getAdminData);
router.post('/updateadmindata', authCtrl.verifyTokenInternal, adminCtrl.updateAdminData);
router.post('/checkpassword', authCtrl.verifyTokenInternal, adminCtrl.checkPassword);
router.post('/updatepassword', authCtrl.verifyTokenInternal, adminCtrl.updatePassword);
router.get('/checkemail/:email', authCtrl.verifyTokenInternal, adminCtrl.checkEmail);


module.exports = router;