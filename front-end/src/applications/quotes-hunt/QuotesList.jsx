import { useEffect, useState } from "react";
import TagsList from "./TagsList";
import axios from "axios";
import MyFloatingInput from "../../my-ui/MyFloatingInput";
import BarCard from './BarCard'
import { axiosInstance, deleteQuote, getAllQuotes } from "../../util/apis";
import { useConfirmDialog } from "../../context/ConfirmDialogContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faGear, faReply, faTrash, faPen, faEye, faLink } from '@fortawesome/free-solid-svg-icons';
import PageSizeSetter from "./PageSizeSetter";
import PageNumberSelector from "./PageNumberSelector";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import MyFloatingTextarea from "../../my-ui/MyFloatingTextarea";
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import SearchBar from "./SearchBar";
import SearchBarV2 from "./SearchBarV2";
import PaginationV2 from "./PaginationV2";
import { toJsonString } from "../../util/utility";

const QuotesList = () => {

    const { showConfirmDialog } = useConfirmDialog();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [editDialogId, setEidtDialogId] = useState(0);
    const [searchData, setSearchData] = useState({ "pageSize": 10, "pageNo": 0 });


    const refreshQuotesList = async (searchData) => {
        const data = await getAllQuotes(searchData);
        setData(data);
    }

    useEffect(() => {
        setSearchData({ "pageSize": 10, "pageNo": 0 })
    }, [])

    useEffect(() => {
        refreshQuotesList(searchData);
    }, [searchData])





    const handleDelete = async (id) => {
        let flag = await showConfirmDialog('Confirm delete', 'Do you want to really delete?');
        if (flag) {
            await deleteQuote(id);
            refreshQuotesList(searchData);
        }
    }

    const handleAddingSimilarQuote = async (data) => {
        console.info('Saved similar quote data : ', data);
        setEidtDialogId(0);
    }

    const quotes = data.content;

    return (<div class="container mt-3">

        {/* <div className="my-3 p-5 border">
            <h1>Blockquotes</h1>
            <p>The blockquote element is used to present content from another source:</p>
            <TagsList />
            <MyFloatingInput label='Quote Search' />
        </div> */}



        {
            <>
                {/* <SearchBar searchData={searchData} setSearchData={setSearchData} /> */}
                <SearchBarV2 searchData={searchData} setSearchData={setSearchData} />

                <pre>
                    <h6>{toJsonString(searchData)}</h6>
                </pre>

                <table class="table table-hover">

                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Quote</th>
                            <th>Type</th>
                            <th>Book</th>
                            {
                                searchData.type === 'BIBLE' && <>
                                    <th>C</th>
                                    <th>V</th>
                                </>
                            }
                            <th>Author</th>
                            <th>Cat</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            quotes?.map(quote => <tr key={quote.id}>
                                <td>{quote.id}</td>
                                <td> <pre> <h6>{quote.quote}</h6></pre></td>
                                <td>{quote.type}</td>
                                <td>{quote.book}</td>
                                {
                                    searchData.type === 'BIBLE' && <>
                                        <td>{quote.chapter}</td>
                                        <td>{quote.verse}</td>
                                    </>
                                }
                                <td>{quote.author}</td>
                                <td>{quote.category}</td>
                                <td>

                                    <button className="btn btn-outline-warning" onClick={() => { navigate(`add/${quote.id}`) }}>
                                        <FontAwesomeIcon icon={faPen} />
                                    </button>
                                    <button className="btn btn-outline-danger mx-1" onClick={() => handleDelete(quote.id)}  >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                    <button className="btn btn-outline-info" onClick={() => setEidtDialogId(quote.id)}>
                                        <FontAwesomeIcon icon={faLink} />
                                    </button>

                                </td>
                            </tr>)
                        }


                    </tbody>
                </table>
            </>
        }
        <AddBookDialog show={editDialogId !== 0} editDialogId={editDialogId} onSave={handleAddingSimilarQuote} onHide={() => setEidtDialogId(0)} />
        {/* <Pagination
            pageSize={searchData.pageSize}
            totalPages={data.totalPages}
            currentPage={data.number}
            onPageSizeChange={handlePageSizeChange}
            onPageChange={handlePageChange}
        /> */}

        <PaginationV2
            searchData={searchData}
            pageSize={searchData.pageSize}
            totalPages={data.totalPages}
            currentPage={data.number}
            setSearchData={setSearchData}
        />

    </div>)
}

export default QuotesList;


function AddBookDialog(props) {
    const form = useForm();

    const { register, control, handleSubmit, reset, getValues, formState } = form;
    const { errors, isDirty, isValid } = formState;


    useEffect(() => {
        console.info('USE Effect Eidt dialog ID: ', props.editDialogId);
        reset({ similarQuote: props.editDialogId })
    }, [props.editDialogId])


    const handleOnHide = () => {
        props.onHide();
        reset()
        console.info('Inside onHide funciton.');
    }

    const onSave = async (data) => {
        reset();
        console.info(data);
        data.similarQuotes = [data.similarQuote];
        try {
            const response = await axiosInstance.post('quotes/add-similar', data);
            console.info(response.data)
            toast.success('Similar quote added successfully');
        } catch (error) {
            toast.error('Similar quote adding failed');
        }
        props.onHide();
    }

    return (
        <MyLargeDiaglog  {...props} onHide={handleOnHide} title="Add Book" onSave={handleSubmit(onSave)}>
            <MyFloatingInput label="Similar Quote" register={register} />
            <MyFloatingTextarea label="Quote" register={register} />
            <MyFloatingInput label="Author" register={register} />
        </MyLargeDiaglog>
    )
}

function MyLargeDiaglog({ show, onHide, onSave, children, title = 'Undefined' }) {

    return (
        <Modal show={show} onHide={onHide} size="lg">
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