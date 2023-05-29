import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';

const Cart = () => {
    const { activeUser, isAdmin } = useContext(AuthContext)

    const [activeView, setActiveView] = useState('view1');
    const [orders, setOrders] = useState([])
    const [purchaseds, setPurchaseds] = useState([])

    useEffect()

    const handleViewChange = (view) => {
        setActiveView(view);
    };

    const renderView = () => {
        if (activeView === 'view1') {
            return (
                <div className="container">
                    <h2>View 1</h2>
                    {data.map((book) => (
                        <div className="row justify-content-center" key={book.bookId}>
                            <div className="col-lg-6">
                                <table className="table">
                                    <tbody>
                                        {data.map((book) => (
                                            <tr key={book.bookId}>
                                                <td>
                                                    <div className="card mb-3" style={{ maxWidth: 600 }}>
                                                        <div className="row g-0">
                                                            <div className="col-md-4">
                                                                <img
                                                                    src={`http://localhost:9091/server/image/${book.bookId}`}
                                                                    className="img-fluid rounded-start"
                                                                    alt="Book Cover"
                                                                />
                                                            </div>
                                                            <div className="col-md-8">
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{`Title: ${book.title}`}</h5>
                                                                    <p className="card-text">{`Author: ${book.author}`}</p>
                                                                    <p className="card-text">{`Category: ${book.category}`}</p>
                                                                    {/* Additional card content here */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            );
        } else if (activeView === 'view2') {
            return (
                <div className="container">
                    <h2>View 2</h2>
                    {data.map((book) => (
                        <div className="row justify-content-center" key={book.bookId}>
                            <div className="col-lg-6">
                                <table className="table">
                                    <tbody>
                                        {data.map((book) => (
                                            <tr key={book.bookId}>
                                                <td>
                                                    <div className="card mb-3" style={{ maxWidth: 600 }}>
                                                        <div className="row g-0">
                                                            <div className="col-md-4">
                                                                <img
                                                                    src={`http://localhost:9091/server/image/${book.bookId}`}
                                                                    className="img-fluid rounded-start"
                                                                    alt="Book Cover"
                                                                />
                                                            </div>
                                                            <div className="col-md-8">
                                                                <div className="card-body">
                                                                    <h5 className="card-title">{`Title: ${book.title}`}</h5>
                                                                    <p className="card-text">{`Author: ${book.author}`}</p>
                                                                    <p className="card-text">{`Category: ${book.category}`}</p>
                                                                    {/* Additional card content here */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
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
    )
};

export default Cart