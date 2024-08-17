import React from 'react'

const PageSizeSetter = ({onPageSizeChange, pageSize}) => {
    return (
        <select value={pageSize} class="form-control" onChange={(event ) => onPageSizeChange(event.target.value)}>
            <option>5</option>
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
        </select>
    )
}

export default PageSizeSetter