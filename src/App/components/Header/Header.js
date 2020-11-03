import React, { useState } from 'react';

import classes from './Header.module.scss';

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
}) => {
    const [status, setStatus] = useState(false);
    const [isTop, setIsTop] = useState(false);

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

    return (
        <div className={classes.header}>
            <div className={classes.controlWindowMini}>
                <button
                    className={
                        classes.btnWindowMini + ' ' + classes.closeWindowMini
                    }
                    onClick={handlerCloseWindow}
                >
                    <i className="fal fa-window-close" />
                </button>
                {!status ? (
                    <button
                        className={classes.btnWindowMini}
                        onClick={handlerMaximizeWindow}
                    >
                        <i className="fal fa-window-maximize" />
                    </button>
                ) : (
                    <button
                        className={classes.btnWindowMini}
                        onClick={handlerMaximizeWindow}
                    >
                        <i className="fal fa-window-restore"></i>
                    </button>
                )}
                <button
                    className={classes.btnWindowMini}
                    onClick={handlerMinimizeWindow}
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
                        >
                            <i className="fal fa-bars"></i>
                        </button>
                    </div>
                    {isTop ? (
                        <button
                            className={classes.btnWindow}
                            onClick={handlerDownWindow}
                        >
                            <i className="fal fa-arrow-from-top"></i>
                        </button>
                    ) : (
                        <button
                            className={classes.btnWindow}
                            onClick={handlerTopWindow}
                        >
                            <i className="fal fa-arrow-to-top"></i>
                        </button>
                    )}
                    <button
                        className={classes.btnWindow}
                        onClick={handlerMinimizeWindow}
                    >
                        <i className="fal fa-window-minimize" />
                    </button>
                    {!status ? (
                        <button
                            className={classes.btnWindow}
                            onClick={handlerMaximizeWindow}
                        >
                            <i className="fal fa-window-maximize" />
                        </button>
                    ) : (
                        <button
                            className={classes.btnWindow}
                            onClick={handlerMaximizeWindow}
                        >
                            <i className="fal fa-window-restore"></i>
                        </button>
                    )}
                    <button
                        className={
                            classes.btnWindow + ' ' + classes.closeWindow
                        }
                        onClick={handlerCloseWindow}
                    >
                        <i className="fal fa-window-close" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
