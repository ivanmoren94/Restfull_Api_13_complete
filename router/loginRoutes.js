const router = require('express').Router();
const verifyToken = require('../middlewares/auth')

const {signup , login , refreshToken} = require("../controllers/loginControllers")

router.post('/signup',verifyToken,signup)
router.post('/login',login)
router.get('/refreshToken',verifyToken,refreshToken)


module.exports = router;