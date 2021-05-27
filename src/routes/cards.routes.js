const { Router } = require('express');
const router = Router();

const cardsCtrl = require('../controllers/cards.controller');

// /server/cards
router.get('/getcards/:date', cardsCtrl.getCards);
router.get('/getpeoplecards/:date', cardsCtrl.getPeopleCards);
router.get('/getcardcomments/:id_card', cardsCtrl.getCardComments);
router.get('/getpeoplecardcomments/:id_card', cardsCtrl.getPeopleCardComments);
router.get('/getstatisticsplacesalltime', cardsCtrl.getStatisticsPlacesAllTime);
router.get('/getstatisticsplacesthirtydays', cardsCtrl.getStatisticsPlacesThirtyDays);
router.get('/getstatisticscardssevendays', cardsCtrl.getStatisticsCardsSevenDays);

router.post('/createcard', cardsCtrl.createCard);
router.post('/createpeoplecard', cardsCtrl.createPeopleCard);
router.post('/sendCardComment', cardsCtrl.createComment);
router.post('/sendPeopleCardComment', cardsCtrl.createPeopleComment);
router.post('/normalSearch', cardsCtrl.normalSearch);
router.post('/peopleSearch', cardsCtrl.peopleSearch);

module.exports = router;