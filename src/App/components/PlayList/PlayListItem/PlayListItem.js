import React from 'react';

import classes from './PlayListItem.module.scss'

const PlayListItem = ({id, station, url, category, setStation}) => {
    return (
        <div 
            className={classes.playListItemContent} 
            onClick={() => setStation({id, station, url, category})}>
            <div className={classes.nameStation}>{station}</div>
            <div className={classes.categoryStation}>{category}</div>
            <button>Edit</button>
            <button>Del</button>
        </div>
    );
}

export default PlayListItem;

