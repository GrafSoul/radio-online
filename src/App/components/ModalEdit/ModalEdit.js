import React, { useState } from 'react';

import classes from './ModalEdit.module.scss';

const ModalEdit = ({
    station,
    stations,
    setStation,
    setStations,
    setIsEditModal,
    cancelModal,
    setIsError,
}) => {
    const [name, setName] = useState(station.name);
    const [url, setUrl] = useState(station.url);
    const [category, setCategory] = useState(station.category);

    const handlerSaveStation = (e) => {
        e.preventDefault();

        let editedStation = { id: station.id, name, url, category };
        let newStations = stations.map((item) =>
            item.id === station.id ? editedStation : item,
        );
        setStations(newStations);
        setStation(editedStation);
        localStorage.setItem('stations', JSON.stringify(newStations));
        setName('');
        setUrl('');
        setCategory('');
        setIsEditModal(false);
        setIsError(false);
    };

    return (
        <div className={classes.editStation}>
            <div className={classes.editStationContent}>
                <input
                    type="text"
                    name="name"
                    value={name}
                    maxLength="45"
                    placeholder="Enter name"
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    name="url"
                    value={url}
                    placeholder="Enter URL"
                    onChange={(e) => setUrl(e.target.value)}
                />

                <input
                    type="text"
                    name="category"
                    value={category}
                    maxLength="30"
                    placeholder="Enter category"
                    onChange={(e) => setCategory(e.target.value)}
                />
                <div className={classes.editStationBtns}>
                    <button
                        className={classes.saveBtn}
                        onClick={(e) => handlerSaveStation(e)}
                    >
                        Save
                    </button>
                    <button className={classes.cancelBtn} onClick={cancelModal}>
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalEdit;
