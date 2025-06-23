import React, { useState } from "react";
import axios from "axios";
import { assets } from "../assets/admin_assets/assets";

const Add = () => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [sizes, setSizes] = useState([]);
  const [bestseller, setBestseller] = useState(false);

  const backendUrl = "http://localhost:4000";

  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  const handleSizeToggle = size => {
    setSizes(
      prev =>
        prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const onSubmitHandler = async e => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));

      images.forEach((img, index) => {
        if (img) {
          formData.append(`image${index + 1}`, img);
        }
      });

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log("Response:", response.data);
      alert("Product added successfully!");

      // Reset form
      setName("");
      setDescription("");
      setPrice("");
      setCategory("Men");
      setSubCategory("Topwear");
      setSizes([]);
      setBestseller(false);
      setImages([null, null, null, null]);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong while submitting the form.");
    }
  };

  return (
    <form className="container mt-5" onSubmit={onSubmitHandler}>
      {/* Image Upload Section */}
      <div className="mb-4">
        <h5>Upload Images</h5>
        <div className="row g-3">
          {images.map((img, index) =>
            <div className="col-lg-2 col-md-3" key={index}>
              <label
                htmlFor={`image${index}`}
                className="d-block border p-2 text-center rounded cursor-pointer"
              >
                <img
                  src={img ? URL.createObjectURL(img) : assets.upload_area}
                  alt={`Upload ${index + 1}`}
                  className="img-fluid"
                />
                <input
                  type="file"
                  id={`image${index}`}
                  hidden
                  onChange={e => handleImageChange(e, index)}
                />
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Product Name */}
      <div className="mb-3" style={{ maxWidth: "500px" }}>
        <label className="form-label">Product Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Type here..."
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      {/* Product Description */}
      <div className="mb-3" style={{ maxWidth: "500px" }}>
        <label className="form-label">Product Description</label>
        <textarea
          className="form-control"
          rows="3"
          placeholder="Type here..."
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      {/* Category */}
      <div className="mb-3" style={{ maxWidth: "500px" }}>
        <label className="form-label">Category</label>
        <select
          className="form-select"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      {/* Subcategory */}
      <div className="mb-3" style={{ maxWidth: "500px" }}>
        <label className="form-label">Subcategory</label>
        <select
          className="form-select"
          value={subCategory}
          onChange={e => setSubCategory(e.target.value)}
        >
          <option value="Topwear">Topwear</option>
          <option value="Bottomwear">Bottomwear</option>
          <option value="Winterwear">Winterwear</option>
        </select>
      </div>

      {/* Price */}
      <div className="mb-3" style={{ maxWidth: "500px" }}>
        <label className="form-label">Price</label>
        <div className="input-group">
          <span className="input-group-text">
            <i className="bi bi-currency-dollar" />
          </span>
          <input
            type="number"
            className="form-control"
            placeholder="Enter price"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
        </div>
      </div>

      {/* Sizes */}
      <div className="mb-3" style={{ maxWidth: "500px" }}>
        <label className="form-label">Sizes</label>
        <div className="d-flex gap-2 flex-wrap">
          {["XS", "S", "M", "L", "XL"].map(size =>
            <span
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`px-3 py-1 border rounded cursor-pointer ${sizes.includes(
                size
              )
                ? "bg-primary text-white"
                : "bg-light"}`}
              style={{ cursor: "pointer" }}
            >
              {size}
            </span>
          )}
        </div>
      </div>

      {/* Bestseller toggle */}
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={e => setBestseller(e.target.checked)}
        />
        <label className="form-check-label" htmlFor="bestseller">
          Mark as Bestseller
        </label>
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default Add;
