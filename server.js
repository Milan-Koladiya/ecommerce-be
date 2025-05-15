const express = require("express")
const { sequelize } = require("./models")
const morgan=require("morgan")
require("dotenv").config()
const app = express();
app.use(express.json())

sequelize.sync({ force: false })
    .then(() => console.log("Database connected successfully!"))
    .catch((error) => console.log("DB connection error", error))

app.use(morgan("dev"))


app.use("/",require("./routes/index"));

let port = process.env.PORT

app.listen(port, () => {
    console.log(`Server listen on port ${port}`)
})

