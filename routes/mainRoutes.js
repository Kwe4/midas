const express = require('express')
const router = express.Router()
const {
    getHome, getLogin, getRegister, postLogin, postRegister, getAssets, getBudget, getLiabilities, getSettings, getBrands, getPayroll, getUsers, postAddStaff, postAddBrand, postAddUser, postUpdateAsset, postUpdateLiability
} = require('../controllers/mainControllers')

router.get('/', getHome); 
    
router.get('/login', getLogin)
    
router.get('/register', getRegister)

router.get('/assets', getAssets)

router.get('/budget', getBudget)

router.get('/liabilities', getLiabilities)

router.get('/settings', getSettings)

router.get('/view-brands', getBrands)

router.get('/view-payroll', getPayroll)

router.get('/view-users', getUsers)

router.post('/login', postLogin)

router.post('/register', postRegister)
    
router.post('/add-staff', postAddStaff)

router.post('/add-brand', postAddBrand)

router.post('/add-user', postAddUser)

router.post('/assets/update/:id', postUpdateAsset)

router.post('/liabilities/update/:id', postUpdateLiability)

module.exports = router