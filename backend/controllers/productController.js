import productModel from "../models/productModel.js";

// Function to add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller
    } = req.body;

    // Basic validation
    if (!name || !description || !price || !category || !subCategory || !sizes) {
      return res.status(400).json({
        success: false,
        message: "All fields are required."
      });
    }

    // Only map filenames if files exist
    const imageArray = req.files?.length > 0 ? req.files.map(file => file.filename) : [];

    const parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
    const isBestseller = bestseller === "true" || bestseller === true;

    const newProduct = new productModel({
      name,
      description,
      price,
      category,
      subCategory,
      sizes: parsedSizes,
      bestseller: isBestseller,
      image: imageArray,
      date: Date.now()
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product added successfully."
    });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


// Function to list all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("List Products Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to remove a product by ID
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID required." });
    }

    const deleted = await productModel.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Product removed successfully." });
  } catch (error) {
    console.error("Remove Product Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Function to get single product details
const singleProduct = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Product ID required." });
    }

    const product = await productModel.findById(id);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found." });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Single Product Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, singleProduct };
