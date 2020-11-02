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
    const [isErrorList, setIsErrorList] = useState(false);
    const [isDeleteAllModal, setIsDeleteAllModal] = useState(false);
    const [searchWords, setSearchWords] = useState('');
    const [station, setStation] = useState({
        id: '',
        name: '',
        url: '',
        category: '',
        favorite: false,
        site: '',
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
        setIsErrorList(false);
        let data = JSON.parse(localStorage.getItem('stations'));
        let file = new File([JSON.stringify(data)], 'radion.plist', {
            type: 'text/plain;charset=utf-8',
        });
        FileSaver.saveAs(file);
    };

    const handlerOpenData = () => {
        setIsErrorList(false);
        let input = document.createElement('input');
        input.type = 'file';

        input.onchange = (e) => {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.readAsText(file, 'UTF-8');
            reader.onload = (readerEvent) => {
                try {
                    let content = readerEvent.target.result;
                    let newStations = JSON.parse(content);
                    if (
                        newStations[0].hasOwnProperty('id') &&
                        newStations[0].hasOwnProperty('name') &&
                        newStations[0].hasOwnProperty('url') &&
                        newStations[0].hasOwnProperty('category') &&
                        newStations[0].hasOwnProperty('favorite') &&
                        newStations[0].hasOwnProperty('site')
                    ) {
                        setStations(newStations);
                        localStorage.setItem(
                            'stations',
                            JSON.stringify(newStations),
                        );
                    } else {
                        return false;
                    }
                } catch (error) {
                    setIsErrorList(true);
                    console.log(error);
                }
            };
        };

        input.click();
    };

    const handlerSetFavorite = (id) => {
        let newStations = stations.map((item) => {
            if (item.id === id) item.favorite = !item.favorite;
            return item;
        });
        setStations(newStations);

        if (station.id === id) {
            let newStation = station;
            newStation.favorite = !station.favorite;
            setStation(newStation);
        }
        localStorage.setItem('stations', JSON.stringify(newStations));
    };

    const handlerDeleteAllModal = () => {
        setIsDeleteAllModal(!isDeleteAllModal);
    };

    const handlerSetSearch = () => {
        setIsSearch(!isSearch);
        setSearchWords('');
    };
    const handlerSetSearchWords = (e) => {
        setSearchWords(e.target.value);
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
                isErrorList={isErrorList}
                setIsErrorList={setIsErrorList}
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
                searchWords={searchWords}
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
                setSearchNewWords={handlerSetSearchWords}
                searchWords={searchWords}
                openData={handlerOpenData}
            />
        </Aux>
    );
};

export default App;
