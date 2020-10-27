import React from 'react';

import classes from './Footer.module.scss';

const Footer = ({
    addStation,
    selectAll,
    selectFavorites,
    isFavorites,
    writeData,
}) => {
    return (
        <div className={classes.footerContent}>
            <div className={classes.leftBtns}>
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
                    <i className="fas fa-heart-circle"></i>
                </button>

                <button
                    className={classes.favoritesButton}
                    onClick={writeData}
                    title="Save radio stations"
                >
                    <i className="far fa-save"></i>
                </button>
            </div>

            <div className={classes.rightBtns}>
                <button
                    className={classes.addButton}
                    onClick={addStation}
                    title="Add a new radio station"
                >
                    <i className="far fa-plus-circle"></i>
                </button>
            </div>
        </div>
    );
};

export default Footer;
