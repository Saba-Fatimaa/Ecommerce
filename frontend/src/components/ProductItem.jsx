import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="text-decoration-none text-dark">
      <div className="card border-0 shadow-sm product-card h-100">
        <div className="overflow-hidden rounded-2">
          <img src={image[0]} alt={name} className="img-fluid product-img" />
        </div>
        <div className="pt-2 text-center px-2">
          <p className="mb-1 text-truncate" style={{ fontSize: "0.9rem" }}>
            {name}
          </p>
          <p
            className="mb-0 fw-semibold text-muted"
            style={{ fontSize: "0.85rem" }}
          >
            {currency}
            {price}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductItem;
