import { useEffect, useState } from "react";
import TagsList from "./TagsList";
import axios from "axios";
import MyFloatingInput from "../../my-ui/MyFloatingInput";
import BarCard from './BarCard'
import { axiosInstance, deleteQuote, getAllQuotes } from "../../util/apis";
import { useConfirmDialog } from "../../context/ConfirmDialogContext";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faGear, faReply, faTrash, faPen, faEye } from '@fortawesome/free-solid-svg-icons';
import PageSizeSetter from "./PageSizeSetter";
import PageNumberSelector from "./PageNumberSelector";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import MyFloatingSelect from "../../my-ui/MyFloatingSelect";
import { toast } from 'react-toastify';

const defaultSearchData = {
    type: "BIBLE",
    book: "Proverbs",
    pageNo: 0,
    pageSize: 10,
    sortBy: "verse",
    chapter: 10,
    sortOrder: "ASC"
}

const Proverbs = () => {

    const { showConfirmDialog } = useConfirmDialog();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [searchData, setSearchDate] = useState(defaultSearchData);
    const [categories, setCategories] = useState([])

    const refreshQuotesList = async (searchData) => {
        const data = await getAllQuotes(searchData);
        setData(data);
    }

    useEffect(() => {
        setSearchDate(defaultSearchData);
        getAllCats();
    }, [])

    useEffect(() => {
        refreshQuotesList(searchData);
    }, [searchData])

    const handlePageChange = async (pageNo) => {
        setSearchDate(prev => ({ ...prev, pageNo }));
    }

    const handlePageSizeChange = async (pageSize) => {
        setSearchDate(prev => ({ ...prev, pageSize, pageNo: 0 }));
    }

    const getAllCats = async () => {
        try {
            const response = await axiosInstance.get('categories');
            console.info(response.data);
            setCategories([{ id: 0, name: ""},...response.data]);
        } catch (err) {
            console.info('Error', err);
        }
    }

    const handleDelete = async (id) => {
        let flag = await showConfirmDialog('Confirm delete', 'Do you want to really delete?');
        if (flag) {
            await deleteQuote(id);
            refreshQuotesList(searchData);
        }
    }

    const handleChapterChange = (event) => {
        setSearchDate(prev => ({ ...prev, chapter: event.target.value }));
        console.info(event.target.value);
    }

    const handleCategorChange = async (category, quoteId) => {
        console.info(`Cat ${category} Qoute: ${quoteId}`);
        try {
            const response = await axiosInstance.patch(`quotes/category/${quoteId}`, {category});
            
            console.info(response.data);
            toast.success('Category updated successfully!');
        } catch (err) {
            console.info('Error', err);
            toast.error('Category updating failed!');
        }
    }

    const quotes = data.content;

    return (<div class="container mt-3">
        <div className="row justify-content-start">
            <div className="col-md-1">
                <label for="exampleFormControlInput1" class="form-label">Chapter</label>
            </div>
            <div className="col-md-1">
                <select class="form-control" onChange={handleChapterChange}>
                    {
                        Array.from({ length: 31 }, (_, i) => i + 1).map(i => <option key={i}>{i}</option>)
                    }
                </select>
            </div>

        </div>

        {/* <div className="my-3 p-5 border">
            <h1>Blockquotes</h1>
            <p>The blockquote element is used to present content from another source:</p>
            <TagsList />
            <MyFloatingInput label='Quote Search' />
        </div> */}



        {
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Quote</th>
                        <th>Chapter</th>
                        <th>Verse</th>
                        <th>Category</th>
                        <th>Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        quotes?.map(quote => <tr key={quote.id}>
                            <td>{quote.id}</td>
                            <td>{quote.quote}</td>

                            <td>{quote.chapter}</td>
                            <td>{quote.verse}</td>
                            <td>
                                <select class="form-control" value={quote.category} onChange={(event) => handleCategorChange(event.target.value, quote.id)}>
                                    {
                                        categories.map(c => <option value={c.name} key={c.id}>{c.name}</option>)
                                    }
                                </select>
                            </td>
                            <td>

                                <button className="btn btn-outline-warning" onClick={() => { navigate(`../add/${quote.id}`) }}>
                                    <FontAwesomeIcon icon={faPen} />
                                </button>
                                <button className="btn btn-outline-danger mx-1" onClick={() => handleDelete(quote.id)}  >
                                    <FontAwesomeIcon icon={faTrash} />
                                </button>
                                <button className="btn btn-outline-info">
                                    <FontAwesomeIcon icon={faEye} />
                                </button>

                            </td>
                        </tr>)
                    }


                </tbody>
            </table>
        }
        <Pagination
            pageSize={searchData.pageSize}
            totalPages={data.totalPages}
            currentPage={data.number}
            onPageSizeChange={handlePageSizeChange}
            onPageChange={handlePageChange}
        />

    </div>)

    // return (<div class="container mt-3">
    //     <SelectTagList />
    //     <h1>Blockquotes</h1>
    //     <p>The blockquote element is used to present content from another source:</p>
    //     {
    //         quotes.map(quote => <blockquote class="blockquote my-5">
    //             <h2 className="display-4">{quote.quote}</h2>

    //             <footer class="blockquote-footer">{quote.author}</footer>
    //             <small>{quote.tags.map(t => t.name).join(', ')}</small>

    //         </blockquote>)
    //     }
    // </div>)

}

export default Proverbs;