const Staff = require('../models/staff')
const Brand = require('../models/brand')
const User = require('../models/user')
const Transaction = require('../models/transaction')
const Asset = require('../models/asset')
const Liability = require('../models/liability')

let currentDate = new Date()
let currentYear = currentDate.getFullYear()
let currentMonth = currentDate.getMonth()

module.exports = {
 getHome : async (req, res) => {

    const allTransactions = await Transaction.find().limit(5)

    const plusTransactions = await Transaction.find({type: "income"})

    let mPlusTransactions = [];

    plusTransactions.forEach((e)=>{
        if (e.date.getFullYear() == currentYear && e.date.getMonth() == currentMonth){
           mPlusTransactions.push(e)
        }
    })

    const minusTransactions = await Transaction.find({type: "expense"})
    
    let mMinusTransactions = [];

    minusTransactions.forEach((e)=>{
        if (e.date.getFullYear() == currentYear && e.date.getMonth() == currentMonth){
           mMinusTransactions.push(e)
        }
    })


    let totalPlusTransactions = [];
    
        mPlusTransactions.forEach(e => {
            totalPlusTransactions.push(e.amount)
      });
      
      let totalMinusTransactions = [];
    
        mMinusTransactions.forEach(e => {
            totalMinusTransactions.push(e.amount)
      });
       
       function sum(arr){
            let s = 0;
            for(let i = 0; i < arr.length; i++){
               s = s + arr[i]
            }
            return s 
       }; 
    
     let totalPlus = await sum(totalPlusTransactions);
     let totalMinus = await sum(totalMinusTransactions);
     let totalNet = totalPlus - totalMinus
     
     totalPlus = totalPlus.toLocaleString('en-US')
    
     totalMinus = totalMinus.toLocaleString('en-US')
    
     totalNet = totalNet.toLocaleString('en-US')

     const assets = await Asset.find()
     const liabilities = await Liability.find()

     let assetsArray = [];
        assets.forEach(e => {
            assetsArray.push(e.value)
      })

      let liabilitiesArray = [];
    
        liabilities.forEach(e => {
            liabilitiesArray.push(e.value)
      })
    
     const AssetsSum = assetsArray.reduce(
        (a, b) => a + b,0)

     const LiabilitiesSum = liabilitiesArray.reduce(
        (a, b) => a + b,0)

     let liquidNet = AssetsSum - LiabilitiesSum

      liquidNet = liquidNet.toLocaleString('en-US')
    
        res.render('dashboard', {totalPlus,totalMinus, totalNet, liquidNet, allTransactions}); 
}, 

 getLogin : async (req, res) => {
    res.render('login',{layout: 'plain'})
},

 getRegister : async (req, res) => {
    res.render('register')
},

 postLogin : async (req, res) =>{
    
    const email =  req.body.email 
    const password = req.body.password
    
    const user = User.find({email: email})
    
    res.redirect('/')
},

 postRegister : async (req, res) =>{
    
    const newUser = await User.create({
        email : req.body.email,
        password : req.body.password
    })
    
    newUser.save();
      
    res.render('home')
}, 
 
getAssets : async (req, res) => {

 const allAssets = await Asset.find()

 let totalAssetsArray = [];
    
        allAssets.forEach(e => {
            totalAssetsArray.push(e.value)
      });

function sum(arr){
    let s = 0;
    for(let i = 0; i < arr.length; i++){
       s = s + arr[i]
    }
    return s 
}; 

let totalAssets = await sum(totalAssetsArray);

totalAssets = totalAssets.toLocaleString('en-US')


 res.render('assets', {allAssets, totalAssets})
}, 

getBudget: async (req, res) => {
    res.render('budget')
},

getLiabilities : async (req, res) => {

    const allLiabilities = await Liability.find()
   
    let totalLiabilitiesArray = [];
       
           allLiabilities.forEach(e => {
               totalLiabilitiesArray.push(e.value)
         });
   
   function sum(arr){
       let s = 0;
       for(let i = 0; i < arr.length; i++){
          s = s + arr[i]
       }
       return s 
   }; 
   
   let totalLiabilities = await sum(totalLiabilitiesArray);
   
   totalLiabilities = totalLiabilities.toLocaleString('en-US')
   
   
    res.render('liabilities', {allLiabilities, totalLiabilities})
},
getSettings: async (req, res) => {
    res.render('settings')
},

getBrands: async (req, res) => {

    const pianomanTrans = await Transaction.find({brand : 'pianoman', type : 'income'})

    // PASSED

    if (pianomanTrans.length === 0){
        var pianomanTotal = 0;
   } else {

    var mPianomanTransArray = [];

    pianomanTrans.forEach((e)=>{
        if (e.date.getFullYear() == currentYear && e.date.getMonth() == currentMonth){
            mPianomanTransArray.push(e.amount)
        }
    })
    
    var pianomanTotal = mPianomanTransArray.reduce((a, b)=> a + b,0)
    
   } 

//  Pianoman Expenses 

const pianomanExp = await Transaction.find({brand : 'pianoman', type : 'expense'})


if (pianomanExp.length === 0){
    var pianomanExpTotal = 0;
} else {

var mPianomanExpArray = [];

pianomanExp.forEach((e)=>{
    if (e.date.getFullYear() == currentYear && e.date.getMonth() == currentMonth){
        mPianomanExpArray.push(e.amount)
    }
})

var pianomanExpTotal = mPianomanExpArray.reduce((a, b)=> a + b,0)
}
 

// Pianoman ROI 

let pianomanRoi = ((pianomanTotal -  pianomanExpTotal)/pianomanExpTotal) * 100

pianomanRoi = Math.floor(pianomanRoi)

pianomanTotal = pianomanTotal.toLocaleString('en-US');
pianomanExpTotal = pianomanExpTotal.toLocaleString('en-US')
// CODAR ! 

const codarTrans = await Transaction.find({brand : 'codar', type :'income'})

// PASSED

if (codarTrans.length === 0){
    var codarTotal = 0;
} else {

var mCodarTransArray = [];

codarTrans.forEach((e)=>{
    if (e.date.getFullYear() == currentYear && e.date.getMonth() == currentMonth){
        mCodarTransArray.push(e.amount)
    }
})


var codarTotal = mCodarTransArray.reduce((a, b)=> a + b,0)

}

// Codar Expenses 

const codarExp = await Transaction.find({brand : 'codar', type :'expense'})

// PASSED

if (codarExp.length === 0){
    var codarExpTotal = 0;
} else {

var mCodarExpArray = [];

codarExp.forEach((e)=>{
    if (e.date.getFullYear() == currentYear && e.date.getMonth() == currentMonth){
        mCodarExpArray.push(e.amount)
    }
})


var codarExpTotal = mCodarExpArray.reduce((a, b)=> a + b,0)

}

// Codar Roi 
let codarRoi = ((codarTotal -  codarExpTotal)/codarExpTotal) * 100

codarRoi = Math.floor(codarRoi)

codarTotal = codarTotal.toLocaleString('en-US')
codarExpTotal = codarExpTotal.toLocaleString('en-US')


// AGENCY 
const agencyTrans = await Transaction.find({brand : 'agency', type :'income'})

// PASSED

if (agencyTrans.length === 0){
    var agencyTotal = 0;
} else {

var mAgencyTransArray = [];

agencyTrans.forEach((e)=>{
    if (e.date.getFullYear() == currentYear && e.date.getMonth() == currentMonth){
        mAgencyTransArray.push(e.amount)
    }
})


var agencyTotal = mAgencyTransArray.reduce((a, b)=> a + b,0)

}

// Agency Expenses

const agencyExp = await Transaction.find({brand : 'agency', type :'expense'})

// PASSED

if (agencyExp.length === 0){
    var agencyExpTotal = 0;
} else {

var mAgencyExpArray = [];

agencyExp.forEach((e)=>{
    if (e.date.getFullYear() == currentYear && e.date.getMonth() == currentMonth){
        mAgencyExpArray.push(e.amount)
    }
})


var agencyExpTotal = mAgencyExpArray.reduce((a, b)=> a + b,0)

}
 
// Agency Roi 
    let agencyRoi = ((agencyTotal -  agencyExpTotal)/agencyExpTotal) * 100

    agencyRoi = Math.floor(agencyRoi)

    agencyTotal = agencyTotal.toLocaleString('en-US')
    agencyExpTotal = agencyExpTotal.toLocaleString('en-US')



    res.render('view-brands',{pianomanTotal, codarTotal, agencyTotal, pianomanExpTotal, codarExpTotal, agencyExpTotal, pianomanRoi, agencyRoi, codarRoi})
},

getPayroll: async (req, res) => {
    
    const allStaff = await Staff.find()

    let staffAddupArray = []

    allStaff.forEach((e)=>{
        staffAddupArray.push(e.salary)
    })

    let staffAddup = staffAddupArray.reduce((a, b)=>a+b,0)

    staffAddup = staffAddup.toLocaleString('en-US')

    res.render('view-payroll',{allStaff,staffAddup})
},

getUsers: async (req, res) => {
    res.render('view-users')
},

postAddStaff: async (req, res) => {

    const newStaff = await Staff.create({
        name : req.body.name, 
        salary: req.body.salary,
        role: req.body.role,
        })

        res.render('dashboard')
},

postAddBrand: async (req, res) => {

        const newBrand = await Brand.create({

        brand_name : req.body.brand_name, 
        description: req.body.description,            
        
        })
    
            res.render('dashboard')
},

postAddUser: async (req, res) => {

    const newUser = await User.create({

        name: req.body.name,    
        email: req.body.email,  
        role: req.body.role          
            
    })
        
        res.render('dashboard')   
},

postUpdateAsset: async (req, res) => {
   
    const id = req.params.id
    const asset = await Asset.findById(id)

    asset.value = req.body.value

    asset.save()
    
    res.redirect('/assets')
}, 

postUpdateLiability: async (req, res) => {
   
    const id = req.params.id
    const liability = await Liability.findById(id)

    liability.value = req.body.value

    liability.save()
    
    res.redirect('/liabilities')
}

}