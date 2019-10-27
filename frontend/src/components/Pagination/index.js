import React from "react";

const Pagination = ({ itemPerPage, totalItens, paginate }) => {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(totalItens / itemPerPage); i++) {
        pageNumbers.push(i + 1);
    };

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} className="page-link">{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
export default Pagination;