import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const CustomerBookDetails = () => {
    const navigate = useNavigate()

    const { activeUser } = useContext(AuthContext)

    const [preview, setPreview] = useState();
    const [bookid, setBookId] = useState(-1)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [desc, setDesc] = useState('')
    const [date, setDate] = useState('')
    const [catId, setCatId] = useState(-1)
    const [pageNum, setPageNum] = useState(0)

    const [rating, setRating] = useState(0.0)
    const [comment, setComment] = useState('')

    const [reviews, setReviews] = useState([])

    const [render, setRender] = useState(false)

    let { bookId } = useParams();

    const backHandler = () => {
        navigate('/')
    }

    const postReviewHandle = () => {
        var reviewForm = new FormData()
        reviewForm.append('id', -1)
        reviewForm.append('username', activeUser)
        reviewForm.append('bookId', bookid)
        reviewForm.append('comment', comment)
        reviewForm.append('rating', rating)

        fetch('http://localhost:9091/server/add-review', {
            method: 'POST',
            body: reviewForm
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.response === 'Success!')
                    navigate('/book/' + bookid)
                else
                    window.alert(data.response)
            })
    }

    const deleteReviewHandle = (id) => {
        fetch('http://localhost:9091/server/delete-review/' + id, {
            method: 'DELETE'
        })
            .then((response) => response.json())
            .then((data) => {
                window.alert(data.response)
                setRender(!render)
            })
    }

    const setBookData = (book) => {
        setBookId(book.bookId)
        setTitle(book.title)
        setAuthor(book.author)
        setDesc(book.description)
        setPageNum(book.numPage)
        setDate(book.releaseDate)
        setCatId(book.categoryId)
        setPreview("http://localhost:9091/server/image/" + bookId)
    }

    useEffect(() => {
        fetch("http://localhost:9091/server/select/" + bookId, {
            method: 'GET'
        })
            .then((response) => response.json())
            // .then((data) => console.log(data))
            .then((data) => {
                setBookData(data);
                console.log(bookid)
                fetch('http://localhost:9091/server/review/' + data.bookId, {
                    method: 'GET'
                })
                    .then((res) => res.json())
                    .then((dataa) => {
                        console.log(dataa)
                        setReviews(dataa)
                    })
            })
            .catch((err) => console.log(err));


    }, [render])

    function formatTimestamp(timestamp) {
        const date = new Date(timestamp); // Create a Date object from the SQL timestamp
        // Format the date into a desired string representation (e.g., using toLocaleString())
        const formattedDate = date.toLocaleString();

        return formattedDate;
    }

    return (
        <div class="container my-5">
            <button type="submit" class="btn btn-outline-secondary mb-4" onClick={backHandler}>Back</button>
            <form>
                <div class="row gx-5">
                    {/* <!-- Book detail --> */}
                    <div class="col col-12 col-md-8">
                        {/* <!-- Title & Author input --> */}
                        <div class="row mb-4">
                            <div class="col">
                                <div class="form-outline">
                                    <label class="form-label" for="title">
                                        Tiêu đề
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        class="form-control"
                                        // value={book?.title}
                                        value={title}
                                        required
                                        disabled
                                    />
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-outline">
                                    <label class="form-label" for="author">
                                        Tác giả
                                    </label>
                                    <input
                                        type="text"
                                        id="author"
                                        class="form-control"
                                        required
                                        value={author}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        {/* <!-- Description input --> */}
                        <div class="form-outline mb-4">
                            <label class="form-label" for="description">
                                Mô tả về sách
                            </label>
                            <textarea
                                id="description"
                                class="form-control"
                                rows="4"
                                value={desc}
                                disabled
                            ></textarea>
                        </div>

                        {/* <!-- Release date & Page number input --> */}
                        <div class="row mb-4">
                            <div class="col">
                                <div class="form-outline">
                                    <label class="form-label" for="release-date">
                                        Ngày phát hành
                                    </label>
                                    <input
                                        type="date"
                                        id="release-date"
                                        class="form-control"
                                        required
                                        value={date}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div class="col">
                                <div class="form-outline">
                                    <label class="form-label" for="page-number">
                                        Số trang
                                    </label>
                                    <input
                                        type="text"
                                        id="page-number"
                                        class="form-control"
                                        required
                                        value={pageNum}
                                        disabled
                                    />
                                </div>
                            </div>
                        </div>

                        {/* <!-- Category select --> */}
                        <div class="row mb-4">
                            <div class="col col-6">
                                <label class="form-label" for="category">
                                    Thể loại
                                </label>
                                <select
                                    class="form-select"
                                    id="category"
                                    aria-label="Floating label select example"
                                    disabled
                                    value={catId}
                                >
                                    <option selected>Open this select menu</option>
                                    <option value="1">Romance</option>
                                    <option value="2">Cookbook</option>
                                    <option value="3">Health</option>
                                    <option value="4">Science Fiction</option>
                                    <option value="5">History</option>
                                    <option value="6">Education</option>
                                    <option value="7">Kid</option>

                                </select>
                            </div>
                        </div>
                    </div>

                    {/* <!-- Upload file --> */}
                    <div class="col col-12 col-md-4">
                        <div class="d-flex flex-column justify-content-center">
                            {/* <!-- File container --> */}
                            <div
                                style={{ maxHeight: "400px", display: 'flex', justifyContent: 'center', alignContent: 'center' }}
                                class="img-fluid rounded border"
                            >
                                <img
                                    src={preview}
                                    title="image"
                                    class="img-fluid"
                                    id="demo-image"
                                    style={{ maxHeight: "400px" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Divider --> */}
                <hr />

                {/* <!-- Footer --> */}

                {/* <div class="d-flex justify-content-end">
                    <input type="number" min="1" max="5" placeholder="Enter score" />
                    <textarea placeholder="Enter review"></textarea>
                    <button class="btn btn-primary">Submit</button>
                </div> */}
                <form>
                    <div className="d-flex align-items-center">
                        <div className="d-flex flex-row mt-2">
                            {[1, 2, 3, 4, 5].map((id) => (
                                <span
                                    key={id}
                                    style={{
                                        marginRight: "5px",
                                        color: id > rating ? "#c0c0c0" : "orange",
                                        cursor: "pointer",
                                    }}
                                    className="fa fa-star"
                                    onClick={() => {
                                        setRating(id);
                                    }}
                                ></span>
                            ))}
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="comment">Your comment</label>
                        <textarea
                            className="form-control"
                            id="comment"
                            value={comment}
                            maxLength={200}
                            onChange={(e) => setComment(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <div className="d-flex align-items-center">
                        <button
                            className="btn btn-primary ms-auto mb-5 mt-2"
                            onClick={postReviewHandle}
                            disabled={comment.trim() === ""}
                        >
                            Send
                        </button>
                    </div>
                </form>
                <div className="container" style={{ padding: "40px 20px", marginTop: -50 }}>
                    {reviews.map((review) => (
                        <div className="card mb-3" key={review.id}>
                            <div className="card-body">
                                <div className="d-flex align-items-center">
                                    <img
                                        src="https://taytou.com/wp-content/uploads/2022/08/Hinh-anh-Avatar-trang-tron-nen-xam-don-gian.png"
                                        alt="Remy Sharp"
                                        className="rounded-circle me-3"
                                        style={{
                                            width: 50,
                                            height: 50
                                        }}
                                    />
                                    <div className="d-flex align-items-center">
                                        <span
                                            className="me-2 font-weight-bold"
                                            style={{
                                                textAlign: "left",
                                            }}
                                        >
                                            {activeUser === review.username ? "You" : review.username}
                                        </span>
                                        <span className="badge bg-primary">{review.rating} / 5</span>
                                        <span className='ms-2'
                                            style={{ opacity: 0.5, fontSize: '0.8em' }}>{formatTimestamp(review.createdAt)}</span>
                                    </div>
                                </div>
                                <div
                                    style={{
                                        textAlign: "left",
                                        marginLeft: 65,
                                        marginTop: 10,
                                    }}>{review.comment}</div>
                            </div>
                            {
                                review.username === activeUser && (
                                    <button
                                        className="btn btn-outline-danger position-absolute top-0 end-0 mt-3 me-2"
                                        onClick={() => {
                                            deleteReviewHandle(review.id)
                                        }}
                                    >Delete</button>
                                )
                            }
                        </div>
                    ))}
                </div>
            </form>
        </div>
    )
}

export default CustomerBookDetails