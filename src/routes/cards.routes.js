const { Router } = require('express');
const router = Router();

const cardsCtrl = require('../controllers/cards.controller');
const authCtrl = require('../controllers/auth.controller');

// /server/cards
router.post('/createcard', cardsCtrl.createCard);
router.post('/createmymyvcard', cardsCtrl.createMymyvCard);
router.get('/getcards/:date', cardsCtrl.getCards);
router.get('/getmymyvcards/:date', cardsCtrl.getMymyvCards);
router.get('/getcardcomments/:id_card', cardsCtrl.getCardComments);
router.get('/getmymyvcardcomments/:id_card', cardsCtrl.getMymyvCardComments);

module.exports = router;