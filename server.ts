const express = require("express")
const morgan=require("morgan")
const cors = require('cors');
import db from './models'
const router= require('./routes/index')
require("dotenv").config()

const app = express();
app.use(cors());

app.use(express.json())

db.sequelize.sync({ force: false })
    .then(() => console.log("Database connected successfully!"))
    .catch((error:any) => console.log("DB connection error", error))

// app.use(morgan("dev"))
app.use(express.urlencoded({extended:true}))
app.use(express.static("/public/uploads"))
app.use("/",router);

let port = process.env.PORT

app.listen(port, () => {
    console.log(`Server listen on port ${port}`)
})

