import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
  const { products } = useContext(ShopContext);
  const [related, setRelated] = useState([]);

  useEffect(
    () => {
      if (products.length > 0) {
        // Filter products matching category AND subCategory
        const filtered = products.filter(
          item => item.category === category && item.subCategory === subCategory
        );
        // Limit to first 5 items
        setRelated(filtered.slice(0, 5));
      }
    },
    [products, category, subCategory]
  );

  return (
    <div className="my-5">
      <div className="text-center mb-4 display-5">
        <Title text1="RELATED" text2="PRODUCTS" />
      </div>
      <div className="row gx-3 gy-4">
        {related.length > 0
          ? related.map(item =>
              <div key={item._id} className="col-6 col-sm-4 col-md-3 col-lg-3">
                <ProductItem
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                />
              </div>
            )
          : <p className="text-center">No related products found.</p>}
      </div>
    </div>
  );
};

export default RelatedProducts;
