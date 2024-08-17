import axios from "axios";
import { useEffect, useState } from "react";


const SelectTagList = () => {

    const [tags, setTags] = useState([]);

    useEffect(() => {

        const getAllTags = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/tags/counts2');
                console.info(response.data);
                setTags(response.data)
            } catch (err) {
                console.error('Error', err);
            }

        }

        getAllTags();
    }, [])

    return <div class="mb-3">
        <label class="form-label d-block">Tags</label>

        {
            tags.map(tag => <div class="form-check form-check-inline" key={tag.id}>
                <input class="form-check-input" type="checkbox" name='tags' value={tag.id} id="tag1" />
                <label class="form-check-label" for="tag1">{tag.name}</label>
            </div>)
        }


    </div>;

}

export default SelectTagList;