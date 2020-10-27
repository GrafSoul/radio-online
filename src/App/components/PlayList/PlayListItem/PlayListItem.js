import React from 'react';

import classes from './PlayListItem.module.scss'

const PlayListItem = ({id, station, url, category, favorite, setStation, deleteModal, editModal, setFavorite}) => {

    const handlerSetStation = () => {
        setStation({id, station, url, category, favorite})
    }

    return (
        <div 
            className={classes.playListItemContent}>

            <div className={classes.playListItemName} onClick={handlerSetStation} title={'Select a radio station - ' + station}>
                <div className={classes.nameStation}>{station}</div>
                <div className={classes.categoryStation}>{category}</div>
            </div>

            <div className={classes.playListItemControl}>
                <button 
                title={'Edit radio station - ' + station}
                onClick={() => editModal(id)} 
                className={classes.editBtn}><i className="far fa-edit"></i></button>
                <button 
                title={'Delete radio station - ' + station}
                className={classes.deleteBtn} 
                onClick={() => deleteModal(id)}><i className="far fa-trash-alt"></i></button>
                <button 
                title={'Add to favorites - ' + station}
                className={classes.favoriteBtn} 
                onClick={() => setFavorite(id)}>{favorite ? <i className="fas fa-heart"></i> : <i className="far fa-heart"></i>}</button>
            </div>
        </div>        
    );
}

export default PlayListItem;

