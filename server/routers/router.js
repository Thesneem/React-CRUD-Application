const usercontroller = require('../controllers/usercontroller');
const express = require('express');
const admincontroller = require('../controllers/admincontroller');
const verifyJWT = require('../middewares/verifyJWT')
const router = express.Router();


// router.get('/', usercontroller.home)
router.post('/register', usercontroller.register);
router.post('/login', usercontroller.login);
router.get('/profile', verifyJWT, usercontroller.profile);
router.post('/editimage', verifyJWT, usercontroller.editImage)

router.post('/admin', admincontroller.adminLogin)
router.get('/admin/dashboard', admincontroller.userlist)
router.post('/admin/adduser', admincontroller.adduser)
router.post('/admin/edituser/:id', admincontroller.edituser)
router.post('/admin/deleteuser/:id', admincontroller.deleteuser)

module.exports = router;