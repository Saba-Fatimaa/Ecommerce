import React from 'react';
import { assets } from "../assets/frontend_assets/assets";

const Hero = () => {
    return (
        <div className="container-fluid border border-secondary">
            <div className="row align-items-center">
                {/* Hero Left Side */}
                <div className="col-12 col-sm-6 d-flex align-items-center justify-content-center py-5 py-sm-0">
                    <div className="text-dark px-3 text-center text-sm-start">
                        <div className="d-flex align-items-center gap-2 justify-content-center justify-content-sm-start mb-2">
                            <div className="bg-dark" style={{ width: '40px', height: '2px' }}></div>
                            <p className="fw-medium small mb-0">OUR BESTSELLERS</p>
                        </div>

                        <h1 className="prata-regular display-5 lh-base">Latest Arrivals</h1>

                        <div className="d-flex align-items-center gap-2 justify-content-center justify-content-sm-start mt-3">
                            <p className="fw-semibold small mb-0">SHOP NOW</p>
                            <div className="bg-dark" style={{ width: '40px', height: '1px' }}></div>
                        </div>
                    </div>
                </div>

                {/* Hero Right Side */}
                <div className="col-12 col-sm-6 text-center">
                    <img src={assets.hero_img} alt="Hero" className="img-fluid w-100" />
                </div>
            </div>
        </div>
    );
};

export default Hero;
