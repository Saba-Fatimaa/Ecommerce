import React, { useEffect, useState } from "react";
import axios from "axios";

const List = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/product/list");
        console.log("API Response:", res.data);
        setProducts(res.data.products); // ✅ FIX: Set to the array only
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async id => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      await axios.delete(`http://localhost:4000/api/product/delete/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h4 className="mb-3">Product List</h4>

      {loading
        ? <p>Loading...</p>
        : products.length === 0
          ? <p className="text-muted">No products found.</p>
          : <ul className="list-group">
              {products.map(product =>
                <li
                  key={product._id}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  {product.name}
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </li>
              )}
            </ul>}
    </div>
  );
};

export default List;
