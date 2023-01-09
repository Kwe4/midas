const Transaction = require('../models/transaction')

module.exports = {

getTransactions: async (req, res) => {
   
    const allTransactions = await Transaction.find();

    res.render('all-transactions', {allTransactions})
}, 

postAddTransaction: async (req, res)=>{
    const newTransaction = await Transaction.create({
     title : req.body.title, 
     brand: req.body.brand,
     type: req.body.type,
     notes: req.body.notes,
     amount:req.body.amount
    })

    res.redirect('/');
}, 

postDeleteTransaction: async (req, res)=>{
        
    const id = req.params.id 
  
    await Transaction.deleteOne({_id: id})
 
    res.redirect('/transactions')
 }

}