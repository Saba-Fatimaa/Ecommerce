import express from "express";
import {
  listProducts,
  addProduct,
  removeProduct,
  singleProduct
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";

const productRouter = express.Router();

// Upload multiple images: image1, image2, image3
productRouter.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 }
  ]),
  addProduct
);

productRouter.post("/remove", removeProduct);
productRouter.post("/single", singleProduct);
productRouter.get("/list", listProducts);

export default productRouter;
