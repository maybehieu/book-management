import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const AdminBookDetail = ({ add }) => {
    // add image preview
    const [selectedFile, setSelectedFile] = useState();
    // update image preview
    const [imageUrl, setImageUrl] = useState()
    const [preview, setPreview] = useState();
    const [saveBtn, setSaveBtn] = useState('Add');
    const [editState, setEditState] = useState(false)

    let editEnable = false;

    // book properties
    const [book, setBook] = useState({
        'bookId': -1,
        'title': '',
        'author': '',
        'description': '',
        'releaseDate': '',
        'categoryId': -1,
        'price': 0,
        'pageNum': 0,
        'imageFile': undefined,
        'imagePath': ''
    });
    const [bookid, setBookId] = useState(-1)
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [desc, setDesc] = useState('')
    const [date, setDate] = useState('')
    const [catId, setCatId] = useState(-1)
    const [price, setPrice] = useState(0)
    const [pageNum, setPageNum] = useState(0)
    const [numSold, setNumSold] = useState(0)
    const [imageFile, setImageFile] = useState()
    const [imagePath, setImagePath] = useState('')

    let { bookId } = useParams();

    const dummyFile = new File(["foo"], "null.txt", {
        type: "text/plain",
    });

    const setBookData = (book) => {
        setBookId(book.bookId)
        setTitle(book.title)
        setAuthor(book.author)
        setDesc(book.description)
        setPageNum(book.numPage)
        setNumSold(book.numSold)
        setDate(book.releaseDate)
        setCatId(book.categoryId)
        setPreview("http://localhost:9091/server/image/" + bookId)
    }

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (add) {
            setEditState(true)
            editEnable = true;
            setSaveBtn('Add')
            console.log('adding new book')
            // adding new book
            // image uploading handler
            if (!selectedFile) {
                setPreview(undefined);
                return;
            }
            const objectUrl = URL.createObjectURL(selectedFile);
            setPreview(objectUrl);
        } else {
            // view book in database
            setSaveBtn('Edit')
            setBookId(bookId)
            fetch("http://localhost:9091/server/select/" + bookId, {
                method: 'GET'
            })
                .then((response) => response.json())
                // .then((data) => console.log(data))
                .then((data) => {
                    setBook(data);
                    setBookData(data);
                })
                .catch((err) => console.log(err));
            // get cover preview
            // fetch("http://localhost:9091/server/image/" + bookId)
            //     .then((response) => {
            //         // const objectUrl = URL.createObjectURL(response);
            //         console.log(response)
            //         setPreview(response);
            //     })
            //     .catch((err) => console.log(err))
            // if (imagePath != '') {
            //     const objectUrl = URL.createObjectURL(imagePath);
            //     setPreview(objectUrl);
            // }

        }
    }, [selectedFile]);

    const onSelectFile = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(e.target.files[0]);
        setImageFile(e.target.files[0]);
        //console.log(e.target.files[0])
    }

    const navigate = useNavigate()

    const saveHandler = (e) => {
        e.preventDefault()
        if (editState == true) {
            console.log('update btn called')
            var bookform = new FormData()
            bookform.append('bookId', bookid)
            bookform.append('title', title)
            bookform.append('author', author)
            bookform.append('description', desc)
            bookform.append('releaseDate', date)
            bookform.append('categoryId', catId)
            // bookform.append('price', price)
            bookform.append('numPage', pageNum)
            // empty image bypass 
            if (imageFile == undefined) {
                bookform.append('imageFile', dummyFile)
            }
            bookform.append('imageFile', imageFile)

            //console.log(bookid, title, author, desc, date, catId, pageNum, imageFile)
            //console.log(bookform)
            if (bookid != -1) {
                fetch('http://localhost:9091/server/update', {
                    method: 'POST',
                    body: bookform
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data)
                        if (data.response === 'Update book successful!') {
                            navigate('/')
                        } else {
                            // display error popup
                            alert(data.response)
                        }
                    })
            }
            else if (bookid == -1) {
                fetch('http://localhost:9091/server/save', {
                    method: 'POST',
                    body: bookform
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data)
                        if (data.response === 'Save book successful!') {
                            navigate('/')
                        } else {
                            // display error popup
                            alert(data.response)
                        }
                    })
            }

        } else {
            setEditState(true);
            editEnable = true;
            console.log('set edit on')
            setSaveBtn('Save')
            return;
        }
    }

    const updateHandler = () => {

    }

    const deleteHandler = () => {

    }

    const backHandler = () => {
        alert('Going back without saving changes?')
        navigate('/')
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
                                        onChange={(event) => { setTitle(event.target.value) }}
                                        disabled={(editState) ? "" : "disabled"}
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
                                        onChange={(event) => { setAuthor(event.target.value) }}
                                        disabled={(editState == true) ? "" : "disabled"}
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
                                onChange={(event) => { setDesc(event.target.value) }}
                                disabled={(editState) ? "" : "disabled"}
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
                                        onChange={(event) => { setDate(event.target.value) }}
                                        disabled={(editState) ? "" : "disabled"}
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
                                        onChange={(event) => { setPageNum(event.target.value) }}
                                        disabled={(editState) ? "" : "disabled"}
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
                                    onChange={(event) => { setCatId(event.target.value) }}
                                    disabled={(editState) ? "" : "disabled"}
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
                            {/* <!-- Choose file button --> */}
                            <input type="file" id="upload"
                                hidden
                                onChange={onSelectFile}
                                disabled={(editState) ? "" : "disabled"} />
                            <label for="upload" class="btn btn-outline-secondary mb-4">
                                Choose file
                            </label>
                            {/* <!-- File container --> */}
                            <div
                                style={{ height: "400px" }}
                                class="overflow-hidden rounded border"
                            >
                                <img
                                    src={preview}
                                    title="image"
                                    class="img-fluid"
                                    id="demo-image"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <!-- Divider --> */}
                <hr />

                {/* <!-- Footer --> */}

                <div class="d-flex justify-content-end">
                    {/* <!-- Submit button --> */}
                    <div class="btn-group">
                        <button type="submit" class="btn btn-outline-secondary mb-4" onClick={saveHandler}>
                            {saveBtn}
                        </button>
                        {/* <button type="submit" class="btn btn-outline-secondary mb-4">
                            Add
                        </button>
                        <button type="submit" class="btn btn-outline-secondary mb-4">
                            Save
                        </button> */}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AdminBookDetail;
