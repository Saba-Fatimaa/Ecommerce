import express from "express";
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

// Accept up to 4 images with the same field name 'images'
productRouter.post("/add", upload.array("images", 4), addProduct);

productRouter.post("/remove", removeProduct);
productRouter.post("/single", singleProduct);
productRouter.get("/list", listProducts);

export default productRouter;
