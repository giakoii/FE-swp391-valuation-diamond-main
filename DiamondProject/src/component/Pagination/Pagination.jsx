import React, { useState } from 'react';
import '../Pagination/Pagination.css'

export const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i);
    }
    // Set a default active page
    const [activePage, setActivePage] = useState(1);

    const handlePageClick = (number) => {
        setActivePage(number);
        paginate(number);
    };
    return (
        <nav className='pagination-container'>
            <ul className='pagination'>
                {pageNumbers.map(number => (
                    <li key={number} className={`page-item ${number === activePage ? 'active' : ''}`}>
                        <a 
                            href="#!"
                            className='page-link'
                            onClick={() => handlePageClick(number)}
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
