import React from 'react';

import classes from './PlayListItem.module.scss'

const PlayListItem = ({id, station, url, category, setStation, deleteModal, editModal}) => {

    const handlerSetStation = () => {
        setStation({id, station, url, category})
    }

    return (
        <div 
            className={classes.playListItemContent} 
            onClick={handlerSetStation}>
            <div className={classes.nameStation}>{station}</div>
            <div className={classes.categoryStation}>{category}</div>
            <button 
            onClick={() => editModal(id)} 
            className={classes.editBtn}>Edit</button>
            <button 
            className={classes.deleteBtn} 
            onClick={() => deleteModal(id)}>Del</button>
        </div>        
    );
}

export default PlayListItem;

