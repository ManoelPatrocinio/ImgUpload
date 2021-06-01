require("dotenv").config();//para poder ler as variaveis do .env
const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require('path')

const app = express();

/**
 * Database setuo
*/

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser:true,
        useUnifiedTopology: true
    }
)

app.use(express.json()) // p/ o express lidar com as requisições json
app.use(express.urlencoded({ extended:true})) // p/ o express lidar com as requisições de urlencoded
app.use(morgan('dev')) // p/ o express lidar com as requisições json
app.use('/files', express.static(path.resolve(__dirname,"..","temp","uploads")))

app.use(require("./routes"))
app.listen(3333, ()=>{console.log("server running on port 3333")})
