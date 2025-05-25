
import React from 'react';
import { assets } from "../assets/frontend_assets/assets";

const OurPolicy = () => {
    return (
        <div className="container py-5">
            <div className="row text-center justify-content-center gy-4">
                {/* Easy Exchange Policy */}
                <div className="col-12 col-sm-6 col-md-4">
                    <img src={assets.exchange_icon} className="mb-3" alt="Exchange Icon" style={{ width: '48px' }} />
                    <p className="fw-semibold mb-1">Easy Exchange Policy</p>
                    <p className="text-muted small">We offer hassle-free exchange policy</p>
                </div>

                {/* 7 Days Return Policy */}
                <div className="col-12 col-sm-6 col-md-4">
                    <img src={assets.quality_icon} className="mb-3" alt="Return Icon" style={{ width: '48px' }} />
                    <p className="fw-semibold mb-1">7 Days Return Policy</p>
                    <p className="text-muted small">We provide 7 days free return policy</p>
                </div>

                {/* Best Customer Support */}
                <div className="col-12 col-sm-6 col-md-4">
                    <img src={assets.support_img} className="mb-3" alt="Support Icon" style={{ width: '48px' }} />
                    <p className="fw-semibold mb-1">Best Customer Support</p>
                    <p className="text-muted small">We provide 24/7 customer support</p>
                </div>
            </div>
        </div>
    );
};

export default OurPolicy;
