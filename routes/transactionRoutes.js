const express = require('express')
const router = express.Router()
const {getTransactions, postAddTransaction, postDeleteTransaction} = require('../controllers/transactionControllers')

router.get('/all-transactions', getTransactions)

router.post('/add-transaction', postAddTransaction); 

router.post('/delete/:id', postDeleteTransaction)

module.exports = router