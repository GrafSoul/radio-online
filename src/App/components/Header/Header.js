import React, { useState } from 'react';

import classes from './Header.module.scss';
import RecordTimer from '../RecordTimer/RecordTimer';

const { remote, ipcRenderer } = window.require('electron');
const mainWindow = remote.getCurrentWindow();

const Header = ({
    version,
    isMenu,
    setIsMenu,
    openData,
    addData,
    writeData,
    deleteAllModal,
    addStation,
    aboutAppModal,
    isRecord,
    isSave,
}) => {
    const [status, setStatus] = useState(false);
    const [isTop, setIsTop] = useState(false);
    const [isMin, setIsMin] = useState(false);

    const handlerMinimizeWindow = () => {
        mainWindow.hide();
    };

    const handlerMaximizeWindow = () => {
        if (status) {
            mainWindow.unmaximize();
            setStatus(!status);
        } else {
            mainWindow.maximize();
            setStatus(!status);
        }
    };

    const handlerCloseWindow = () => {
        mainWindow.close();
    };
    const handlerDownWindow = () => {
        ipcRenderer.send('on-top', false);
        setIsTop(!isTop);
    };

    const handlerTopWindow = () => {
        ipcRenderer.send('on-top', true);
        setIsTop(!isTop);
    };

    const handlerMinSize = () => {
        ipcRenderer.send('size-min');
        setIsMin(!isMin);
    };

    const handlerDefaultSize = () => {
        ipcRenderer.send('size-default');
        setIsMin(!isMin);
    };

    return (
        <div className={classes.header}>
            <div className={classes.controlWindowMiniLeft}>
                <span className={classes.dragPanel} title="Move this window">
                    <i className="fal fa-arrows"></i>
                </span>
                <button
                    className={classes.btnWindowMiniLeft}
                    onClick={handlerDefaultSize}
                    title="Default window size"
                >
                    <i className="fal fa-expand-arrows"></i>
                </button>
                {isTop ? (
                    <button
                        className={classes.btnWindowMiniLeft}
                        onClick={handlerDownWindow}
                        title="Unpin on top of all"
                    >
                        <i className="fal fa-arrow-from-top"></i>
                    </button>
                ) : (
                    <button
                        className={classes.btnWindowMiniLeft}
                        onClick={handlerTopWindow}
                        title="Pin on top of all"
                    >
                        <i className="fal fa-arrow-to-top"></i>
                    </button>
                )}
            </div>

            <div className={classes.controlWindowMiniRight}>
                <button
                    className={
                        classes.btnWindowMiniRight +
                        ' ' +
                        classes.closeWindowMini
                    }
                    onClick={handlerCloseWindow}
                    title="Close the program"
                >
                    <i className="fal fa-window-close" />
                </button>

                <button
                    className={classes.btnWindowMiniRight}
                    onClick={handlerMaximizeWindow}
                    title="Maximum window size"
                >
                    <i className="fal fa-window-maximize" />
                </button>

                <button
                    className={classes.btnWindowMiniRight}
                    onClick={handlerMinimizeWindow}
                    title="Minimize this window"
                >
                    <i className="fal fa-window-minimize" />
                </button>
            </div>
            <div className={classes.topBar}>
                <div className={classes.title}>
                    <img
                        src="./icons/16x16.png"
                        alt="Logo"
                        className={classes.logo}
                    />{' '}
                    Radion <span className={classes.addVersion}>{version}</span>
                    <RecordTimer isRecord={isRecord} isSave={isSave} />
                </div>
                <div className={classes.btnGroup}>
                    <div className={classes.menuListWrap}>
                        {isMenu && (
                            <div className={classes.menuList}>
                                <ul>
                                    <li>
                                        <button
                                            className={classes.saveButton}
                                            onClick={addData}
                                            title="Add to playlist"
                                        >
                                            <i className="fal fa-file-upload"></i>{' '}
                                            Add to playlist
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className={classes.openButton}
                                            onClick={openData}
                                            title="Open radio stations list"
                                        >
                                            <i className="fal fa-file-import"></i>{' '}
                                            Load a playlist
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className={classes.saveButton}
                                            onClick={writeData}
                                            title="Save radio stations"
                                        >
                                            <i className="fal fa-file-export"></i>{' '}
                                            Save a playlist
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                            className={classes.addButton}
                                            onClick={addStation}
                                            title="Add a new radio station"
                                        >
                                            <i className="fal fa-plus-circle"></i>{' '}
                                            Add a new
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className={classes.deleteButton}
                                            onClick={deleteAllModal}
                                            title="Delete all radio stations"
                                        >
                                            <i className="fal fa-minus-circle"></i>{' '}
                                            Delete all
                                        </button>
                                    </li>

                                    <li>
                                        <button
                                            className={classes.deleteButton}
                                            onClick={aboutAppModal}
                                            title="About the app"
                                        >
                                            <i className="fal fa-info-square"></i>{' '}
                                            About the app
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        )}
                        <button
                            className={classes.btnMenu}
                            onClick={() => setIsMenu(!isMenu)}
                            title="Application menu"
                        >
                            <i className="fal fa-bars"></i>
                        </button>
                    </div>
                    {isTop ? (
                        <button
                            className={classes.btnWindow}
                            onClick={handlerDownWindow}
                            title="Unpin on top of all"
                        >
                            <i className="fal fa-arrow-from-top"></i>
                        </button>
                    ) : (
                        <button
                            className={classes.btnWindow}
                            onClick={handlerTopWindow}
                            title="Pin on top of all"
                        >
                            <i className="fal fa-arrow-to-top"></i>
                        </button>
                    )}

                    <button
                        className={classes.btnWindow}
                        onClick={handlerMinSize}
                        title="Minimum window size"
                    >
                        <i className="fal fa-compress-arrows-alt"></i>
                    </button>

                    <button
                        className={classes.btnWindow}
                        onClick={handlerMinimizeWindow}
                        title="Minimize this window"
                    >
                        <i className="fal fa-window-minimize" />
                    </button>
                    {!status ? (
                        <button
                            className={classes.btnWindow}
                            onClick={handlerMaximizeWindow}
                            title="Maximum window size"
                        >
                            <i className="fal fa-window-maximize" />
                        </button>
                    ) : (
                        <button
                            className={classes.btnWindow}
                            onClick={handlerMaximizeWindow}
                            title="Default window size"
                        >
                            <i className="fal fa-window-restore"></i>
                        </button>
                    )}
                    <button
                        className={
                            classes.btnWindow + ' ' + classes.closeWindow
                        }
                        onClick={handlerCloseWindow}
                        title="Close the program"
                    >
                        <i className="fal fa-window-close" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
