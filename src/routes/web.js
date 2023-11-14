import express from "express"
import homeController from '../controller/homeCotroller'
const router = express.Router()



const initWebRoutes = (app) => {

    router.get("/user", homeController.handleUserPage)
    router.get("/", homeController.handleHelloword)
    router.post("/users/create-user", homeController.handleCreateNewUser)
    return app.use("/", router);
}

export default initWebRoutes