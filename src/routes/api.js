import express from "express"
import apiController from '../controller/apiController'
import userController from '../controller/userController'
import groupController from '../controller/groupController'
import rolecontroller from '../controller/rolecontroller'
import { checkUserJWT, checkUserPermission } from '../middleware/JWTAction'
const router = express.Router()


const initApiRoutes = (app) => {

    router.all('*', checkUserJWT, checkUserPermission,)

    router.get("/test-api", apiController.testApi)
    router.post("/register", apiController.handleRegister)
    router.post("/login", apiController.handleLogin)
    router.post("/logout", apiController.handleLogout)

    router.get("/account", userController.getUserAccount)

    router.get("/user/read", userController.readFunc)
    router.post("/user/create", userController.createFunc)
    router.put("/user/update", userController.updateFunc)
    router.delete("/user/delete", userController.deleteFunc)

    //reoutes 
    router.get("/role/read", rolecontroller.readFunc)
    router.post("/role/create", rolecontroller.createFunc)
    router.put("/role/update", rolecontroller.updateFunc)
    router.delete("/role/delete", rolecontroller.deleteFunc)

    router.get("/group/read", groupController.readFunc)

    return app.use("/api/v1/", router);
}

export default initApiRoutes