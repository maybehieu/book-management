import React, { useState } from 'react'

const Cart = () => {
    const [activeView, setActiveView] = useState('view1');

    const handleViewChange = (view) => {
        setActiveView(view);
    };

    const renderView = () => {
        if (activeView === 'view1') {
            return (
                <div className="container">
                    <h2>View 1</h2>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="card" style={{ width: '18rem' }}>
                                        <img
                                            src="https://via.placeholder.com/150"
                                            className="card-img-top"
                                            alt="Book Cover"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">Book Title</h5>
                                            <p className="card-text">Author: John Doe</p>
                                            <p className="card-text">Category: Fiction</p>
                                            <button className="btn btn-primary">Add to Cart</button>
                                            <button className="btn btn-secondary">View Details</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        } else if (activeView === 'view2') {
            return (
                <div className="container">
                    <h2>View 2</h2>
                    <table className="table">
                        <tbody>
                            <tr>
                                <td>
                                    <div className="card" style={{ width: '18rem' }}>
                                        <img
                                            src="https://via.placeholder.com/150"
                                            className="card-img-top"
                                            alt="Book Cover"
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">Book Title</h5>
                                            <p className="card-text">Author: Jane Smith</p>
                                            <p className="card-text">Category: Mystery</p>
                                            <button className="btn btn-primary">Add to Cart</button>
                                            <button className="btn btn-secondary">View Details</button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    };

    return (
        <div>
            <div className="container">
                <h1>Bootstrap CDN Demo</h1>
                <div className="btn-group" role="group" aria-label="Views">
                    <button
                        type="button"
                        className={`btn btn-primary ${activeView === 'view1' ? 'active' : ''}`}
                        onClick={() => handleViewChange('view1')}
                    >
                        View 1
                    </button>
                    <button
                        type="button"
                        className={`btn btn-primary ${activeView === 'view2' ? 'active' : ''}`}
                        onClick={() => handleViewChange('view2')}
                    >
                        View 2
                    </button>
                </div>
            </div>
            {renderView()}
        </div>
    );
};

export default Cart