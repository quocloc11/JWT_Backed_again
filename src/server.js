import express from "express"
import configViewEngine from "./configs/viewEngine"
import initWebRoutes from "./routes/web"
require("dotenv").config()
import bodyParser from 'body-parser'




const app = express();

configViewEngine(app)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoutes(app)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Backend run = " + PORT)
})