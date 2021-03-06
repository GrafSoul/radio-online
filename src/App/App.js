import React, { useState, useRef, useEffect } from 'react';
import FileSaver from 'file-saver';

import Aux from './hoc/AuxComponent/AuxComponent';
import Header from './components/Header/Header';
import Player from './components/Player/Player';
import PlayList from './components/PlayList/PlayList';
import Footer from './components/Footer/Footer';

import resources from './resources/resources';

const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

const App = () => {
    const version = '1.3.0';
    const audioStream = useRef(null);
    const localStations = useRef([]);
    const [stations, setStations] = useState([]);
    const [isAddModal, setIsAddModal] = useState(false);
    const [isFavorites, setIsFavorites] = useState(false);
    const [isSearch, setIsSearch] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isErrorList, setIsErrorList] = useState(false);
    const [isDeleteAllModal, setIsDeleteAllModal] = useState(false);
    const [isAboutAppModal, setIsAboutAppModal] = useState(false);
    const [isDeleteModal, setIsDeleteModal] = useState(false);
    const [isEditModal, setIsEditModal] = useState(false);
    const [isMenu, setIsMenu] = useState(false);
    const [isRecord, setIsRecord] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [searchWords, setSearchWords] = useState('');
    const [countStations, setCountStations] = useState(0);
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

    const handlerWriteData = () => {
        setIsErrorList(false);
        let data = JSON.parse(localStorage.getItem('stations'));
        let file = new File([JSON.stringify(data)], 'radion.plist', {
            type: 'text/plain;charset=utf-8',
        });
        FileSaver.saveAs(file);
        setIsMenu(false);
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

                    console.log(newStations[0]);

                    if (
                        'id' in newStations[0] &&
                        'name' in newStations[0] &&
                        'url' in newStations[0] &&
                        'category' in newStations[0] &&
                        'favorite' in newStations[0] &&
                        'site' in newStations[0]
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
        setIsMenu(false);
    };

    const handlerAddData = () => {
        setIsErrorList(false);

        let input = document.createElement('input');
        input.type = 'file';

        input.onchange = (e) => {
            let file = e.target.files[0];
            let reader = new FileReader();
            reader.readAsText(file, 'UTF-8');
            reader.onload = (readerEvent) => {
                try {
                    let current = stations;
                    let content = readerEvent.target.result;
                    let newStations = JSON.parse(content);

                    if (
                        'id' in newStations[0] &&
                        'name' in newStations[0] &&
                        'url' in newStations[0] &&
                        'category' in newStations[0] &&
                        'favorite' in newStations[0] &&
                        'site' in newStations[0]
                    ) {
                        let result = current.concat(newStations);
                        console.log(result);
                        setStations(result);
                        localStorage.setItem(
                            'stations',
                            JSON.stringify(result),
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
        setIsMenu(false);
    };

    const handlerAddStation = () => {
        setIsDeleteAllModal(false);
        setIsAboutAppModal(false);
        setIsDeleteModal(false);
        setIsEditModal(false);
        setIsAddModal(true);
        setIsMenu(false);
    };

    const handlerSelectAll = () => {
        setIsFavorites(false);
    };

    const handlerSelectFavorites = () => {
        setIsFavorites(true);
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
        setIsAboutAppModal(false);
        setIsAddModal(false);
        setIsDeleteModal(false);
        setIsEditModal(false);
        setIsMenu(false);
        setIsDeleteAllModal(!isDeleteAllModal);
    };

    const handlerAboutAppModal = () => {
        setIsDeleteAllModal(false);
        setIsAddModal(false);
        setIsDeleteModal(false);
        setIsEditModal(false);
        setIsMenu(false);
        setIsAboutAppModal(!isAboutAppModal);
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
        setIsMenu(false);
    };

    const handlerOpenLink = (id, title, url) => {
        ipcRenderer.send('openWindow', id, title, url);
    };

    return (
        <Aux>
            <Header
                version={version}
                isMenu={isMenu}
                setIsMenu={setIsMenu}
                writeData={handlerWriteData}
                openData={handlerOpenData}
                addStation={handlerAddStation}
                addData={handlerAddData}
                deleteAllModal={handlerDeleteAllModal}
                aboutAppModal={handlerAboutAppModal}
                isRecord={isRecord}
                isSave={isSave}
            />
            <Player
                audioStream={audioStream}
                station={station}
                stations={stations}
                isError={isError}
                setIsError={setIsError}
                isErrorList={isErrorList}
                setIsErrorList={setIsErrorList}
                setFavorite={handlerSetFavorite}
                openLink={handlerOpenLink}
                isRecord={isRecord}
                setIsRecord={setIsRecord}
                setIsSave={setIsSave}
            />

            <PlayList
                version={version}
                station={station}
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
                aboutAppModal={handlerAboutAppModal}
                isAboutAppModal={isAboutAppModal}
                isDeleteModal={isDeleteModal}
                setIsDeleteModal={setIsDeleteModal}
                isEditModal={isEditModal}
                setIsEditModal={setIsEditModal}
                openLink={handlerOpenLink}
                setCountStations={setCountStations}
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
                countStations={countStations}
            />
        </Aux>
    );
};

export default App;
