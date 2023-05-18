import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminBooks(props) {
    const [books, setBooks] = useState([])

    const navigate = useNavigate()
    const addBook = () => {
        navigate('/book-add')
    }
    const editBook = (bookcode) => {
        navigate('/book-update/' + bookcode)
    }

    const deleteBook = (bookcode) => {
        fetch('http://localhost:8080/api/delete/' + bookcode, {
            method: 'DELETE'
        })
            .then((response) => response.json())
            .then((data) => {
                setBooks(books.filter(book => book.bookcode !== bookcode));
                console.log(data)
            })
            .catch((err) => {
                console.log(err)
                alert('error')
            })
    }
    useEffect(() => {
        fetch('http://localhost:8080/server/books')
            .then((response) => response.json())
            // .then((data) => console.log(data))
            .then((data) => setBooks(data))
            .catch((err) => console.log(err))
    }, [])

    return (
        <div>
            <div class="header">
                This is header
            </div>
            <h2 className="text-center">Books List</h2>
            <div className="row">
                <button className="btn btn-primary" onClick={addBook}>
                    Add Book
                </button>
            </div>
            <div className="row">
                <table className="table table-striped table-bordered mb-0">
                    <thead>
                        <tr>
                            <th>BookCode</th>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Release Date</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {books.map((book) => (
                            <tr key={book.bookId}>
                                <td> {book.bookId} </td>
                                <td> {book.title} </td>
                                <td> {book.author} </td>
                                <td> {book.releaseDate} </td>
                                <td> {book.price} </td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => {
                                        editBook(book.bookcode)
                                    }}>View</button>
                                    <button className="btn btn-danger" onClick={() => {
                                        deleteBook(book.bookcode)
                                    }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminBooks;