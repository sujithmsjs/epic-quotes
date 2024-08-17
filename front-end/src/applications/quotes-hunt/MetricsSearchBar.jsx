import React, { useEffect, useState } from 'react'
import MyAwaitInput from '../../my-ui/MyAwaitInput'
import MyFieldSelect from '../../my-ui/MyFieldSelect'
import MyFloatingInput from '../../my-ui/MyFloatingInput'
import MyFloatingSelect from '../../my-ui/MyFloatingSelect'
import { axiosInstance } from '../../util/apis'
import AppyTagButton from './AppyTagButton'
import TagSelector from './TagSelector'

const MetricsSearchBar = ({ searchData, setSearchData }) => {

    const handleAnySelectChange = (event) => {
        // Get the name attribute and selected value
        const value = event.target.value;
        if (value === 'ALL' || value === 'None' || value === 'DEFAULT') {
            setSearchData(prev => ({ ...prev, pageNo: 0, [event.target.name]: null }));
        } else {
            const { name, value } = event.target;
            setSearchData(prev => ({ ...prev, pageNo: 0, [name]: value }));
        }
    }

    return (
        <div class="form-group row mt-3">
            <div class="col-sm-4">
                <MyFieldSelect label='Group By' onChange={handleAnySelectChange} value={searchData.groupBy} options={['type', 'tags', 'category','book','author']} />
            </div>
            <div class="col-sm-4">
                <MyFieldSelect label='Sort By' onChange={handleAnySelectChange} value={searchData.sortBy} options={['name', 'count']} />
            </div>
            <div class="col-sm-4">
                <MyFieldSelect label='Sort Order' onChange={handleAnySelectChange} value={searchData.sortOrder} options={['ASC', 'DESC']} />
            </div>
        </div>
    )
}

export default MetricsSearchBar