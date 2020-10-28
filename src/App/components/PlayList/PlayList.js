import React, { useState, useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import ReactListItem from './PlayListItem/PlayListItem';
import ModalAdd from '../ModalAdd/ModalAdd.js';
import ModalEdit from '../ModalEdit/ModalEdit.js';
import ModalDelete from '../ModalDelete/ModalDelete.js';

import classes from './PlayList.module.scss';

const PlayList = ({
    stations,
    setStation,
    setStations,
    isAddModal,
    setIsAddModal,
    isFavorites,
    setIsError,
    setFavorite,
}) => {
    const currentStations = useRef([]);
    const [currentId, setCurrentId] = useState('');
    const [editStation, setEditStation] = useState({});

    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [isEditModal, setIsEditModal] = useState(false);

    const listStations = () => {
        let allCategory = [];
        currentStations.current = isFavorites
            ? stations.filter((item) => item.favorite === true)
            : stations;

        currentStations.current.forEach((item) => {
            allCategory.push(item.category);
        });

        let uniqueCategory = Array.from(new Set(allCategory));

        let currentList = uniqueCategory.map((category, index) => {
            return (
                <div key={index}>
                    <div className={classes.categoryName}>{category}</div>
                    {currentStations.current.map((item) => {
                        return category === item.category ? (
                            <ReactListItem
                                key={item.id}
                                id={item.id}
                                station={item.name}
                                url={item.url}
                                category={item.category}
                                favorite={item.favorite}
                                setStation={setStation}
                                deleteModal={handlerDeleteModal}
                                editModal={handlerEditModal}
                                setFavorite={setFavorite}
                            />
                        ) : null;
                    })}
                </div>
            );
        });
        return currentList;
    };

    const handlerDeleteModal = (id) => {
        setIsDeleteModal(true);
        setCurrentId(id);
    };

    const handlerDeleteStation = () => {
        let newStations = stations.filter((item) => item.id !== currentId);
        localStorage.setItem('stations', JSON.stringify(newStations));
        setStations(newStations);
        if (stations.length === 1) {
            setStation({
                id: '',
                name: '',
                url: '',
                category: '',
                favorite: false,
            });
        }
        setIsDeleteModal(false);
        setIsError(false);
    };

    const handlerEditModal = (id) => {
        let currentStation = stations.find((item) => item.id === id);
        setEditStation(currentStation);
        setIsEditModal(true);
    };

    const handlerCancelModal = (e) => {
        e.preventDefault();
        setIsAddModal(false);
        setIsEditModal(false);
        setIsDeleteModal(false);
    };

    return (
        <div className={classes.playListContent}>
            {isFavorites && currentStations.current.length === 0 && (
                <div className={classes.favoritesInfo}>
                    Add stations to your favorites!
                </div>
            )}

            <Scrollbars
                style={{
                    position: 'absolute',
                    width: '100vw',
                    top: '0',
                    bottom: '0',
                }}
            >
                {listStations()}
            </Scrollbars>

            {isAddModal && (
                <ModalAdd
                    stations={stations}
                    station={editStation}
                    setStations={setStations}
                    setIsAddModal={setIsAddModal}
                    cancelModal={handlerCancelModal}
                />
            )}

            {isEditModal && (
                <ModalEdit
                    stations={stations}
                    station={editStation}
                    setStation={setStation}
                    setStations={setStations}
                    setIsEditModal={setIsEditModal}
                    cancelModal={handlerCancelModal}
                    setIsError={setIsError}
                />
            )}

            {isDeleteModal && (
                <ModalDelete
                    currentId={currentId}
                    cancelModal={handlerCancelModal}
                    deleteStation={handlerDeleteStation}
                />
            )}
        </div>
    );
};

export default PlayList;
