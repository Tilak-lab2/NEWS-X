const router=require('express').Router()

const homecontroller=require("../controllers/homecontroller")

router.get("/",homecontroller.home)
router.get('/sign-in',homecontroller.signin)
router.get('/sign-up',homecontroller.signup)
router.get('/sign-out',homecontroller.signout)
router.post("/create",homecontroller.create)
router.post("/createSession",homecontroller.createSession)




module.exports=router