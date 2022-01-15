const router=require('express').Router()

const homecontroller=require("../controllers/homecontroller")
const passport=require('passport')
router.get("/",homecontroller.home)
router.get('/sign-in',homecontroller.signin)
router.get('/sign-up',homecontroller.signup)
router.get('/sign-out',homecontroller.signout)
router.post("/create",homecontroller.create)
router.post("/createSession",homecontroller.createSession)
router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/auth/google/callback',passport.authenticate('google',{failureRedirect:'/sign-in'}),homecontroller.createSession)



module.exports=router