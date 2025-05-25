import React from 'react';

const Newsettler = () => {
    return (
        <div className="container text-center py-5">
            <p className="fs-4 fw-medium text-muted mb-3">
                Subscribe now & avail 20% off
            </p>

            <form className="row justify-content-center g-2">
                <div className="col-12 col-sm-8 col-md-6">
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="col-12 col-sm-auto">
                    <button type="submit" className="btn btn-dark px-4">
                        Subscribe
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Newsettler;
