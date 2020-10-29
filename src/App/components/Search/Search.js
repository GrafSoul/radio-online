import React from 'react';

import classes from './Search.module.scss';

const Search = ({ isSearch, setSearch }) => {
    return (
        <div className={classes.searchContent}>
            {isSearch ? (
                <div className={classes.searchInput}>
                    <input autoFocus type="text" />
                </div>
            ) : null}

            {!isSearch ? (
                <button className={classes.searchButton} onClick={setSearch}>
                    <i className="far fa-search-plus"></i>
                </button>
            ) : (
                <button className={classes.searchButton} onClick={setSearch}>
                    <i className="fal fa-times-circle"></i>
                </button>
            )}
        </div>
    );
};

export default Search;
