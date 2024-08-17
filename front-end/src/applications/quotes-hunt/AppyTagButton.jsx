import React from 'react'
import { toast } from 'react-toastify';
import { axiosInstance } from '../../util/apis';

const AppyTagButton = ({ searchData }) => {

    const handleApplyTag = async (event) => {
        event.preventDefault();
        console.info('SearchData: ', searchData);


        const formData = new FormData(event.target);
        try {
            const tagName = formData.get('tag');
            console.info('tagName: ', tagName);


            const response = await axiosInstance.patch(`quotes/v2/add-tag/${tagName}`, searchData);
            console.info(response.data);
            const { matchedCount, modifiedCount } = response.data;
            toast.success(`Tag Added successfully! ${modifiedCount}/${matchedCount}`);
        } catch (err) {
            console.info('Error', err);
            toast.error('Category updating failed!');
        }
    }

    return (
        <form onSubmit={handleApplyTag}>
            <div class="input-group">
                <input type="text" class="form-control" name="tag" placeholder="Tag Name" aria-label="Recipient's username" aria-describedby="button-addon2" />
                <button class="btn btn-outline-secondary" type="submit" id="button-addon2" >Add Tag To Search Results</button>
            </div>
        </form>
    )
}

export default AppyTagButton