import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
  const { products = [] } = useContext(ShopContext);
  const [bestSellers, setBestSellers] = useState([]);

  useEffect(() => {
    if (!Array.isArray(products)) return;

    const filtered = products.filter(item => item?.bestseller);
    const top5 = filtered.slice(0, 5);

    // Prevent unnecessary state update (and rerender loop)
    setBestSellers((prev) => {
      const prevIds = prev.map(p => p._id).join(',');
      const newIds = top5.map(p => p._id).join(',');
      return prevIds === newIds ? prev : top5;
    });
  }, [products]);

  return (
    <div className="container my-5">
      <div className="text-center py-4">
        <div className="fs-2 fw-semibold">
          <Title text1="BEST" text2="SELLERS" />
        </div>
        <p className="w-75 mx-auto text-muted small">
          Check out our top-selling items selected by customer demand.
        </p>
      </div>

      <div className="row g-4 justify-content-center">
        {bestSellers.length > 0 ? (
          bestSellers.map((item) => (
            <div key={item._id} className="col-6 col-sm-4 col-md-3 col-lg-2">
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </div>
          ))
        ) : (
          <div className="text-center text-muted">No best sellers found.</div>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
