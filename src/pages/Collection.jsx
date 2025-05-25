import React, { useContext, useState, useMemo } from 'react';
import { ShopContext } from '../context/ShopContext';

const Title = ({ text1, text2 }) => (
  <h2 className="mb-0">
    <span>{text1} </span>
    <strong>{text2}</strong>
  </h2>
);

// Shimmer card for loading placeholder
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
  const { products } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOrder, setSortOrder] = useState('relevant'); // relevant, low-high, high-low

  const toggleFilter = () => setShowFilter(!showFilter);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setSelectedCategories((prev) =>
      checked ? [...prev, value] : prev.filter((cat) => cat !== value)
    );
  };

  const handleTypeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedTypes((prev) =>
      checked ? [...prev, value] : prev.filter((type) => type !== value)
    );
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  // Filter products
  const filteredProducts = useMemo(() => {
    if (!products) return []; // no products yet
    return products
      .filter((product) => {
        if (selectedCategories.length === 0 && selectedTypes.length === 0) return true;
        const matchCategory =
          selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchType =
          selectedTypes.length === 0 || selectedTypes.includes(product.type);
        return matchCategory && matchType;
      })
      .sort((a, b) => {
        if (sortOrder === 'low-high') return a.price - b.price;
        if (sortOrder === 'high-low') return b.price - a.price;
        return 0; // relevant or default order (no sort)
      });
  }, [products, selectedCategories, selectedTypes, sortOrder]);

  return (
    <div className="container pt-4 border-top">
      <div className="row">
        {/* Filter Sidebar */}
        <div className="col-sm-3">
          <p
            onClick={toggleFilter}
            style={{ cursor: 'pointer', userSelect: 'none' }}
            className="my-2 h5 d-flex align-items-center gap-2"
          >
            FILTERS
          </p>

          {showFilter && (
            <>
              <div className="card mb-3">
                <div className="card-body">
                  <h6 className="card-title mb-3">Categories</h6>
                  {['Men', 'Women', 'Kids'].map((cat) => (
                    <div className="form-check" key={cat}>
                      <input
                        type="checkbox"
                        id={`cat${cat}`}
                        className="form-check-input"
                        value={cat}
                        onChange={handleCategoryChange}
                        checked={selectedCategories.includes(cat)}
                      />
                      <label htmlFor={`cat${cat}`} className="form-check-label">
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-body">
                  <h6 className="card-title mb-3">Type</h6>
                  {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
                    <div className="form-check" key={type}>
                      <input
                        type="checkbox"
                        id={`type${type}`}
                        className="form-check-input"
                        value={type}
                        onChange={handleTypeChange}
                        checked={selectedTypes.includes(type)}
                      />
                      <label htmlFor={`type${type}`} className="form-check-label">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Side */}
        <div className="col-sm-9 flex-grow-1">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <Title text1="ALL" text2="COLLECTIONS" />
            <select
              className="form-select w-auto"
              value={sortOrder}
              onChange={handleSortChange}
              aria-label="Sort products"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          <div className="row">
            {!products ? (
              // Show 6 shimmer placeholders while loading
              Array(6)
                .fill(0)
                .map((_, idx) => (
                  <div key={idx} className="col-md-4 mb-4">
                    <ShimmerCard />
                  </div>
                ))
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="col-md-4 mb-4">
                  <div className="card h-100">
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt={product.name}
                      style={{ objectFit: 'cover', height: '200px' }}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">${product.price}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found matching the selected filters.</p>
            )}
          </div>
        </div>
      </div>

      {/* Shimmer CSS */}
      <style jsx>{`
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
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.6),
            transparent
          );
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% {
            left: -150px;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default Collection;
