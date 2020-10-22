import React, {useState} from 'react';

import ReactListItem from './PlayListItem/PlayListItem';
import ModalAdd from '../ModalAdd/ModalAdd.js'
import ModalEdit from '../ModalEdit/ModalEdit.js'
import ModalDelete from '../ModalDelete/ModalDelete.js'
import classes from './PlayList.module.scss';

const PlayList = ({ stations, setStation, setStations }) => {
const [currentId, setCurrentId ] = useState('');
const [editStation, setEditStation ] = useState({});
const [isAddModal, setIsAddModal ] = useState(false);
const [isDeleteModal, setIsDeleteModal ] = useState(false);
const [isEditModal, setIsEditModal ] = useState(false);

    const listStations = () => {
        let allCategory = [];
        stations.forEach((item) => {
            allCategory.push(item.category);
        });

        let uniqueCategory = Array.from(new Set(allCategory));

        let currentList = uniqueCategory.map((category, index)=> {
            return <div key={index}>
                <div className={classes.categoryName}>{category}</div>
                {stations.map((item) => {
                    return category === item.category ? 
                    <ReactListItem 
                        key={item.id} 
                        id={item.id}
                        station={item.name}
                        url={item.url}
                        category={item.category}
                        setStation={setStation}
                        deleteModal={handlerDeleteModal}
                        editModal={handlerEditModal}
                    /> : null
                })}
            </div>
        });

        // let currentList = stations.map((item) => {
        //     return <ReactListItem 
        //         key={item.id} 
        //         id={item.id}
        //         station={item.name}                
        //         url={item.url}
        //         category={item.category}
        //         setStation={setStation}
        //         deleteModal={handlerDeleteModal}
        //         editModal={handlerEditModal}
        //     />
        // });

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

    const handlerEditModal = (id) => {
        let currentStation = stations.find(item => item.id === id);
        setEditStation(currentStation);
        setIsEditModal(true);
    }

    const handlerAddStation = () => {
        setIsAddModal(true);
    }
    const handlerCancelModal = (e) => {
        e.preventDefault();   
        setIsAddModal(false);
        setIsEditModal(false);
        setIsDeleteModal(false);
    }
    
    return (
        <div className={classes.playListContent}>
            {listStations()}

            {isAddModal &&
                <ModalAdd
                    stations={stations} 
                    station={editStation}
                    setStations={setStations} 
                    setIsAddModal={setIsAddModal}
                    cancelModal={handlerCancelModal}
                />
            }

            {isEditModal &&
                <ModalEdit 
                    stations={stations}
                    station={editStation}                  
                    setStations={setStations} 
                    setIsEditModal={setIsEditModal}
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
