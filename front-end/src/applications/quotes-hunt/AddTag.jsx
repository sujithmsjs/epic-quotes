import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import MyFloatingInput from "../../my-ui/MyFloatingInput";
import { MySwitch } from "../../my-ui/MySwitch";
import { axiosInstance } from "../../util/apis";

const AddTag = (event) => {

    const navigate = useNavigate();
    const [dialog, setDialog] = useState('');


    const handleAddQuote = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const newItem = {
            name: formData.get('tag'),
        };

        console.info(newItem)
        try {
            const response = await axiosInstance.post('tags', newItem);
            navigate('../tags');
        } catch (err) {
            console.info('Error', err.response.data.message);
            toast.error('Hey, Error! Man')
        }
    }

    const handleClose = () => {
        setDialog('');
    }

    const handleTagSave = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const tagName = formData.get('tagName');
        console.info('Tag save pressed', tagName);
        try {
            const response = await axiosInstance.post('tags', { name: tagName });
            setDialog('');
            toast.success(`Tag name ${tagName} created successfully.`);
        } catch (err) {
            toast.error(`Tag name ${tagName} creation failed.`);
        }
    }

    const handleCategorySave = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const catName = formData.get('categoryName');
        console.info('Tag save pressed', catName);
        try {
            const response = await axiosInstance.post('categories', { name: catName });
            setDialog('');
            toast.success(`Category name ${catName} created successfully.`);
        } catch (err) {
            toast.error(`Category name ${catName} creation failed.`);
        }
    }

    const handleBookSave = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const book = {
            title: formData.get('title'),
            author: formData.get('author'),
            isBibleBook: formData.get('isBibleBook') !== null
        }

        console.info('Saved book details: ', book);
        try {
            const response = await axiosInstance.post('books', book);
            setDialog('');
            toast.success(`Book ${book} created successfully.`);
        } catch (err) {
            toast.error(`Book ${book} creation failed.`);
        }
    }

    const handleAuthorSave = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        console.info('isBibleAuthor: ',formData.get('isBibleAuthor'));
        const author = {
            name: formData.get('name') ,
            isBibleAuthor: formData.get('isBibleAuthor') !== null
        }

        console.info('Author save pressed', author);
        try {
            const response = await axiosInstance.post('authors', author);
            setDialog('');
            toast.success(`Author name ${author} created successfully.`);
        } catch (err) {
            toast.error(`Author name ${author} creation failed.`);
        }
    }

    return (
        <div class="container mt-3">

            <AddTagDialog show={dialog === 'TAG'} onSave={handleTagSave} onHide={handleClose} />
            <AddCategoryDialog show={dialog === 'CAT'} onSave={handleCategorySave} onHide={handleClose} />
            <AddBookDialog show={dialog === 'BOOK'} onSave={handleBookSave} onHide={handleClose} />
            <AddAuthorDialog show={dialog === 'AUTHOR'} onSave={handleAuthorSave} onHide={handleClose} />


            <button type="submit" class="btn btn-warning mx-2" onClick={() => setDialog('TAG')}>Add Tag</button>
            <button type="submit" class="btn btn-primary mx-2" onClick={() => setDialog('CAT')}>AdD Category</button>
            <button type="submit" class="btn btn-info mx-2" onClick={() => setDialog('BOOK')}>Add Book</button>
            <button type="submit" class="btn btn-success mx-2" onClick={() => setDialog('AUTHOR')}>Add Author</button>
        </div>
    )
}


function AddTagDialog(props) {
    return (
        <MyDiaglog  {...props} title="Create Tag">
            <MyFloatingInput label="Tag Name" />
        </MyDiaglog>
    )
}

function AddCategoryDialog(props) {
    return (
        <MyDiaglog  {...props} title="Create Category">
            <MyFloatingInput label="Category Name" />
        </MyDiaglog>
    )
}

function AddBookDialog(props) {
    return (
        <MyDiaglog  {...props} title="Add Book">
            <MyFloatingInput label="Title" />
            <MyFloatingInput label="Author" />
            <MySwitch label="Is Bible Book" />
        </MyDiaglog>
    )
}

function AddAuthorDialog(props) {
    return (
        <MyDiaglog  {...props} title="Add Author">
            <MyFloatingInput label="Name" />
            <MySwitch label="Is Bible Author" />
        </MyDiaglog>
    )
}

export function MyDiaglog({ show, onHide, onSave, children, title = 'Undefined' }) {

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <form onSubmit={onSave}>
                <Modal.Body>
                    {children}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary">
                        Save
                    </Button>
                </Modal.Footer>
            </form>
        </Modal>
    )
}










export default AddTag;