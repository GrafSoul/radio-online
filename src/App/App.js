import React, {useState, useRef, useEffect} from 'react';

import Aux from './hoc/AuxComponent/AuxComponent';
import Header from './components/Header/Header';
import Player from './components/Player/Player';
import PlayList from './components/PlayList/PlayList';
import Footer from './components/Footer/Footer';

import resources from './resources/resources';

const App =() =>{
    const audioStream = useRef(null);
    const localStations = useRef([]); 
    const [stations, setStations] = useState([]);
    const [isAddModal, setIsAddModal ] = useState(false);
    const [isFavorites, setIsFavorites ] = useState(false);
    const [station, setStation] = useState(
        {
            id: '',
            station: '',
            url: '',
            category: '',
            favorite: false
        }
    );    

    useEffect(() => {
        localStations.current = JSON.parse(localStorage.getItem('stations'));
        if( localStations.current === null || localStations.current.length === 0) {
            localStorage.setItem('stations', JSON.stringify(resources)); 
            setStations(resources)            
        } else {
            setStations(localStations.current)
        }
    }, []);

    const handlerAddStation = () => {
        setIsAddModal(true);
    }
    const handlerSelectAll = () => {
        setIsFavorites(false)
    }
    const handlerSelectFavorites = () => {
        setIsFavorites(true)
        // let filteredStations = localStations.current.filter(item => item.favorite === true );
        // console.log(filteredStations)
        // setStations(filteredStations)
    }

    return (
        <Aux>
            <Header />
            <Player
                audioStream={audioStream} 
                station={station} 
                stations={stations}
            />
            <PlayList 
                stations={stations} 
                setStation={setStation} 
                setStations={setStations}
                isAddModal={isAddModal}
                setIsAddModal={setIsAddModal}
                isFavorites={isFavorites}
            />
            <Footer 
            addStation={handlerAddStation} 
            selectAll={handlerSelectAll}
            selectFavorites={handlerSelectFavorites}   
            />
        </Aux>
    );

}

export default App;
