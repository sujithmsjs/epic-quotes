import React, { useState } from 'react'
import PaginationV2 from './PaginationV2';
import SearchBar from './SearchBar'
import SearchBarV2 from './SearchBarV2';

export const SearchBarTest = () => {
    const [searchData, setSearchData] = useState({ "pageSize": 10, "pageNo": 0 });
    return (
        <div className='container'>
            <SearchBarV2 searchData={searchData} setSearchData={setSearchData} />

            <pre>
                <h4>{JSON.stringify(searchData, null, 5)}</h4>

            </pre>
           
        </div>
    )
}

