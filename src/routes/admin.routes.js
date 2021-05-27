const { Router } = require('express');
const router = Router();

const adminCtrl = require('../controllers/admin.controller');
const authCtrl = require('../controllers/auth.controller');

// /server/admin
router.get('/getoldercard', authCtrl.verifyTokenInternal, adminCtrl.getOlderCard);
router.get('/getadmindata', authCtrl.verifyTokenInternal, adminCtrl.getAdminData);
router.get('/checkemail/:email', adminCtrl.checkEmail);
router.get('/resetpassword/:email', adminCtrl.recoveryPassword);

router.post('/createadmin', authCtrl.verifyTokenInternal, adminCtrl.createAdmin);
router.post('/updateadmindata', authCtrl.verifyTokenInternal, adminCtrl.updateAdminData);
router.post('/checkpassword', authCtrl.verifyTokenInternal, adminCtrl.checkPassword);
router.post('/updatepassword', authCtrl.verifyTokenInternal, adminCtrl.updatePassword);

router.put('/acceptcard', authCtrl.verifyTokenInternal, adminCtrl.acceptCard);
router.put('/acceptpeoplecard', authCtrl.verifyTokenInternal, adminCtrl.acceptPeopleCard);
router.put('/updateCardPlace', authCtrl.verifyTokenInternal, adminCtrl.updateCardPlace);

router.delete('/rejectcard/:card_id', authCtrl.verifyTokenInternal, adminCtrl.rejectCard);
router.delete('/rejectpeoplecard/:card_id', authCtrl.verifyTokenInternal, adminCtrl.rejectPeopleCard);
router.delete('/deleteadmin', authCtrl.verifyTokenInternal, adminCtrl.deleteAdmin);
router.delete('/deleteadminbyemail/:email', authCtrl.verifyTokenInternal, adminCtrl.deleteAdminByEmail);


module.exports = router;