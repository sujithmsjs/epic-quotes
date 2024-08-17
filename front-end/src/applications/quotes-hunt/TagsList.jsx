import axios from "axios";
import { useEffect, useState } from "react";


const TagsList = () => {

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

        {/* {
            tags.map(tag => <div class="form-check form-check-inline" key={tag.id}>
                <input class="form-check-input" type="checkbox" name='tags' value={tag.id} id="tag1" />
                <label class="form-check-label" for="tag1">{tag.name}</label>
                <label class="form-check-label" for="tag1">{tag.count}</label>
            </div>)
        } */}

        <div class="d-flex flex-row flex-wrap justify-content-center">
            {
                tags.map(
                    tag => <div class="card m-2" style={{width: '10rem'}}>
                    <div class="card-body text-center">
                        <h5 class="card-title">{tag.name}</h5>
                        <h2 class="card-text">{tag.count}</h2>
                    </div>
                </div>
                )
            }
            
        </div>

    </div>;

}

export default TagsList;