import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem'; // Make sure this is correctly imported

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    useEffect(() => {
        const bestProduct = products.filter((item) => item.bestseller);
        setBestSeller(bestProduct.slice(0, 5));
    }, [products]);

    return (
        <div className="container my-5">
            <div className="text-center py-4">
                <div className="fs-2 fw-semibold">
                    <Title text1="BEST" text2="SELLERS" />
                </div>
                <p className="w-75 mx-auto text-muted small">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                </p>
            </div>

            <div className="row g-4 justify-content-center">
                {bestSeller.map((item, index) => (
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

export default BestSeller;
