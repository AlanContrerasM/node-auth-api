const router = require('express').Router();
//Bring in the user registration function
const {userRegister, userLogin} = require('../utils/Auth');


//users Registration route
router.post('/register-user', async(req, res) => {
    await userRegister(req.body, 'user', res);
})
//body containing username, name, email, password

//Admin registration
router.post('/register-admin', async(req, res) => {
    await userRegister(req.body, 'admin', res);
})

//SuperAdmin registration 
router.post('/register-superadmin', async(req, res) => {
    await userRegister(req.body, 'superadmin', res);
})


//users login route
router.post('/login-user', async(req, res) => {
    await userLogin(req.body, 'user', res);
})
//body containing username and password. could change for email if wanted.
//Admin login route
router.post('/login-admin', async(req, res) => {
    await userLogin(req.body, 'admin', res);
})
//SuperAdmin login route
router.post('/login-superadmin', async(req, res) => {
    await userLogin(req.body, 'superadmin', res);
})


//profile route
router.get('profile', async(req, res) => {});

//users protected route
router.post('/user-profile', async(req, res) => {})
//Admin protected route
router.post('/admin-profile', async(req, res) => {})
//SuperAdmin protected route
router.post('/superadmin-profile', async(req, res) => {})
module.exports = router;