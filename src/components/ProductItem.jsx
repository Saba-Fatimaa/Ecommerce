import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);

    return (
        <Link to={`/product/${id}`} className="text-decoration-none text-dark">
            <div className="card border-0">
                <div className="overflow-hidden">
                    <img
                        src={image[0]}
                        alt={name}
                        className="img-fluid transition hover-scale"
                        style={{ transition: 'transform 0.3s ease-in-out' }}
                        onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.1)')}
                        onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                </div>
                <div className="pt-2">
                    <p className="mb-1 small">{name}</p>
                    <p className="mb-0 fw-medium small">
                        {currency}
                        {price}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default ProductItem;
