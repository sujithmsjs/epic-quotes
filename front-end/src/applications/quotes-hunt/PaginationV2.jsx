import React from 'react'
import { toJsonString } from '../../util/utility'
import AppyTagButton from './AppyTagButton'
import PageNumberSelector from './PageNumberSelector'
import PageSizeSetter from './PageSizeSetter'

const PaginationV2 = ({ totalPages, currentPage, pageSize, setSearchData, searchData }) => {


    const handlePageChange = pageNo => {
        setSearchData(prev => ({ ...prev, pageNo }));
    }

    const handlePageSizeChange = pageSize => {
        setSearchData(prev => ({ ...prev, pageSize, pageNo: 0 }));
    }

    return (
        <div class="row justify-content-start">
            <div class="col-md-2">
                <PageSizeSetter pageSize={searchData.pageSize} onPageSizeChange={handlePageSizeChange} />
            </div>
            <div class="col-md-2">
                <PageNumberSelector
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
            <div class="col-md-8">
                <AppyTagButton searchData={searchData} />
            </div>
        </div>
    )
}

export default PaginationV2