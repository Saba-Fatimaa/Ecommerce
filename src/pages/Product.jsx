import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import starIcon from '../assets/frontend_assets/star_icon.png';
import starDullIcon from '../assets/frontend_assets/star_dull_icon.png';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState(null);

  useEffect(() => {
    const found = products.find((item) => item._id === productId);
    if (found) {
      setProductData(found);
      setImage(found.image?.[0] || '');
    }
  }, [productId, products]);

  if (!productData) return <div className="text-center py-5">Loading...</div>;

  return (
    <div className="container py-5 border-top">
      <div className="row g-5">
        {/* Product Images */}
        <div className="col-md-6">
          <div className="row">
            {/* Thumbnails */}
            <div className="col-2 d-flex flex-md-column gap-2 overflow-auto" style={{ maxHeight: '400px' }}>
              {productData.image?.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Thumb ${index}`}
                  className={`img-thumbnail p-1 ${image === img ? 'border-primary' : ''}`}
                  style={{ cursor: 'pointer', width: '100%', height: '80px', objectFit: 'cover' }}
                  onClick={() => setImage(img)}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="col-10">
              <img
                src={image}
                alt="Selected"
                className="img-fluid rounded border"
                style={{ maxHeight: '450px', objectFit: 'contain', width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="col-md-6">
          <h2 className="mb-3">{productData.name}</h2>

          {/* Rating */}
          <div className="d-flex align-items-center mb-2">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={starIcon} alt="star" style={{ width: '16px' }} />
            ))}
            <img src={starDullIcon} alt="star" style={{ width: '16px' }} />
            <span className="ms-2 text-muted">(122 reviews)</span>
          </div>

          <h4 className="text-success mb-3">
            {currency}${productData.price}
          </h4>

          <p className="text-muted">{productData.description}</p>

          <p className="mt-4 h5">{currency} {productData.price}</p>
          <div className="my-4">
            <p className="mb-2">Select Size</p>
            <div className="d-flex flex-wrap gap-2">
              {productData.sizes?.map((item, index) => (
                 <button
                 key={index}
                 onClick={() => setSize(item)}
                 className={`btn btn-outline-secondary px-3 py-2 ${size === item ? 'active border-dark' : ''}`}
               >
                {item}
                </button>
              ))}
              </div>
              </div>
              {/* Add to Cart Button */}
              <div className="mt-3">
              <button
               className="btn btn-primary px-4 py-2"
               disabled={!size}
               onClick={() => {
                addToCart(productData._id, size, 1);
                alert('Item added to cart!');
              }}
              
             > Add to Cart
             </button>
             </div>
             <div className="text-muted mt-3 d-flex flex-column gap-1" style={{ fontSize: '0.875rem' }}>
              <p>100% Original product.</p>
              <p>Cash on delivery is available on this product.</p>
              <p>Easy return and exchange policy within 7 days.</p>
              </div>
        </div>
        <hr className="mt-4 w-75" />
        {/* Description & Review Section */}
        <div className="mt-5">
          <div className="d-flex">
            <b className="border px-3 py-2 text-small">Description</b>
            <p className="border px-3 py-2 text-small mb-0">Reviews (122)</p>
            </div>
            <div className="border p-4 text-muted text-small d-flex flex-column gap-2">
              <p>An e-commerce website is an online platform that facilitates the buying and selling of products...</p>
              </div>
              </div>


      </div>
      <RelatedProducts 
  category={productData.category} 
  subCategory={productData.subCategory} 
/>

    </div>
  );
};

export default Product;
