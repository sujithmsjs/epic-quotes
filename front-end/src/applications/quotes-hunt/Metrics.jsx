import { useEffect, useState } from "react";
import TagsList from "./TagsList";
import axios from "axios";
import MyFloatingInput from "../../my-ui/MyFloatingInput";
import BarCard from './BarCard'
import { axiosInstance, deleteQuote, getAllQuotes, getMetrics } from "../../util/apis";
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
import MetricsSearchBar from "./MetricsSearchBar";

const Metrics = () => {

    const { showConfirmDialog } = useConfirmDialog();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [searchData, setSearchData] = useState({
        groupBy: "tags",
        sortBy: "name",
        sortOrder: "ASC"
    });

    const refreshQuotesList = async (searchData) => {
        const data = await getMetrics(searchData);
        setData(data);
    }

    useEffect(() => {
        setSearchData({
            groupBy: "tags",
            sortBy: "count",
            sortOrder: "DESC"
        })
    }, [])

    useEffect(() => {
        refreshQuotesList(searchData);
    }, [searchData])

    return (<div className="container mt-3">
        {
            <>
                {/* <SearchBar searchData={searchData} setSearchData={setSearchData} /> */}
                <MetricsSearchBar searchData={searchData} setSearchData={setSearchData} />
                {
                    <table class="table">
                        <thead class="thead-dark">
                            <tr>
                                <th scope="col">Tag</th>
                                <th scope="col">Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map(t => <tr key={t._id}>
                                    <th scope="row">{t._id}</th>
                                    <td>{t.count}</td>
                                </tr>)
                            }

                        </tbody>
                    </table>
                }
            </>
        }
    </div>)
}

export default Metrics;