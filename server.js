const express = require('express')
const app = express();
const routes = require('./routes/routes')
const cors = require("cors")

app.use(cors({
    origin:'*'
}))
//body parser
app.use(express.json())//body parser
app.use(express.urlencoded({extended:true}));

//routes
app.use('/',routes)

app.listen(3100,()=>{
    console.log("server is running fine on 3100");
})