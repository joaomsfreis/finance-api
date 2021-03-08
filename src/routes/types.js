const TypeController = require('../controllers/TypeController');
const express = require('express');
const router = express.Router();

router.get('/', TypeController.index);

router.post('/', TypeController.store);

router.get('/:id', TypeController.show);

router.patch('/', TypeController.update);

router.delete('/', TypeController.delete);

module.exports = router;