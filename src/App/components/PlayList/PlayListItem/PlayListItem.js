import React from 'react';

import classes from './PlayListItem.module.scss'

const PlayListItem = ({id, station, url, category, setStation, deleteModal}) => {

    const handlerSetStation = () => {
        setStation({id, station, url, category})
    }

    return (
        <div 
            className={classes.playListItemContent} 
            onClick={handlerSetStation}>
            <div className={classes.nameStation}>{station}</div>
            <div className={classes.categoryStation}>{category}</div>
            <button className={classes.editBtn}>Edit</button>
            <button className={classes.deleteBtn} 
            onClick={(e) => deleteModal(id)}>Del</button>
        </div>        
    );
}

export default PlayListItem;

