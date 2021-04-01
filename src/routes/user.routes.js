const { Router } = require('express');
const router = Router();

const userCtrl = require('../controllers/user.controller');
const authCtrl = require('../controllers/auth.controller');

// /server/user
router.get('/getusers', authCtrl.verifyTokenInternal, userCtrl.getUsers);
router.post('/createuser', userCtrl.createUser);
router.get('/userexists/:nick', userCtrl.userExists);
router.post('/checkpasswords', userCtrl.passwordsMatch);
router.get('/getusercityandnick', authCtrl.verifyTokenInternal, userCtrl.getUserCityAndNick);
router.get('/getusersofcity/:city', authCtrl.verifyTokenInternal, userCtrl.getUsersOfCity);
router.post('/setinteracteduser', authCtrl.verifyTokenInternal, userCtrl.setInteractedUser);
router.post('/reloadinteractedusers', authCtrl.verifyTokenInternal, userCtrl.reloadInteractedUsers);
router.post('/addtofavourites/:idfav', authCtrl.verifyTokenInternal, userCtrl.addFavourite);
router.post('/removefromfavourites/:idfav', authCtrl.verifyTokenInternal, userCtrl.removeFavourite);

module.exports = router;