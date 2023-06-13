import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
} from "../controller/authController.js";
import { requireSignIn, isAdmin } from "../middleware/authMiddleware.js";
//router object
const router = express.Router();
//routing
//REGISTER
router.post("/register", registerController);
//login
router.post("/login", loginController);

//forgot pass

router.post("/forgot-password", forgotPasswordController);

//dummy
router.get("/test", requireSignIn, isAdmin, testController);

//protected route user
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
export default router;
