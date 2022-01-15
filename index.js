const express=require('express')
require('dotenv').config()
const port=process.env.PORT
const path=require('path')
const db=require("./config/mongoose")
const app=express()

app.set('view engine','ejs')
app.set('views',path.join(__dirname ,'./views'))





app.use(express.urlencoded({extended:false}))
app.use("/",require("./routes/app"))
app.listen(port,()=>{
    console.log(`Running on localhost${port}`)
})