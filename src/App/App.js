import React, {useState} from 'react';

import Aux from './hoc/AuxComponent/AuxComponent';
import Header from './components/Header/Header';
import Player from './components/Player/Player';
import PlayList from './components/PlayList/PlayList';

import resources from './resources/resources';

const App =() =>{
    const [stations, setStations] = useState(resources);
    const [station, setStation] = useState(
        {
            id: '',
            station: '',
            url: '',
            category: ''
        }
    );

    return (
        <Aux>
            <Header />
            <Player station={station} />
            <PlayList stations={stations} 
                setStation={setStation} 
                setStations={setStations}
            />
        </Aux>
    );

}

export default App;
