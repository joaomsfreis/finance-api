const TransactionController = require('../controllers/TransactionController.js');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router.get('/:user_id', auth, TransactionController.index);

router.post('/', auth, TransactionController.store);

router.get('/:user_id/:id', auth, TransactionController.show);

router.patch('/', auth, TransactionController.update);

router.delete('/', auth, TransactionController.delete);

module.exports = router;