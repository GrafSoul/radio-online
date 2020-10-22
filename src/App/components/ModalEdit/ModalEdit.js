import React, {useState} from 'react';

import classes from './ModalEdit.module.scss';

const ModalEdit = ({ station, stations, setStations, setIsEditModal, cancelModal }) => {
    const [name, setName] = useState(station.name);
    const [url, setUrl] = useState(station.url);
    const [category, setCategory] = useState(station.category);

    const handlerSaveStation = (e) => {
        e.preventDefault(); 

        let editedStation = { id: station.id, name, url, category };
        let newStations = stations.map((item) => item.id === station.id ? editedStation : item);
        setStations(newStations);   
        setName('');
        setUrl('');
        setCategory('');
        setIsEditModal(false);
    }

    return (
        <div className={classes.addNewStation}>
            <input 
                type="text" 
                name="name" 
                value={name} 
                onChange={(e) =>  setName(e.target.value)}
            />

            <input 
                type="text" 
                name="url" 
                value={url}
                onChange={(e) =>  setUrl(e.target.value)}
            />

            <input 
                type="text" 
                name="category" 
                value={category}
                onChange={(e) =>  setCategory(e.target.value)}
            />
            <button onClick={(e) => handlerSaveStation(e)}>Save</button>
            <button onClick={(e) => cancelModal(e)}>Cancel</button>
        </div>
    );
}

export default ModalEdit;
