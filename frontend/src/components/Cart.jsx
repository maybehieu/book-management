import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from './AuthContext';
import { NavbarContext } from './NavBarContext';

const Cart = () => {
    const { activeUser, isAdmin, isLoggedIn, isPageSwitch, updatePageSwitch } = useContext(AuthContext)

    const { reRender, setReRender } = useContext(NavbarContext)

    const [render, setRender] = useState(false)

    const [categories, setCategories] = useState([])
    const [allBook, setAllBook] = useState([])
    const [pendingOrder, setPendingOrder] = useState([])

    const [activeView, setActiveView] = useState('view1');
    const [orderAmount, setOrderAmount] = useState({})
    const [orders, setOrders] = useState([])
    const [purchaseds, setPurchaseds] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                fetch('http://localhost:9091/server/categories')
                    .then((response) => response.json())
                    .then((data) => {
                        setCategories(data)
                        fetch('http://localhost:9091/server/books')
                            .then((resp) => resp.json())
                            .then((d) => setAllBook(d))
                            .catch((er) => console.log(er))
                    })
                    .catch((err) => console.log(err))
                if (activeUser) {
                    fetch('http://localhost:9091/server/ordered/' + activeUser, {
                        method: 'GET'
                    })
                        .then((response) => response.json())
                        .then((data) => setOrders(data))
                        .catch((err) => console.log(err))

                    fetch('http://localhost:9091/server/purchased/' + activeUser, {
                        method: 'GET'
                    })
                        .then((response) => response.json())
                        .then((data) => setPurchaseds(data))
                        .catch((err) => console.log(err))
                }
            } catch (error) {
                console.log(error);
            }
        }
        const fetchAdminData = async () => {
            fetch('http://localhost:9091/server/books')
                .then((resp) => resp.json())
                .then((d) => setAllBook(d))
                .catch((er) => console.log(er))

            fetch('http://localhost:9091/server/pending-orders', {
                method: 'GET'
            })
                .then((response) => response.json())
                .then((data) => setPendingOrder(data))
                .catch((err) => console.log(err))
        }
        if (isLoggedIn && !isAdmin) {
            fetchUserData()
        } else if (isLoggedIn && isAdmin) {
            fetchAdminData()
        }

        // console.log(orders, purchaseds)
        // console.log(allBook, categories)
    }, [activeUser, render])

    useEffect(() => {
        if (allBook.length > 0) {
            const initialOrderAmount = allBook.reduce((acc, book) => {
                acc[book.bookId] = 1;
                return acc;
            }, {});
            setOrderAmount(initialOrderAmount);
        }
    }, [allBook])

    const handleViewChange = (view) => {
        setActiveView(view);
    };

    const handlePurchase = (id, bookId) => {
        console.log(orderAmount[bookId])
        if (orderAmount[bookId] <= 0) {
            window.alert('Order amount invalid!')
            return;
        }
        console.log(id);
        var orderForm = new FormData()
        orderForm.append('id', id)
        orderForm.append('username', activeUser)
        orderForm.append('bookId', bookId)
        orderForm.append('status', 1)
        orderForm.append('amount', orderAmount[bookId])
        orderForm.append('createdAt', '2022-01-27 21:45:32.064')
        orderForm.append('updatedAt', '2022-01-27 21:45:32.064')

        fetch('http://localhost:9091/server/update-order', {
            method: 'POST',
            body: orderForm
        })
            .then((response) => response.json())
            .then((data) => {
                window.alert(data.response)
                setReRender(!reRender)
                setRender(!render)
                updatePageSwitch(!isPageSwitch)
            })
    }

    const handleAmountChange = (bookId, amount) => {
        setOrderAmount((prevAmounts) => ({
            ...prevAmounts,
            [bookId]: amount,
        }));
    };

    const handleCancelOrder = (orderId) => {
        if (window.confirm('Delete this order?')) {
            fetch('http://localhost:9091/server/delete-order/' + orderId, {
                method: 'DELETE'
            })
                .then((response) => response.json())
                .then((data) => {
                    window.alert(data.response)
                    setReRender(!reRender)
                    setRender(!render)
                    updatePageSwitch(!isPageSwitch)
                })
        }
    }

    const handleAdminAction = (action, object) => {
        var msg = ''
        if (action == 2) {
            msg = 'Accept this order?'
        } else if (action == -1) {
            msg = 'Decline this order?'
        }
        if (window.confirm(msg)) {
            var orderForm = new FormData()
            orderForm.append('id', object.id)
            orderForm.append('username', object.username)
            orderForm.append('bookId', object.bookId)
            orderForm.append('status', action)
            orderForm.append('amount', object.amount)
            orderForm.append('createdAt', '2022-01-27 21:45:32.064')
            orderForm.append('updatedAt', '2022-01-27 21:45:32.064')
            console.log(object.id, action)

            fetch('http://localhost:9091/server/update-order', {
                method: 'POST',
                body: orderForm
            })
                .then((response) => response.json())
                .then((data) => {
                    window.alert(data.response)
                    setReRender(!reRender)
                    setRender(!render)
                    updatePageSwitch(!isPageSwitch)
                })
        }
    }

    const renderView = () => {
        if (!isLoggedIn) {
            navigate('/login')
        }
        if (isLoggedIn && isAdmin) {
            function formatTimestamp(timestamp) {
                const date = new Date(timestamp); // Create a Date object from the SQL timestamp
                // Format the date into a desired string representation (e.g., using toLocaleString())
                const formattedDate = date.toLocaleString();

                return formattedDate;
            }

            function getStatusReturn(code) {
                if (code == 0) {
                    return 'User haven\'t confirm order!'
                }
                if (code == 1) {
                    return 'Pending system process'
                }
                if (code == 2) {
                    return 'Shipping!'
                }
                if (code == -1) {
                    return 'This order has been canceled by an administrator'
                }
            }

            function getHighlightColor(status) {
                if (status === 2) {
                    // green
                    return '#63ce61';
                }
                if (status == -1) {
                    // red
                    return '#df4747';
                }
                // yellow
                return '#e6e075';
            }

            return (
                <div className="container text-center">
                    <h1>Order Administration</h1>
                    <div className="row ">
                        <div className="col-md-8 offset-md-2" style={{ width: '120%', margin: '0 auto' }}>
                            <table className="table table-striped table-bordered mb-0">
                                <thead>
                                    <tr>
                                        <th>Order's ID</th>
                                        <th>Order's Book</th>
                                        <th>Order's Owner</th>
                                        <th>Amount</th>
                                        <th>Order's Status</th>
                                        <th>Order Created time</th>
                                        <th>Order Last update</th>
                                        <th>Order Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        pendingOrder.map((order) => {
                                            const bgColor = getHighlightColor(order.status)
                                            return (
                                                <tr key={order.id}>
                                                    <td> {order.id} </td>
                                                    <td> {allBook.find((book) => book.bookId === order.bookId)?.title} </td>
                                                    <td> {order.username} </td>
                                                    <td> {order.amount} </td>
                                                    <td style={{ backgroundColor: bgColor, fontWeight: 'bold' }}> {getStatusReturn(order.status)} </td>
                                                    <td> {formatTimestamp(order.createdAt)}</td>
                                                    <td> {formatTimestamp(order.updatedAt)}</td>
                                                    {
                                                        <td>
                                                            {
                                                                order.status == 1 || order.status == -1 ? (
                                                                    <button className="btn btn-primary" onClick={() => {
                                                                        handleAdminAction(2, order)
                                                                    }}>Accept</button>) : (<></>)
                                                            }
                                                            {
                                                                order.status == 1 || order.status == 2 ? (
                                                                    <button className="btn btn-secondary" onClick={() => {
                                                                        handleAdminAction(-1, order)
                                                                    }}>Decline</button>) : (<></>)
                                                            }
                                                            <button className="btn btn-danger" onClick={() => {
                                                                handleCancelOrder(order.id);
                                                            }}>Delete</button>
                                                        </td>
                                                    }
                                                </tr>
                                            )
                                        })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )
        }
        if (activeView === 'view1') {
            return (
                <div className="container text-center">
                    <h2></h2>
                    <div className="row justify-content-center">
                        <div className="col-lg-6">
                            <table className="table">
                                <tbody>
                                    {allBook.filter((b) => orders.some((ord) => ord.bookId === b.bookId)).map((book) => {
                                        const matched = orders.find((ord) => ord.bookId === book.bookId)
                                        const orderId = matched ? matched.id : null;
                                        return (
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
                                                                    <h5 className="card-title text-start">{`Title: ${book.title}`}</h5>
                                                                    <p className="card-text text-start">{`Author: ${book.author}`}</p>
                                                                    <p className="card-text text-start">{`Category: ${categories[book.categoryId - 1].categoryName}`}</p>
                                                                    <div className="d-flex flex-column"
                                                                        style={{ marginTop: 0 }}>
                                                                        <div className="input-group mb-2"
                                                                            style={{ width: 120 }}>
                                                                            <label className="me-2">
                                                                                Book Amount:
                                                                            </label>
                                                                            <input
                                                                                style={{ width: '45px' }}
                                                                                type="number"
                                                                                className="form-control form-control-sm"
                                                                                onChange={(e) => handleAmountChange(book.bookId, e.target.value)}
                                                                                defaultValue={1}
                                                                            />
                                                                        </div>
                                                                        <div className="d-flex centered">
                                                                            <button
                                                                                className="btn btn-primary me-2"
                                                                                onClick={() => handlePurchase(orderId, book.bookId)}
                                                                            >
                                                                                Confirm Order
                                                                            </button>
                                                                            <button
                                                                                className="btn btn-secondary"
                                                                                onClick={() => handleCancelOrder(orderId)}
                                                                            >
                                                                                Cancel Order
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            );
        } else if (activeView === 'view2') {
            function formatTimestamp(timestamp) {
                const date = new Date(timestamp); // Create a Date object from the SQL timestamp
                // Format the date into a desired string representation (e.g., using toLocaleString())
                const formattedDate = date.toLocaleString();

                return formattedDate;
            }

            function getStatusReturn(code) {
                if (code == 1) {
                    return 'Pending system process'
                }
                if (code == 2) {
                    return 'Shipping!'
                }
                if (code == -1) {
                    return 'This order has been canceled by an administrator'
                }
            }

            function getHighlightColor(status) {
                if (status === 2) {
                    // Return the highlight color for status 2
                    return '#63ce61';
                }
                if (status == -1) {
                    return '#df4747';
                }
                // Return the default color for other statuses
                return '#e6e075';
            }
            return (
                <div className="container text-center">
                    <h2></h2>
                    <div className="row justify-content-center">
                        <div className="row">
                            <div className="col-md-8 offset-md-2" style={{ width: '120%', margin: '0 auto' }}>
                                <table className="table table-striped table-bordered mb-0">
                                    <thead>
                                        <tr>
                                            <th>Order's ID</th>
                                            <th>Book</th>
                                            <th>Order's Status</th>
                                            <th>Order Created time</th>
                                            <th>Order Last update</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            purchaseds.map((order) => {
                                                const bgColor = getHighlightColor(order.status)
                                                return (
                                                    <tr key={order.id} style={{ backgroundColor: bgColor }}>
                                                        <td> {order.id} </td>
                                                        <td> {allBook.find((book) => book.bookId === order.bookId).title} </td>
                                                        <td style={{ fontWeight: 'bold' }}> {getStatusReturn(order.status)} </td>
                                                        <td> {formatTimestamp(order.createdAt)}</td>
                                                        <td> {formatTimestamp(order.updatedAt)}</td>
                                                        {
                                                            order.status == 1 ? (
                                                                <td>
                                                                    <button className="btn btn-danger" onClick={() => {
                                                                        handleCancelOrder(order.id);
                                                                    }}>Cancel Order</button>
                                                                </td>
                                                            ) : (<td></td>)
                                                        }
                                                    </tr>
                                                )
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    };

    return (
        <div>
            {!isAdmin && (<div className="container text-center">
                <h1>User's cart</h1>
                <div className="btn-group" role="group" aria-label="Views">
                    <button
                        type="button"
                        className={`btn btn-outline-primary ${activeView === 'view1' ? 'active' : ''}`}
                        onClick={() => handleViewChange('view1')}
                    >
                        Order
                    </button>
                    <button
                        type="button"
                        className={`btn btn-outline-info ${activeView === 'view2' ? 'active' : ''}`}
                        onClick={() => handleViewChange('view2')}
                    >
                        Confirmed Purchases
                    </button>
                </div>
            </div>)}
            {renderView()}
        </div>
    )
};

export default Cart