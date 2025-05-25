import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/frontend_assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        setVisible(location.pathname.includes('collection') && showSearch);
    }, [location, showSearch]);

    if (!visible) return null;

    return (
        <div className="border-top border-bottom bg-light py-2">
            <div className="container d-flex justify-content-center align-items-center">
                <div className="input-group w-75 w-md-50">
                    <span className="input-group-text bg-white border-end-0">
                        <img src={assets.search_icon} alt="search" style={{ width: '16px' }} />
                    </span>
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="form-control border-start-0 border-end-0"
                        placeholder="Search collections..."
                    />
                    <button
                        className="btn btn-outline-secondary"
                        onClick={() => {
                            setSearch('');
                            setShowSearch(false);
                        }}
                    >
                        <img src={assets.close_icon} alt="close" style={{ width: '14px' }} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;
