import React from 'react';
import classes from './ModalAbout.module.scss';

const ModalAbout = ({ version, aboutAppModal, openLink }) => {
    return (
        <div className={classes.aboutApp} onClick={aboutAppModal}>
            <div className={classes.aboutAppContent}>
                <div className={classes.title}>
                    <img
                        src="./icons/24x24.png"
                        alt="Logo"
                        className={classes.logo}
                    />{' '}
                    Radion <span className={classes.addVersion}>{version}</span>
                </div>
                <div className={classes.info}>
                    Applications for listening to the broadcast of radio
                    stations.
                </div>
                <div className={classes.author}>
                    Created by Dmitriy Zatulovskiy
                </div>
                <div className={classes.author}>
                    © 2020 |{' '}
                    <span
                        className={classes.link}
                        onClick={() =>
                            openLink('https://github.com/GrafSoul/radio-online')
                        }
                    >
                        GitHub
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ModalAbout;
