import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";

function CustomerBooks(props) {
    const [categories, setCategories] = useState([])
    const [books, setBooks] = useState([])
    const [preview, setPreview] = useState([])

    const navigate = useNavigate()

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
                        setBooks(data)
                        //console.log(data)
                    })
                    .catch((err) => console.log(err))
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <div>
            {/* header */}
            <h2 className='text-center'>Available Books</h2>
            {/* <div className='card-group'>
                {
                    books.map((book) => (
                        <div className='card mb-3' style={{ maxWidth: 540 }}>
                            <div className='row g-0'>
                                <div className='col-md-4'>
                                    <img src={"http://localhost:9091/server/image/" + book.bookId} className='img-fluid rounded-start' alt='Book Cover' />
                                </div>
                                <div className='col-md-8'>
                                    <div className='card-body'>
                                        <h5 className='card-title'>{book.title}</h5>
                                        <p className='card-text'>{"Author: " + book.author}</p>
                                        <p className='card-text'>{"Category: " + categories[book.categoryId - 1].categoryName}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div> */}
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-lg-6'>
                        <table className='table'>
                            <tbody>
                                {
                                    books.map((book) => (
                                        <tr key={book.bookId}>
                                            <td>
                                                <div className='card mb-3' style={{ maxWidth: 540 }}>
                                                    <div className='row g-0'>
                                                        <div className='col-md-4'>
                                                            <img src={"http://localhost:9091/server/image/" + book.bookId}
                                                                className='img-fluid rounded-start' alt='Book Cover' />
                                                        </div>
                                                        <div className='col-md-8'>
                                                            <div className='card-body'>
                                                                <h5 className='card-title'>{book.title}</h5>
                                                                <p className='card-text'>{"Author: " + book.author}</p>
                                                                <p className='card-text'>{"Category: " + categories[book.categoryId - 1].categoryName}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerBooks

