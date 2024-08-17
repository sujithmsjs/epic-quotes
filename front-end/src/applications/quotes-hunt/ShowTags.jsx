import { useEffect, useState } from "react";
import TagsList from "./TagsList";
import axios from "axios";


const ShowTags = () => {


    const [quotes, setQuotes] = useState([]);

    useEffect(() => {

        const getAllTags = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/tags');
                console.info(response.data);
                setQuotes(response.data)
            } catch (err) {
                console.error('Error', err);
            }

        }

        getAllTags();
    }, [])


    return (<div class="container mt-3">
        <TagsList />
    </div>)

}

export default ShowTags;