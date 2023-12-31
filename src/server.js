import express from "express"
import configViewEngine from "./config/viewEngine"
import initWebRoutes from "./routes/web"
require("dotenv").config()
import bodyParser from 'body-parser'
import connection from "./config/connectDB"
import initApiRoutes from './routes/api'
import confidCors from "./config/cors"
import cookieParser from 'cookie-parser'

const app = express();
const PORT = process.env.PORT || 8080;

//fix cors
confidCors(app)

configViewEngine(app)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//config cookie parse
app.use(cookieParser())

//test connetion
connection()


initWebRoutes(app)
initApiRoutes(app)

app.use((req, res) => {
    return res.send('404 not found')
})
app.listen(PORT, () => {
    console.log("Backend run = " + PORT)
})