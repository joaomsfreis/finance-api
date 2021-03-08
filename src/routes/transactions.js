const TransactionController = require('../controllers/TransactionController.js');
const express = require('express');
const router = express.Router();

router.get('/', TransactionController.index);

router.post('/', TransactionController.store);

router.get('/:id', TransactionController.show);

router.patch('/', TransactionController.update);

router.delete('/', TransactionController.delete);

module.exports = router;