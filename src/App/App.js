import React, {useState, useRef, useEffect} from 'react';

import Aux from './hoc/AuxComponent/AuxComponent';
import Header from './components/Header/Header';
import Player from './components/Player/Player';
import PlayList from './components/PlayList/PlayList';

import resources from './resources/resources';

const App =() =>{
    const audioStream = useRef(null); 
    const [stations, setStations] = useState([]);
    const [station, setStation] = useState(
        {
            id: '',
            station: '',
            url: '',
            category: ''
        }
    );

    useEffect(() => {
        const localStations = JSON.parse(localStorage.getItem('stations'));

        console.log(localStations)

        if( localStations === null || localStations.length === 0) {
            localStorage.setItem('stations', JSON.stringify(resources)); 
            setStations(resources)            
        } else {
            setStations(localStations)
        }
    }, []);

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
            />
        </Aux>
    );

}

export default App;
