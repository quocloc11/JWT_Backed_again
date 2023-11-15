import express from "express"
import homeController from '../controller/homeCotroller'
const router = express.Router()



const initWebRoutes = (app) => {

    router.get("/", homeController.handleHelloword)
    router.get("/user", homeController.handleUserPage)
    router.post("/users/create-user", homeController.handleCreateNewUser)
    router.post("/delete-user/:id", homeController.handleDeleteUser)
    return app.use("/", router);
}

export default initWebRoutes