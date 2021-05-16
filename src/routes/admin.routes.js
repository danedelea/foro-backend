const { Router } = require('express');
const router = Router();

const adminCtrl = require('../controllers/admin.controller');
const authCtrl = require('../controllers/auth.controller');

// /server/admin
router.get('/getoldercard', authCtrl.verifyTokenInternal, adminCtrl.getOlderCard);
router.get('/getadmindata', authCtrl.verifyTokenInternal, adminCtrl.getAdminData);
router.get('/checkemail/:email', authCtrl.verifyTokenInternal, adminCtrl.checkEmail);

router.post('/createadmin', authCtrl.verifyTokenInternal, adminCtrl.createAdmin);
router.post('/updateadmindata', authCtrl.verifyTokenInternal, adminCtrl.updateAdminData);
router.post('/checkpassword', authCtrl.verifyTokenInternal, adminCtrl.checkPassword);
router.post('/updatepassword', authCtrl.verifyTokenInternal, adminCtrl.updatePassword);

router.put('/acceptcard', authCtrl.verifyTokenInternal, adminCtrl.acceptCard);
router.put('/acceptmymyvcard', authCtrl.verifyTokenInternal, adminCtrl.acceptMymyvCard);
router.put('/updateCardPlace', authCtrl.verifyTokenInternal, adminCtrl.updateCardPlace);

router.delete('/rejectcard/:card_id', authCtrl.verifyTokenInternal, adminCtrl.rejectCard);
router.delete('/rejectmymyvcard/:card_id', authCtrl.verifyTokenInternal, adminCtrl.rejectMymyvCard);


module.exports = router;