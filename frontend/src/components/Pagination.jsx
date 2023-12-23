import React from "react";
import classes from "./Pagination.module.css";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
    const pages = [];
    console.log(totalPages, currentPage);
    for (let i = 1; i <= totalPages; i++) {
        pages.push(
            <button
                className={classes.button}
                key={i}
                onClick={() => {
                    onPageChange(i);
                }}
                disabled={currentPage == i}
            >
                {i}
            </button>
        );
    }
    return <div className={classes.pagination}>{pages}</div>;
};

export default Pagination;
