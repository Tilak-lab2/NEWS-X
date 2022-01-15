const express=require('express')
require('dotenv').config()
const port=process.env.PORT
const app=express()




app.use(express.urlencoded({extended:false}))
app.use("/",require("./routes/app"))
app.listen(port,()=>{
    console.log(`Running on localhost${port}`)
})