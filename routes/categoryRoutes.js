import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {  allcategory, createCategoryController,deletecategory,singlecategorycontroller,updateCategoryController } from "../controller/createCategoryController.js";
const router = express.Router();
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

router.put(
    "/update-category/:id",
    requireSignIn,
    isAdmin,
    updateCategoryController
  );

router.get('/allcategory',allcategory);
router.get('/singlecategory/:slug',singlecategorycontroller)
router.delete('/deletecategory/:id',requireSignIn,isAdmin,deletecategory)
export default router;
