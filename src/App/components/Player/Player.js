import React, { useState, useEffect } from 'react';

import classes from './Player.module.scss';

const { remote } = window.require('electron');
const mainWindow = remote.getCurrentWindow();

const Player = ({
    audioStream,
    station,
    stations,
    isError,
    setIsError,
    setFavorite,
    isErrorList,
    setIsErrorList,
    openLink,
}) => {
    const [status, setStatus] = useState(false);
    const [isPlay, setIsPlay] = useState(false);
    const [isLive, setIsLive] = useState(true);
    const [isStop, setIsStop] = useState(true);
    const [isSound, setIsSound] = useState(true);
    const [volume, setVolume] = useState(0.5);
    const [stopVolume, setStopVolume] = useState(0.5);

    useEffect(() => {
        audioStream.current.load();
        setIsPlay(false);
        setIsStop(true);
        setIsError(false);
    }, [station, audioStream, setIsError]);

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

    const playAudio = () => {
        if (isStop) {
            audioStream.current.src = station.url;
            audioStream.current
                .play()
                .then(() => {
                    setIsStop(false);
                    setIsPlay(true);
                })
                .catch((error) => {
                    setIsError(true);
                    console.log('playback prevented', error);
                });
        } else {
            audioStream.current.play();
            setIsPlay(true);
        }
        return false;
    };

    const pauseAudio = () => {
        audioStream.current.pause();
        setIsLive(false);
        setIsPlay(false);
        return false;
    };

    const stopAudio = () => {
        audioStream.current.src = '';
        setIsStop(true);
        setIsLive(true);
        setIsPlay(false);
        return false;
    };

    const handlerLiveAudio = () => {
        if (!isLive) {
            audioStream.current.load();
            audioStream.current.play();
            setIsLive(!isLive);
            setIsPlay(true);
        } else {
            setIsLive(true);
        }
        return false;
    };

    const handlerVolumeControl = (e) => {
        audioStream.current.volume = e.target.value;
        setVolume(e.target.value);
        return false;
    };

    const handlerToggleSound = () => {
        setStopVolume(volume);
        if (isSound) {
            audioStream.current.volume = 0;
            setVolume(0);
            setIsSound(false);
        } else {
            audioStream.current.volume = 1;
            setVolume(stopVolume);
            setIsSound(true);
        }
        return false;
    };

    return (
        <div className={classes.audioContent}>
            <audio ref={audioStream}>
                <source src={station.url} type="audio/mpeg"></source>
                <source src={station.url} type="audio/ogg"></source>
            </audio>

            {station.name === '' || stations.length === 0 ? (
                <div className={classes.audioSelect}>
                    <span className={classes.selectOrAdd}>
                        Select or add a new radio station!
                    </span>
                </div>
            ) : null}

            {isErrorList && (
                <div
                    className={classes.errorStation}
                    onClick={() => setIsErrorList(false)}
                >
                    You are importing an invalid file!
                </div>
            )}

            <div className={classes.audioInfo}>
                {station.name === '' || stations.length === 0 ? null : (
                    <div>
                        <div className={classes.audioName}>{station.name}</div>
                        <button
                            title={'Add to favorites - ' + station.name}
                            className={classes.stationFavorite}
                            onClick={() => setFavorite(station.id)}
                        >
                            {station.favorite ? (
                                <i className="fas fa-heart"></i>
                            ) : (
                                <i className="far fa-heart"></i>
                            )}
                        </button>

                        {station.site && (
                            <span
                                title={'Open radio station - ' + station}
                                className={classes.linkBtn}
                                onClick={() =>
                                    openLink(
                                        station.id,
                                        station.name,
                                        station.site,
                                    )
                                }
                            >
                                <i className="far fa-external-link-alt"></i>
                            </span>
                        )}
                        <div className={classes.audioCategory}>
                            {station.category}
                        </div>
                    </div>
                )}
            </div>

            <div
                className={[
                    classes.controlWrap,
                    station.name === '' || stations.length === 0
                        ? classes.hidden
                        : null,
                ].join(' ')}
            >
                <div className={classes.audioControlPlay}>
                    {isError && (
                        <div
                            className={classes.errorStation}
                            onClick={() => setIsError(false)}
                        >
                            Radion can't connect to the radio station!
                        </div>
                    )}

                    {isErrorList && (
                        <div
                            className={classes.errorStation}
                            onClick={() => setIsErrorList(false)}
                        >
                            You are importing an invalid file!
                        </div>
                    )}

                    <div className={classes.audioControlPlayBtn}>
                        {!isPlay ? (
                            <button
                                className={classes.audioPlayBtn}
                                title="Play"
                                onClick={playAudio}
                            >
                                <i className="fas fa-play-circle"></i>
                            </button>
                        ) : (
                            <button
                                className={classes.audioPauseBtn}
                                title="Pause"
                                onClick={pauseAudio}
                            >
                                <i className="fas fa-pause-circle"></i>
                            </button>
                        )}
                        <button
                            className={classes.audioStopBtn}
                            title="Stop"
                            onClick={stopAudio}
                        >
                            <i className="fas fa-stop-circle"></i>
                        </button>

                        <div className={classes.liveAudio}>
                            {isLive ? (
                                isStop ? (
                                    <span className={classes.liveOff}>
                                        Live
                                    </span>
                                ) : (
                                    <span className={classes.liveOn}>
                                        <span
                                            className={classes.onlineIndicator}
                                        ></span>{' '}
                                        Live
                                    </span>
                                )
                            ) : (
                                <button
                                    className={classes.audioReloadBtn}
                                    title="Disable playback from the buffer"
                                    onClick={handlerLiveAudio}
                                >
                                    Back to Live
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className={classes.audioControlVolume}>
                    <input
                        type="range"
                        value={volume}
                        title="Volume control"
                        className={classes.volume}
                        onChange={(e) => handlerVolumeControl(e)}
                        min={0}
                        max={1}
                        step={0.1}
                    />
                    <button
                        className={classes.audioSoundBtn}
                        onClick={handlerToggleSound}
                    >
                        {!isSound ? (
                            <i
                                className="fas fa-volume-down"
                                title="Sound Off"
                            ></i>
                        ) : (
                            <i
                                className="fas fa-volume-up"
                                title="Sound On"
                            ></i>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Player;
