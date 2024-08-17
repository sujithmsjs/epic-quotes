import React from 'react'
import PageNumberSelector from './PageNumberSelector'
import PageSizeSetter from './PageSizeSetter'

const Pagination = ({ totalPages, currentPage, onPageChange, onPageSizeChange, pageSize }) => {
    return (
        <div class="row d-flex justify-content-between">
            <div class="col-md-2">
                <PageSizeSetter pageSize={pageSize} onPageSizeChange={onPageSizeChange} />
            </div>
            <div class="col-md-2">
                <PageNumberSelector
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    )
}

export default Pagination