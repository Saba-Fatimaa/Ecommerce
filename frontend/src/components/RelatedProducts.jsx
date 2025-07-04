import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (
      Array.isArray(products) &&
      products.length > 0 &&
      category &&
      subCategory
    ) {
      console.log("RelatedProducts: filtering with", { category, subCategory });

      const filtered = products.filter(
        (item) =>
          item.category?.toLowerCase().trim() === category.toLowerCase().trim() &&
          item.subCategory?.toLowerCase().trim() === subCategory.toLowerCase().trim()
      );

      setRelated(filtered.slice(0, 5));
    } else {
      setRelated([]); // Reset when no valid match
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-5">
      <div className="text-center mb-4 display-5">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>

      <div className="row gx-3 gy-4">
        {related.length > 0 ? (
          related.map((item) => (
            <div key={item._id} className="col-6 col-sm-4 col-md-3 col-lg-3">
              <ProductItem
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            </div>
          ))
        ) : (
          <div className="col-12 text-center text-muted">
            <p>No related products found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RelatedProducts;

