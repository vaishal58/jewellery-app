import express from "express";
import { registerController,loginController,testController } from "../controller/authController.js";
import { requireSignIn,isAdmin } from "../middleware/authMiddleware.js";
//router object
const router = express.Router();
//routing
//REGISTER
router.post("/register", registerController);
//login
router.post("/login",loginController)

//dummy
router.get('/test',requireSignIn,isAdmin,testController)
export default router;
