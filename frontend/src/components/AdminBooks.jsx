import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AdminBooks(props) {
    const [books, setBooks] = useState([])
    const [categories, setCategories] = useState([])

    const navigate = useNavigate()
    const addBook = () => {
        navigate('/book-add')
    }
    const editBook = (bookId) => {
        navigate('/book-update/' + bookId)
    }

    const deleteBook = (bookId) => {
        if (window.confirm('Delete this item?')) {
            fetch('http://localhost:9091/server/delete/' + bookId, {
                method: 'DELETE'
            })
                .then((response) => response.json())
                .then((data) => {
                    setBooks(books.filter(book => book.bookId !== bookId));
                    console.log(data)
                })
                .catch((err) => {
                    console.log(err)
                    alert(err)
                })
        }
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
                        setBooks(data)
                        //console.log(data)
                    })
                    .catch((err) => console.log(err))
            })
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
                            <th>Title</th>
                            <th>Author</th>
                            <th>Category</th>
                            <th>Release Date</th>
                            <th>Number of pages</th>
                            <th>Copies sold</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {books.map((book) => (
                            <tr key={book.bookId}>
                                <td> {book.title} </td>
                                <td> {book.author} </td>
                                <td> {categories[book.categoryId - 1].categoryName}</td>
                                <td> {book.releaseDate} </td>
                                <td> {book.numPage} </td>
                                <td> {book.numSold}</td>
                                <td>
                                    <button className="btn btn-primary" onClick={() => {
                                        editBook(book.bookId)
                                    }}>View</button>
                                    <button className="btn btn-danger" onClick={() => {
                                        deleteBook(book.bookId)
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