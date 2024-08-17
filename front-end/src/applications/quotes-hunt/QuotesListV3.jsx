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
import MyFieldSelect from "../../my-ui/MyFieldSelect";

const QuotesListV3 = () => {

    const { showConfirmDialog } = useConfirmDialog();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [editDialogId, setEidtDialogId] = useState(0);
    const [searchData, setSearchData] = useState({ "pageSize": 10, "pageNo": 0 });
    const [categories, setCategories] = useState([])

    const refreshQuotesList = async (searchData) => {
        const data = await getAllQuotes(searchData);
        setData(data);
    }

    const getAllCats = async () => {
        try {
            const response = await axiosInstance.get('categories');
            console.info(response.data);
            setCategories([{ id: 0, name: "" }, ...response.data]);
        } catch (err) {
            console.info('Error', err);
        }
    }

    useEffect(() => {
        getAllCats();
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

    const handleCategorChange = async (category, quoteId) => {
        console.info(`Cat ${category} Qoute: ${quoteId}`);
        try {
            const response = await axiosInstance.patch(`quotes/category/${quoteId}`, { category });

            console.info(response.data);
            toast.success('Category updated successfully!');
        } catch (err) {
            console.info('Error', err);
            toast.error('Category updating failed!');
        }
    }

    const handleCategorySave = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const catName = formData.get('categoryName');
        console.info('Tag save pressed', catName);

    }

    const handleCategorNameChange = async (event, quoteId) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const category = formData.get('category');
        const cats = categories.filter(c => c.name === category)
        console.info('Cats: ', cats);
        if (cats.length === 0) {
            // Create new Category!
            try {
                const response = await axiosInstance.post('categories', { name: category });
                console.info('New cat value: ', response.data);
                setCategories(prevCats => [...prevCats, {id : response.id, name : category}])
            } catch (err) {
                toast.error(`Category name ${category} creation failed.`);
            }
        }

        try {
            const response = await axiosInstance.patch(`quotes/category/${quoteId}`, { category });
            console.info(response.data);
            toast.success(`Category ${category} applied to ${quoteId}`);
        } catch (err) {
            console.info('Error', err);
            toast.error(`Category ${category} appling to ${quoteId} is failed`);
        }

        
        console.info(quoteId + ' : ' + category);
    }


    const quotes = data.content;

    console.info('Data: ', categories);
    return (<div className="container mt-3">

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

                {
                    quotes?.map(quote =>
                        <div key={quote.id} className="card my-3">

                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    <h3>{quote.quote}</h3>
                                    <footer className="blockquote-footer">{` ${quote.type === 'BIBLE' ? `${quote.book} ${quote.chapter}:${quote.verse}` : quote.author} `}</footer>
                                    <footer className="blockquote-footer">{quote.tags?.join(", ")}</footer>

                                </blockquote>
                            </div>
                            <div className="card-footer">
                                <div className="row justify-content-start">
                                    <div className="col-sm-2">

                                        <button className="btn btn-outline-warning" onClick={() => { navigate(`add/${quote.id}`) }}>
                                            <FontAwesomeIcon icon={faPen} />
                                        </button>
                                        <button className="btn btn-outline-danger mx-1" onClick={() => handleDelete(quote.id)}  >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                        <button className="btn btn-outline-info" onClick={() => setEidtDialogId(quote.id)}>
                                            <FontAwesomeIcon icon={faLink} />
                                        </button>
                                    </div>
                              
                                    <div className="col-sm-3">

                                        {/* <select className="form-control" defaultValue={quote.category} onChange={(event) => handleCategorChange(event.target.value, quote.id)}>
                                            {
                                                categories.map(c => <option value={c.name} key={c.id}>{c.name}</option>)
                                            }
                                        </select>
                                    </div>

                                    <div className="col-sm-3"> */}

                                        <form onSubmit={(e) => handleCategorNameChange(e, quote.id)}>
                                            <div class="input-group">
                                                <input class="form-control"
                                                    name="category"
                                                    list="GFGOptions"
                                                    id="GFGDataList"
                                                    placeholder="Select option"
                                                    defaultValue={quote.category} />
                                                <button class="btn btn-outline-secondary" type="submit" id="button-addon2" >Set</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>)
                }

                <datalist id="GFGOptions" >
                    {
                        categories.map(c => <option value={c.name} key={c.id}>{c.name}</option>)
                    }
                </datalist>


            </>
        }

        <AddBookDialog show={editDialogId !== 0} editDialogId={editDialogId} onSave={handleAddingSimilarQuote} onHide={() => setEidtDialogId(0)} />

        <PaginationV2
            //pageSize={searchData.pageSize}
            searchData={searchData}
            totalPages={data.totalPages}
            currentPage={data.number}
            setSearchData={setSearchData}
        />


    </div>)
}

export default QuotesListV3;


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