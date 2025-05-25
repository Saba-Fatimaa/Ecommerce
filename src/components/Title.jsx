import React from 'react';

const Title = ({ text1, text2 }) => {
    return (
        <div className="d-inline-flex align-items-center gap-2 mb-3">
            <p className="text-muted mb-0">
                {text1}{' '}
                <span className="text-dark fw-medium">{text2}</span>
            </p>
            <div
                className="bg-dark"
                style={{ width: '50px', height: '2px' }}
            ></div>
        </div>
    );
};

export default Title;
