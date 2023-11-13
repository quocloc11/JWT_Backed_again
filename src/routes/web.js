import express from "express"
import homeController from '../controller/homeCotroller'
const router = express.Router()



const initWebRoutes = (app) => {

    router.get("/user", homeController.handleUserPage)
    router.get("/", homeController.handleHelloword)

    return app.use("/", router);
}

export default initWebRoutes