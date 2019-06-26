const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuffCtrl');
const auth = require('../middleware/auth');

router.get('/',   stuffCtrl.getAllStuff);
router.get('/:id',   stuffCtrl.getOneThing);

router.post('/', auth,  stuffCtrl.createThing);
router.put('/:id', auth,  stuffCtrl.modifyThing);
router.delete('/:id', auth,   stuffCtrl.deleteThing);

module.exports = router;
