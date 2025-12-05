// src/components/common/Pagination.tsx

import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    loading: boolean;
}

const Pagination: React.FC<PaginationProps> = ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    loading 
}) => {
    
    // Simple logic for displaying page numbers (e.g., current, previous, next)
    const pageNumbers = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    const buttonStyle: React.CSSProperties = {
        padding: '8px 12px',
        margin: '0 4px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: '#f8f8f8',
        pointerEvents: loading ? 'none' : 'auto',
        opacity: loading ? 0.6 : 1,
    };

    const activeButtonStyle: React.CSSProperties = {
        ...buttonStyle,
        backgroundColor: '#007bff',
        color: 'white',
        borderColor: '#007bff',
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
            <button 
                style={buttonStyle} 
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage === 1 || loading}
            >
                Previous
            </button>

            {/* Displaying page numbers */}
            {pageNumbers.map(number => (
                <button
                    key={number}
                    style={number === currentPage ? activeButtonStyle : buttonStyle}
                    onClick={() => onPageChange(number)}
                    disabled={loading}
                >
                    {number}
                </button>
            ))}

            <button 
                style={buttonStyle} 
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage === totalPages || loading}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;