import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { AuthContext } from './AuthContext';
import { NavbarContext } from './NavBarContext';

function CustomerBooks(props) {
    const { activeUser } = useContext(AuthContext)
    const { reRender, setReRender } = useContext(NavbarContext)

    const [categories, setCategories] = useState([])
    const [books, setBooks] = useState([])
    const [ratings, setRatings] = useState([])
    let tratings = []

    const navigate = useNavigate()

    const viewHandle = (bookId) => {
        navigate('/book/' + bookId)
    }

    const addCartHandle = (bookId) => {
        var orderForm = new FormData()
        orderForm.append('id', 0)
        orderForm.append('username', activeUser)
        orderForm.append('bookId', bookId)
        orderForm.append('status', 0)
        orderForm.append('amount', 0)
        orderForm.append('createdAt', '2022-01-27 21:45:32.064')
        orderForm.append('updatedAt', '2022-01-27 21:45:32.064')

        fetch('http://localhost:9091/server/add-order', {
            method: 'POST',

            body: orderForm
        })
            .then((response) => response.json())
            .then((data) => {
                window.alert(data.response)
                setReRender(!reRender)
                navigate('/cart')
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        fetch('http://localhost:9091/server/categories')
            .then((response) => response.json())
            .then((data) => {
                setCategories(data)
                //console.log(data)
                fetch('http://localhost:9091/server/books')
                    .then((response) => response.json())
                    // .then((data) => console.log(data))
                    .then((data) => {
                        // console.log(data)
                        setBooks(data)
                        Promise.all(
                            data.map((book, index) => {
                                // console.log(book.bookId);
                                return fetch('http://localhost:9091/server/rating/' + book.bookId, {
                                    method: 'GET'
                                })
                                    .then((res) => res.json())
                            })
                        )
                            .then((results) => {
                                const tratings = results.map((dataa) => dataa);
                                setRatings(tratings);
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                        //console.log(data)
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <div>
            {/* header */}
            <h2 style={{ textAlign: 'center' }}>Available Books</h2>
            <div className="container">
                <div className="row justify-content-center">
                    {books.map((book, index) => (

                        index % 2 === 0 ? (

                            <div className="col-lg-6 col-md-12" key={book.bookId}>
                                <div className="card mb-4" style={{ backgroundColor: '#f7f7f7' }}>
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img
                                                src={"http://localhost:9091/server/image/" + book.bookId}
                                                className="img-fluid rounded-start"
                                                alt="Book Cover"
                                                style={{ width: '100%', height: '250px', objectFit: 'contain' }}
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h3 className="card-title text-start">{'Title: ' + book.title}</h3>
                                                <p className="card-text text-start">{"Author: " + book.author}</p>
                                                <p className="card-text text-start">{"Category: " + categories[book.categoryId - 1].categoryName}</p>
                                                <p className='card-text text-start'>{"Rating: " + (ratings[index] !== 0 ? ratings[index] : 'No rating yet')}</p>
                                                <div className="d-flex">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-success"
                                                        onClick={() => {
                                                            addCartHandle(book.bookId)
                                                        }}
                                                    >Add To Cart</button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-info"
                                                        onClick={() => {
                                                            viewHandle(book.bookId)
                                                        }}
                                                    >View Details</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="col-lg-6 col-md-12" key={book.bookId}>
                                <div className="card mb-4">
                                    <div className="row g-0" style={{ backgroundColor: '#f7f7f7' }}>
                                        <div className="col-md-4">
                                            <img
                                                src={"http://localhost:9091/server/image/" + book.bookId}
                                                className="img-fluid rounded-start"
                                                alt="Book Cover"
                                                style={{ width: '100%', height: '250px', objectFit: 'contain' }}
                                            />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h3 className="card-title text-start">{'Title: ' + book.title}</h3>
                                                <p className="card-text text-start">{"Author: " + book.author}</p>
                                                <p className="card-text text-start">{"Category: " + categories[book.categoryId - 1].categoryName}</p>
                                                <p className='card-text text-start'>{"Rating: " + (ratings[index] !== 0 ? ratings[index] : 'No rating yet')}</p>
                                                <div className="d-flex">
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-success"
                                                        onClick={() => {
                                                            addCartHandle(book.bookId)
                                                        }}
                                                    >Add To Cart</button>
                                                    <button
                                                        type="button"
                                                        className="btn btn-outline-info"
                                                        onClick={() => {
                                                            viewHandle(book.bookId)
                                                        }}
                                                    >View Details</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CustomerBooks

