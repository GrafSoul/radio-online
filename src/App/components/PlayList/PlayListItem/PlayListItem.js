import React from 'react';

import classes from './PlayListItem.module.scss';

const PlayListItem = ({
    id,
    station,
    current,
    url,
    category,
    favorite,
    site,
    setStation,
    deleteModal,
    editModal,
    setFavorite,
    openLink,
}) => {
    const handlerSetStation = () => {
        setStation({ id, name: station, url, category, favorite, site });
    };

    return (
        <div
            className={[
                classes.playListItemContent,
                current.id === id ? classes.active : null,
            ].join(' ')}
        >
            <div
                className={classes.playListItemName}
                onClick={handlerSetStation}
                title={'Select a radio station - ' + station}
            >
                <div className={classes.nameStation}>{station}</div>
                <div className={classes.categoryStation}>{category}</div>
            </div>

            <div className={classes.playListItemControl}>
                {site && (
                    <span
                        title={'Open radio station - ' + station}
                        className={classes.linkBtn}
                        onClick={() => openLink(site)}
                    >
                        <i className="far fa-external-link-alt"></i>
                    </span>
                )}
                <button
                    title={'Edit radio station - ' + station}
                    onClick={() => editModal(id)}
                    className={classes.editBtn}
                >
                    <i className="far fa-edit"></i>
                </button>
                <button
                    title={'Delete radio station - ' + station}
                    className={classes.deleteBtn}
                    onClick={() => deleteModal(id, station)}
                >
                    <i className="far fa-trash-alt"></i>
                </button>
                <button
                    title={'Add to favorites - ' + station}
                    className={classes.favoriteBtn}
                    onClick={() => setFavorite(id)}
                >
                    {favorite ? (
                        <i className="fas fa-heart"></i>
                    ) : (
                        <i className="far fa-heart"></i>
                    )}
                </button>
            </div>
        </div>
    );
};

export default PlayListItem;
