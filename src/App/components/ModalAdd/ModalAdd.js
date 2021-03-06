import React, { useState } from 'react';
import { v1 as uuid } from 'uuid';

import classes from './ModalAdd.module.scss';

const ModalAdd = ({ stations, setStations, setIsAddModal, cancelModal }) => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('');
    const [site, setSite] = useState('');

    const handlerAddNewStation = (e) => {
        e.preventDefault();

        if (name !== '' && url !== '' && category !== '') {
            let newStation = {
                id: uuid(),
                name,
                url,
                category,
                favorite: false,
                site,
            };
            setStations((prevStations) => [...prevStations, newStation]);
            localStorage.setItem(
                'stations',
                JSON.stringify([...stations, newStation]),
            );
            setName('');
            setUrl('');
            setCategory('');
            setSite('');
            setIsAddModal(false);
        }
    };

    return (
        <div className={classes.addNewStation}>
            <div className={classes.addNewStationContent}>
                <input
                    autoFocus
                    type="text"
                    name="name"
                    maxLength="45"
                    value={name}
                    placeholder="Enter name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    name="url"
                    value={url}
                    placeholder="Enter URL radio station"
                    onChange={(e) => setUrl(e.target.value)}
                />

                <input
                    type="text"
                    name="site"
                    value={site}
                    maxLength="100"
                    placeholder="Enter the site page url"
                    onChange={(e) => setSite(e.target.value)}
                />

                <input
                    type="text"
                    name="category"
                    maxLength="30"
                    value={category}
                    placeholder="Enter category"
                    onChange={(e) => setCategory(e.target.value)}
                />

                <div className={classes.addNewStationBtns}>
                    <button
                        className={classes.addBtn}
                        onClick={(e) => handlerAddNewStation(e)}
                    >
                        Add
                    </button>
                    <button className={classes.cancelBtn} onClick={cancelModal}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalAdd;
