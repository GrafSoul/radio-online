import React from 'react';

import classes from './Footer.module.scss';
import Search from '../Search/Search';

const Footer = ({
    addStation,
    selectAll,
    selectFavorites,
    isFavorites,
    writeData,
    deleteAllModal,
    isSearch,
    setSearch,
    setSearchNewWords,
    searchWords,
    openData,
}) => {
    return (
        <div className={classes.footerContent}>
            <div className={classes.leftBtns}>
                <div>
                    <button
                        disabled={!isFavorites}
                        className={[
                            classes.allButton,
                            !isFavorites ? classes.noActive : null,
                        ].join(' ')}
                        onClick={selectAll}
                        title="All radio stations"
                    >
                        <i className="fas fa-list-alt"></i>
                    </button>

                    <button
                        disabled={isFavorites}
                        className={[
                            classes.favoritesButton,
                            isFavorites ? classes.noActive : null,
                        ].join(' ')}
                        onClick={selectFavorites}
                        title="Selected radio stations"
                    >
                        <i className="fal fa-heart-circle"></i>
                    </button>

                    <button
                        className={classes.openButton}
                        onClick={openData}
                        title="Open radio stations list"
                    >
                        <i className="fal fa-file-import"></i>
                    </button>

                    <button
                        className={classes.saveButton}
                        onClick={writeData}
                        title="Save radio stations"
                    >
                        <i className="fal fa-file-export"></i>
                    </button>
                </div>

                <Search
                    isSearch={isSearch}
                    setSearch={setSearch}
                    setSearchNewWords={setSearchNewWords}
                    searchWords={searchWords}
                />
            </div>

            <div className={classes.rightBtns}>
                <button
                    className={classes.deleteButton}
                    onClick={deleteAllModal}
                    title="Delete all radio stations"
                >
                    <i className="fal fa-minus-circle"></i>
                </button>
                <button
                    className={classes.addButton}
                    onClick={addStation}
                    title="Add a new radio station"
                >
                    <i className="fal fa-plus-circle"></i>
                </button>
            </div>
        </div>
    );
};

export default Footer;
