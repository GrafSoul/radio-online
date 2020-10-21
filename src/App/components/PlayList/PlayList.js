import React, {useState} from 'react';

import ReactListItem from './PlayListItem/PlayListItem';
import classes from './PlayList.module.scss';

const PlayList = ({ stations, setStation, setStations }) => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [category, setCategory] = useState('');

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

    const handlerAddNewStation = (e) => {
        e.preventDefault();
        
        let newStation = { id: stations.length + 1, name, url, category };
        setStations(prevStations => [...prevStations, newStation]);        
        setName('');
        setUrl('');
        setCategory('');
    }
    
    return (
        <div className={classes.playListContent}>
            {listStations()}

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
                </form>
            </div>

        </div>
    );
}

export default PlayList;
