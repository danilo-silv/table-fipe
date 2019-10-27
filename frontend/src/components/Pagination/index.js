import React from "react";
import "./style.css";
const Pagination = ({ itemPerPage, totalItens, paginate }) => {
    const pageNumbers = [];

    for (let i = 0; i < Math.ceil(totalItens / itemPerPage); i++) {
        pageNumbers.push(i + 1);
    };

    return (

        <nav className="center">
            <ul className="pagination">
                <a>❮</a>
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={() => paginate(number)} className="page-link">{number}</a>
                    </li>
                ))}
                <a>❯</a>
            </ul>
        </nav>
    )
    // className="page-item"
}
export default Pagination;

// renderPageNumbers = pageNumbers.map(number => {
//     let classes = this.state.current_page === number ? styles.active : '';

//     return (
//       <span key={number} className={classes} onClick={() => this.makeHttpRequestWithPage(number)}>{number}</span>
//     );
//   });