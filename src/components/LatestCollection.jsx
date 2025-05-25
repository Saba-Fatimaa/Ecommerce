import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductItem from './ProductItem'; // Ensure this path is correct
import Title from './Title';

const LatestCollection = () => {
    const { products } = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        if (products && products.length > 0) {
            setLatestProducts(products.slice(0, 10));
        }
    }, [products]);

    return (
        <div className="container my-5">
            <div className="text-center py-4">
                <div className="fs-2 fw-semibold">
                    <Title text1="LATEST" text2="COLLECTION" />
                </div>
                <p className="w-75 mx-auto text-muted small">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </div>

            <div className="row g-4">
                {latestProducts.map((item, index) => (
                    <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-2">
                        <ProductItem
                            id={item._id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestCollection;
