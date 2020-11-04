import React from 'react';

import classes from './Search.module.scss';

const Search = ({ isSearch, setSearch, setSearchNewWords, searchWords }) => {
    return (
        <div className={classes.searchContent}>
            <div
                className={[
                    classes.searchInput,
                    isSearch ? classes.searchActive : null,
                ].join(' ')}
            >
                <input
                    autoFocus
                    type="text"
                    value={searchWords}
                    onChange={(e) => setSearchNewWords(e)}
                />
            </div>

            {!isSearch ? (
                <button className={classes.searchButton} onClick={setSearch}>
                    <i className="fal fa-search-plus"></i>
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
