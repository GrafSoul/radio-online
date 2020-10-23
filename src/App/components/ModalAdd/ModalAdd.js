import React, {useState} from 'react';

import classes from './ModalAdd.module.scss';

const ModalAdd = ({ stations, setStations, setIsAddModal, cancelModal }) => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('');

    const handlerAddNewStation = (e) => {
        e.preventDefault();
        
        let newStation = { id: stations.length + 1, name, url, category };
        setStations(prevStations => [...prevStations, newStation]);  
        localStorage.setItem('stations', JSON.stringify([...stations, newStation]));      
        setName('');
        setUrl('');
        setCategory('');
        setIsAddModal(false);
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
            <button onClick={(e) => handlerAddNewStation(e)}>Add</button>
            <button onClick={cancelModal}>Cancel</button>
        </div>
    );
}

export default ModalAdd;
