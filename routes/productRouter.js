import express from "express";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";
import {
  createproduct,
  deleteproduct,
  getProduct,
  getSingleProduct,
  productphoto,
  updateproduct,
  productFiltersController,
  productCountController,
  productListController
} from "../controller/productController.js";
import formidable from "express-formidable";
const router = express.Router();

//routes
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createproduct
);
router.put(
  "/update-product/:pid",
  requireSignIn,
  isAdmin,
  formidable(),
  updateproduct
);
router.get("/get-product", getProduct);
router.get("/get-product/:slug", getSingleProduct);
router.get("/product-photo/:pid", productphoto);
router.get("/delete/:pid", deleteproduct);
router.post("/product-filters", productFiltersController);
router.get("/product-count",productCountController);
router.get("/product-list/:page",productListController)
export default router;
