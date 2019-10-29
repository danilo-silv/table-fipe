import React from "react";
import "./style.css";
const Pagination = ({ itemPerPage, totalItens, paginate, currentPage }) => {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(totalItens / itemPerPage); i++) {
        pageNumbers.push(i + 1);
    };
    return (

        <nav className="center">
            {pageNumbers.length > 1
                ?
                <ul className="pagination">
                    <button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)} className="button">❮</button>
                    {pageNumbers.map(number => (
                        <li key={number} className="page-item">
                            <a onClick={() => paginate(number)} className={(number === currentPage) ? 'page-link active' : 'page-link'}>{number}</a>
                        </li>
                    ))}
                    <button disabled={pageNumbers.length === currentPage} onClick={() => paginate(currentPage + 1)} className="button">❯</button>
                </ul> : null
            }

        </nav>
    )
}
export default Pagination;
