import express from "express"
import configViewEngine from "./config/viewEngine"
import initWebRoutes from "./routes/web"
require("dotenv").config()
import bodyParser from 'body-parser'
import connection from "./config/connectDB"
import initApiRoutes from './routes/api'
import confidCors from "./config/cors"
import { createJWT, verifyToken } from './middleware/JWTAction'


const app = express();
const PORT = process.env.PORT || 8080;

//fix cors
confidCors(app)

configViewEngine(app)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//test jwt
createJWT()
let decodedData = verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7Im5hbWUiOiJxdW9jbG9jIiwiYWRkcmVzcyI6IkJpbmggZGluaCJ9LCJpYXQiOjE3MDA5MjQxOTd9.539JymbJ0ERbHKyfpfzLK4O8RGgb_wSIN3pAiCsM8pw")
console.log(decodedData)
//test connetion
connection()

initWebRoutes(app)
initApiRoutes(app)

app.listen(PORT, () => {
    console.log("Backend run = " + PORT)
})