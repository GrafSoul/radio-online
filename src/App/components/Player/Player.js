import React, { useState, useEffect, useRef } from 'react';
import AudioSpectrum from 'react-audio-spectrum';

import classes from './Player.module.scss';

import AudioCompiler from '../AudioCompiler/AudioCompiler';

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
    isRecord,
    setIsRecord,
    setIsSave,
}) => {
    const mediaRecorder = useRef();
    const stream = useRef();
    const chunks = useRef([]);

    const [status, setStatus] = useState(false);
    const [isPlay, setIsPlay] = useState(false);
    const [isLive, setIsLive] = useState(true);
    const [isStop, setIsStop] = useState(true);
    const [isSound, setIsSound] = useState(true);
    const [isVisual, setIsVisual] = useState(true);
    const [volume, setVolume] = useState(0.5);
    const [stopVolume, setStopVolume] = useState(0.5);
    const [countSound, setCountSound] = useState(1);

    useEffect(() => {
        audioStream.current.load();
        setIsPlay(false);
        setIsStop(true);
        setIsError(false);
    }, [station, audioStream, setIsError]);

    // eslint-disable-next-line no-unused-vars
    const handleMinimizeWindow = () => {
        mainWindow.hide();
    };

    // eslint-disable-next-line no-unused-vars
    const handleMaximizeWindow = () => {
        if (status) {
            mainWindow.unmaximize();
            setStatus(!status);
        } else {
            mainWindow.maximize();
            setStatus(!status);
        }
    };

    // eslint-disable-next-line no-unused-vars
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

    const handlerAudioVisual = () => {
        setIsVisual(!isVisual);
    };

    const handlerToggleRecordSound = () => {
        if (!isRecord) {
            setIsRecord(true);
            console.log('Start Record');
            let options = {
                audioBitsPerSecond: 128000,
                mimeType: 'audio/webm',
            };

            stream.current = audioStream.current.captureStream();
            mediaRecorder.current = new MediaRecorder(stream.current, options);
            mediaRecorder.current.start();
        } else {
            setIsRecord(false);
            setIsSave(true);
            console.log('Stop Record');
            mediaRecorder.current.stop();

            mediaRecorder.current.ondataavailable = (e) => {
                chunks.current = [];
                chunks.current.push(e.data);

                if (mediaRecorder.current.state === 'inactive') {
                    setCountSound(countSound + 1);

                    AudioCompiler(
                        chunks.current,
                        `${station.name}-${countSound}`,
                    );
                    setIsSave(false);
                }
            };
        }
    };

    return (
        <div className={classes.audioContent}>
            <audio id="audio-element" ref={audioStream}>
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
                                title={'Open radio station - ' + station.name}
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
                        <button
                            title={
                                isVisual
                                    ? 'To turn off the visualization'
                                    : 'Enable visualization'
                            }
                            className={classes.audioVisual}
                            onClick={handlerAudioVisual}
                        >
                            <i className="fal fa-waveform-path"></i>
                        </button>
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
                            Radion can not connect to the radio station!
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
                    <button
                        disabled={isStop ? true : false}
                        className={[
                            classes.audioRecordBtn,
                            !isStop ? classes.audioRecordActive : null,
                            isRecord ? classes.audioRecordGo : null,
                        ].join(' ')}
                        onClick={() => handlerToggleRecordSound()}
                    >
                        {!isStop ? (
                            isRecord ? (
                                <i
                                    className="fas fa-record-vinyl"
                                    title="Record Sound"
                                ></i>
                            ) : (
                                <i
                                    className="far fa-record-vinyl"
                                    title="Record Sound"
                                ></i>
                            )
                        ) : (
                            <i
                                className="fal fa-record-vinyl"
                                title="Record Sound Off"
                            ></i>
                        )}
                    </button>
                </div>
            </div>
            <div
                className={[
                    classes.analyserWrap,
                    isVisual ? classes.activeVisual : null,
                ].join(' ')}
            >
                <AudioSpectrum
                    id="audio-canvas"
                    height={78}
                    width={500}
                    audioId={'audio-element'}
                    capColor={'#4d7186'}
                    capHeight={2}
                    meterWidth={4}
                    meterCount={512}
                    meterColor={[
                        { stop: 0, color: '#000' },
                        { stop: 0.5, color: '#1f2d35' },
                        { stop: 1, color: '#1f2d35' },
                    ]}
                    gap={2}
                />
            </div>
        </div>
    );
};

export default Player;
