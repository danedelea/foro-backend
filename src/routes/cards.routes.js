const { Router } = require('express');
const router = Router();

const cardsCtrl = require('../controllers/cards.controller');
const authCtrl = require('../controllers/auth.controller');

// /server/cards
router.post('/createcard', cardsCtrl.createCard);
router.get('/getcards/:date', cardsCtrl.getCards);

module.exports = router;