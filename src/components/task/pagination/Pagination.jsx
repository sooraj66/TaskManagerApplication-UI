import React from 'react';
import './Pagination.css';

function Pagination({ currentPage, totalPages, handlePageChange }) {
    return (
        <div className="pagination-controls">
            <button
                className="btn btn-secondary"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}>
                Previous
            </button>
            <span style={{ lineHeight: 2 }}>{`Page ${currentPage} of ${totalPages}`}</span>
            <button
                className="btn btn-secondary"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}>
                Next
            </button>
        </div>
    )
}

export default Pagination