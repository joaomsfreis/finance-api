const TypeController = require('../controllers/TypeController');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/', auth, TypeController.index);

router.post('/', auth, TypeController.store);

router.get('/:id', auth, TypeController.show);

router.patch('/', auth, TypeController.update);

router.delete('/', auth, TypeController.delete);

module.exports = router;