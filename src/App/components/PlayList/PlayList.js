import React, {useState} from 'react';

import ReactListItem from './PlayListItem/PlayListItem';
import ModalForm from '../ModalForm/ModalForm.js'
import ModalDelete from '../ModalDelete/ModalDelete.js'
import classes from './PlayList.module.scss';

const PlayList = ({ stations, setStation, setStations }) => {
const [currentId, setCurrentId ] = useState('');
const [isAddModal, setIsAddModal ] = useState(false);
const [isDeleteModal, setIsDeleteModal ] = useState(false);

    const listStations = () => {
        let currentList = stations.map((item) => {
            return <ReactListItem 
                key={item.id} 
                id={item.id}
                station={item.name}                
                url={item.url}
                category={item.category}
                setStation={setStation}
                deleteModal={handlerDeleteModal}
            />
        });
        return currentList;
    }

    const handlerDeleteModal = (id) => {
        setIsDeleteModal(true);
        setCurrentId(id);
    }

    const handlerDeleteStation = () => {
        let newStations = stations.filter(item => item.id !== currentId);
        setStations(newStations); 
        setIsDeleteModal(false);
    }

    const handlerAddStation = () => {
        setIsAddModal(true);
    }
    const handlerCancelModal = () => {
        setIsAddModal(false);
        setIsDeleteModal(false);
    }
    
    return (
        <div className={classes.playListContent}>
            {listStations()}

            {isAddModal &&
                <ModalForm 
                    stations={stations} 
                    setStations={setStations} 
                    setIsAddModal={setIsAddModal}
                    cancelModal={handlerCancelModal}
                />
            }

            {isDeleteModal &&
                <ModalDelete 
                    currentId={currentId}
                    cancelModal={handlerCancelModal}
                    deleteStation={handlerDeleteStation}
                />
            }
            <div className={classes.addButtonWrap}>
                <button className={classes.addButton} onClick={handlerAddStation}>Add</button>
            </div>

        </div>
    );
}

export default PlayList;
