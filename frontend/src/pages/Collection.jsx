import React, { useContext, useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { get } from '../utils/api.js'; // API helper function
const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000";

const Title = ({ text1, text2 }) => (
  <h2 className="mb-0">
    <span>{text1} </span>
    <strong>{text2}</strong>
  </h2>
);

const ShimmerCard = () => (
  <div className="card h-100">
    <div className="shimmer" style={{ height: '200px', borderRadius: '0.25rem' }}></div>
    <div className="card-body">
      <div className="shimmer mb-2" style={{ height: '20px', width: '70%', borderRadius: '0.25rem' }}></div>
      <div className="shimmer" style={{ height: '16px', width: '30%', borderRadius: '0.25rem' }}></div>
    </div>
  </div>
);

const Collection = () => {
  const { currency, search, showSearch } = useContext(ShopContext);
  const [products, setProducts] = useState(null);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOrder, setSortOrder] = useState('relevant');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await get('api/product/list');
        setProducts(response.products || []);
      } catch (err) {
        console.error('Failed to fetch products', err);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  const toggleFilter = () => setShowFilter(prev => !prev);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories(prev => checked ? [...prev, value] : prev.filter(cat => cat !== value));
  };

  const handleTypeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedTypes(prev => checked ? [...prev, value] : prev.filter(type => type !== value));
  };

  const handleSortChange = (e) => setSortOrder(e.target.value);

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let result = [...products];

    if (showSearch && search?.trim()) {
      const lowerSearch = search.toLowerCase();
      result = result.filter(product => product.name?.toLowerCase().includes(lowerSearch));
    }

    result = result.filter(product => {
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchType = selectedTypes.length === 0 || selectedTypes.includes(product.subCategory);
      return matchCategory && matchType;
    });

    result.sort((a, b) => {
      if (sortOrder === 'low-high') return (a.price || 0) - (b.price || 0);
      if (sortOrder === 'high-low') return (b.price || 0) - (a.price || 0);
      return 0;
    });

    return result;
  }, [products, selectedCategories, selectedTypes, sortOrder, search, showSearch]);

  return (
    <div className="container pt-4 border-top">
      <div className="row">
        <div className="col-sm-3 mb-4">
          <button className="btn btn-outline-secondary w-100 mb-3" onClick={toggleFilter}>
            {showFilter ? 'Hide Filters' : 'Show Filters'}
          </button>

          {showFilter && (
            <>
              <fieldset className="card mb-3">
                <legend className="card-body card-title mb-3 h6">Categories</legend>
                {['Men', 'Women', 'Kids'].map(cat => (
                  <div className="form-check ms-3" key={cat}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value={cat}
                      onChange={handleCategoryChange}
                      checked={selectedCategories.includes(cat)}
                    />
                    <label className="form-check-label">{cat}</label>
                  </div>
                ))}
              </fieldset>

              <fieldset className="card mb-3">
                <legend className="card-body card-title mb-3 h6">Type</legend>
                {['Topwear', 'Bottomwear', 'Winterwear'].map(type => (
                  <div className="form-check ms-3" key={type}>
                    <input
                      type="checkbox"
                      className="form-check-input"
                      value={type}
                      onChange={handleTypeChange}
                      checked={selectedTypes.includes(type)}
                    />
                    <label className="form-check-label">{type}</label>
                  </div>
                ))}
              </fieldset>
            </>
          )}
        </div>

        <div className="col-sm-9">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Title text1="ALL" text2="COLLECTIONS" />
            <select className="form-select w-auto" value={sortOrder} onChange={handleSortChange}>
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          <div className="row g-4">
            {products === null ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="col-6 col-sm-4 col-md-3">
                  <ShimmerCard />
                </div>
              ))
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product._id} className="col-6 col-sm-4 col-md-3">
                  <Link to={`/product/${product._id}`} className="text-decoration-none text-dark">
                    <div className="card h-200 border-0 shadow-sm product-card text-center">
                      <div className="overflow-hidden rounded-2 product-img-wrapper">
                        {/* <img src={product.image[0]} alt={product.name} className="img-fluid product-img" /> */}
                        <img src={`${BASE_URL}/uploads/${product.image[0]}`}alt={product.name}className="img-fluid product-img"/>
                      </div>
                      <div className="card-body px-2 py-3">
                        <p className="card-title mb-1 text-truncate" style={{ fontSize: '0.85rem' }}>{product.name}</p>
                        <p className="card-text text-muted mb-0" style={{ fontSize: '0.8rem' }}>{currency}{product.price}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <div className="alert alert-warning">No products found matching the selected filters.</div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .shimmer {
          position: relative;
          overflow: hidden;
          background: #e0e0e0;
        }
        .shimmer::before {
          content: '';
          position: absolute;
          top: 0;
          left: -150px;
          height: 100%;
          width: 150px;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% { left: -150px; }
          100% { left: 100%; }
        }
        .product-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          cursor: pointer;
        }
        .product-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
        .product-img-wrapper {
          overflow: hidden;
        }
        .product-img {
          width: 100%;
          object-fit: cover;
          transition: transform 0.4s ease-in-out;
        }
        .product-img-wrapper:hover .product-img {
          transform: scale(1.08);
        }
      `}</style>
    </div>
  );
};

export default Collection;