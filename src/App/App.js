import React, {useState, useRef, useEffect} from 'react';

import Aux from './hoc/AuxComponent/AuxComponent';
import Header from './components/Header/Header';
import Player from './components/Player/Player';
import PlayList from './components/PlayList/PlayList';
import Footer from './components/Footer/Footer';

import resources from './resources/resources';

const App =() =>{
    const audioStream = useRef(null); 
    const [stations, setStations] = useState([]);
    const [isAddModal, setIsAddModal ] = useState(false);
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
        const localStations = JSON.parse(localStorage.getItem('stations'));
        if( localStations === null || localStations.length === 0) {
            localStorage.setItem('stations', JSON.stringify(resources)); 
            setStations(resources)            
        } else {
            setStations(localStations)
        }
    }, []);

    const handlerAddStation = () => {
        setIsAddModal(true);
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
            />
            <Footer addStation={handlerAddStation}/>
        </Aux>
    );

}

export default App;
