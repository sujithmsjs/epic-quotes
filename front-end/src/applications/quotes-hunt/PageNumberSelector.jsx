import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const PageNumberSelector = ({ totalPages, currentPage, onPageChange }) => {

    return (
        <nav aria-label="Page navigation">
            <ul className="pagination">
                <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage - 1)}
                        aria-label="Previous"
                    >
                        <span aria-hidden="true">&laquo;</span>
                    </button>
                </li>
                <li className='page-item'>
                    <button
                        className="page-link"
                    >
                        {`${currentPage + 1}/${totalPages}`}
                    </button>
                </li>

                {/* {pageNumbers.map((page) => (
                    <li
                        key={page}
                        className={`page-item ${currentPage === page ? 'active' : ''}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => onPageChange(page)}
                        >
                            {page + 1}
                        </button>
                    </li>
                ))} */}
                <li className={`page-item ${currentPage < totalPages - 1 ? '' : 'disabled'}`}>
                    <button
                        className="page-link"
                        onClick={() => onPageChange(currentPage + 1)}
                        aria-label="Next"
                    >
                        <span aria-hidden="true">&raquo;</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

PageNumberSelector.propTypes = {
    totalPages: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default PageNumberSelector;
