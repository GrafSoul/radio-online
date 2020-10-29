import React, { useState } from 'react';

import classes from './Header.module.scss';

const { remote } = window.require('electron');
const mainWindow = remote.getCurrentWindow();

const Header = () => {
    const [status, setStatus] = useState(false);

    const handleMinimizeWindow = () => {
        mainWindow.hide();
    };

    const handleMaximizeWindow = () => {
        if (status) {
            mainWindow.unmaximize();
            setStatus(!status);
        } else {
            mainWindow.maximize();
            setStatus(!status);
        }
    };

    const handleCloseWindow = () => {
        mainWindow.close();
    };

    return (
        <div className={classes.header}>
            <div className={classes.topBar}>
                <div className={classes.title}>
                    <img
                        src="./icons/16x16.png"
                        alt="Logo"
                        className={classes.logo}
                    />{' '}
                    Radion <span className={classes.addVersion}>0.3.0</span>
                </div>
                <div>
                    <button
                        className={classes.btnWindow}
                        onClick={handleMinimizeWindow}
                    >
                        <i className="fal fa-window-minimize" />
                    </button>
                    {!status ? (
                        <button
                            className={classes.btnWindow}
                            onClick={handleMaximizeWindow}
                        >
                            <i className="fal fa-window-maximize" />
                        </button>
                    ) : (
                        <button
                            className={classes.btnWindow}
                            onClick={handleMaximizeWindow}
                        >
                            <i className="fal fa-window-restore"></i>
                        </button>
                    )}
                    <button
                        className={
                            classes.btnWindow + ' ' + classes.closeWindow
                        }
                        onClick={handleCloseWindow}
                    >
                        <i className="fal fa-window-close" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;
