import React, {useState} from 'react';

import ReactListItem from './PlayListItem/PlayListItem';
import ModalForm from '../ModalForm/ModalForm.js'
import classes from './PlayList.module.scss';

const PlayList = ({ stations, setStation, setStations }) => {
const [isAddModal, setIsAddModal ] = useState(false);

    const listStations = () => {
        let currentList = stations.map((item) => {
            return <ReactListItem 
                key={item.id} 
                id={item.id}
                station={item.name}                
                url={item.url}
                category={item.category}
                setStation={setStation}
            />
        });
        return currentList;
    }

    const handlerAddStation = () => {
        setIsAddModal(true);
    }
    
    return (
        <div className={classes.playListContent}>
            {listStations()}
            {isAddModal &&
                <ModalForm 
                    stations={stations} 
                    setStations={setStations} 
                    setIsAddModal={setIsAddModal}
                />
            }
            <div className={classes.addButtonWrap}>
                <button className={classes.addButton} onClick={handlerAddStation}>Add</button>
            </div>


        </div>
    );
}

export default PlayList;
