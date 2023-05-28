import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

function CustomerBooks(props) {
    const [categories, setCategories] = useState([])
    const [books, setBooks] = useState([])
    const [ratings, setRatings] = useState([])
    let tratings = []

    const navigate = useNavigate()

    const viewHandle = (bookId) => {
        navigate('/book/' + bookId)
    }

    const getRating = (bookId) => {
        console.log(bookId)
        fetch('http://localhost:9091/server/rating/' + bookId, {
            method: 'GET'
        })
            .then((res) => res.json())
            .then((dataa) => {
                console.log(dataa)
                return dataa;
            })
    }

    const addCartHandle = (e) => {
        e.preventDefault()
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
                                                        class="btn btn-outline-success"
                                                        onClick={() => {

                                                        }}
                                                    >Add To Cart</button>
                                                    <button
                                                        type="button"
                                                        class="btn btn-outline-info"
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
                                                        class="btn btn-outline-success"
                                                        onClick={() => { }}
                                                    >Add To Cart</button>
                                                    <button
                                                        type="button"
                                                        class="btn btn-outline-info"
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

