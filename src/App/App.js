import React, { useState, useRef, useEffect } from 'react';
import FileSaver from 'file-saver';

import Aux from './hoc/AuxComponent/AuxComponent';
import Header from './components/Header/Header';
import Player from './components/Player/Player';
import PlayList from './components/PlayList/PlayList';
import Footer from './components/Footer/Footer';

import resources from './resources/resources';

const App = () => {
    const audioStream = useRef(null);
    const localStations = useRef([]);
    const [stations, setStations] = useState([]);
    const [isAddModal, setIsAddModal] = useState(false);
    const [isFavorites, setIsFavorites] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isDeleteAllModal, setIsDeleteAllModal] = useState(false);
    const [station, setStation] = useState({
        id: '',
        name: '',
        url: '',
        category: '',
        favorite: false,
    });

    useEffect(() => {
        localStations.current = JSON.parse(localStorage.getItem('stations'));
        if (
            localStations.current === null ||
            localStations.current.length === 0
        ) {
            localStorage.setItem('stations', JSON.stringify(resources));
            setStations(resources);
        } else {
            setStations(localStations.current);
        }
    }, []);

    const handlerAddStation = () => {
        setIsAddModal(true);
    };
    const handlerSelectAll = () => {
        setIsFavorites(false);
    };
    const handlerSelectFavorites = () => {
        setIsFavorites(true);
    };
    const handlerWriteData = () => {
        let data = JSON.parse(localStorage.getItem('stations'));
        let file = new File([JSON.stringify(data)], 'radion.txt', {
            type: 'text/plain;charset=utf-8',
        });
        FileSaver.saveAs(file);
    };

    const handlerSetFavorite = (id) => {
        let newStations = stations.map((item) => {
            if (item.id === id) item.favorite = !item.favorite;
            return item;
        });
        setStations(newStations);

        let newStation = station;
        newStation.favorite = !station.favorite;
        setStation(newStation);
        localStorage.setItem('stations', JSON.stringify(newStations));
    };

    const handlerDeleteAllModal = () => {
        setIsDeleteAllModal(!isDeleteAllModal);
    };

    const handlerSetSearch = () => {
        setIsSearch(!isSearch);
    };

    const handlerDeleteAllStations = () => {
        setStations([]);
        localStorage.setItem('stations', JSON.stringify([]));
        setIsDeleteAllModal(false);
    };

    return (
        <Aux>
            <Header />
            <Player
                audioStream={audioStream}
                station={station}
                stations={stations}
                isError={isError}
                setIsError={setIsError}
                setFavorite={handlerSetFavorite}
            />

            <PlayList
                stations={stations}
                setStation={setStation}
                setStations={setStations}
                isAddModal={isAddModal}
                setIsAddModal={setIsAddModal}
                isFavorites={isFavorites}
                setFavorite={handlerSetFavorite}
                setIsError={setIsError}
                deleteAllStations={handlerDeleteAllStations}
                deleteAllModal={handlerDeleteAllModal}
                isDeleteAll={isDeleteAllModal}
            />
            <Footer
                addStation={handlerAddStation}
                selectAll={handlerSelectAll}
                selectFavorites={handlerSelectFavorites}
                deleteAllModal={handlerDeleteAllModal}
                isFavorites={isFavorites}
                writeData={handlerWriteData}
                isSearch={isSearch}
                setSearch={handlerSetSearch}
            />
        </Aux>
    );
};

export default App;
