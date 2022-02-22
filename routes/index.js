const router=require("express").Router()


const newscontroller=require("../controllers/newscontroller")

router.get("/topnews",newscontroller.news)


module.exports=router