import React, {useState} from 'react';

import classes from './ModalForm.module.scss';

const ModalForm = ({ stations, setStations, setIsAddModal, cancelModal }) => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('');

    const handlerAddNewStation = (e) => {
        e.preventDefault();
        
        let newStation = { id: stations.length + 1, name, url, category };
        setStations(prevStations => [...prevStations, newStation]);        
        setName('');
        setUrl('');
        setCategory('');
        setIsAddModal(false);
    }

    return (
        <div className={classes.addNewStation}>
            <form action="">
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
            </form>
        </div>
    );
}

export default ModalForm;
