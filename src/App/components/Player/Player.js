import React, {useState, useRef, useEffect } from 'react';

import classes from './Player.module.scss'; 

const Player = ({station}) => {
    const audioStream = useRef(null);  
    const [isPlay, setIsPlay] = useState(false);
    const [isLive, setIsLive] = useState(true);
    const [isStop, setIsStop] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [stopVolume, setStopVolume] = useState(0.5);

    useEffect(() => {
        audioStream.current.load();
        setIsPlay(false)
    }, [station]);

    const playAudio = () => {
        if(isStop) {
            audioStream.current.src = station.url;
            audioStream.current.play();
            setIsStop(false)
            setIsPlay(true);
        } else {
            audioStream.current.play();
            setIsPlay(true);
        }
        return false;
    }

    const pauseAudio = () => {
        audioStream.current.pause();
        setIsLive(false);
        setIsPlay(false);
        return false;
    }

    const stopAudio = () => {
        audioStream.current.src = ''
        setIsStop(true)
        setIsLive(true);
        setIsPlay(false);
        return false;
    }

    const handlerLiveAudio = () => {
        if(!isLive) {   
            audioStream.current.load();
            audioStream.current.play();
            setIsLive(!isLive);
            setIsPlay(true);
        } else {
            setIsLive(true);
        }
        return false;
    }

    const handlerVolumeControl = (e) => {
        audioStream.current.volume = e.target.value;
        setVolume(e.target.value);
        return false;
    }

    const handlerToggleSound = () => {
        setStopVolume(volume);
        if(isPlay) {
            audioStream.current.volume = 0;   
            setVolume(0);
        } else {
            audioStream.current.volume = 1;
            setVolume(stopVolume);
        }
        setIsPlay(!isPlay);
        return false;
    }

    return (
        <div className={classes.audioContent}>

            <audio 
                // autoPlay
                ref={audioStream}
            >
                <source  src={station.url} type="audio/mpeg"></source>
                <source src={station.url} type="audio/ogg"></source>
            </audio>

            <div className={classes.audioName}>
                { station.station === '' ? 'Select or Add Radio Station' : station.station }
            </div>
            
            <div className={classes.audioName}>{station.category}</div>

            <div className={classes.audioControlPlay}>
                {!isPlay ?
                    <button className={classes.audioPlayBtn} onClick={playAudio}>Play</button>
                    :
                    <button className={classes.audioPauseBtn} onClick={pauseAudio}>Pause</button>
                }
                <button className={classes.audioPauseBtn} onClick={stopAudio}>Stop</button>
                <div className={classes.liveAudio}>
                {isLive ? isStop ? 'Live' : 'Live!': <button className={classes.audioReloadBtn} onClick={handlerLiveAudio}>Back to Live</button>}               
                </div>
            </div>

            <div className={classes.audioControlVolume}>
                <input type="range" value={volume}  onChange={(e) => handlerVolumeControl(e)} min={0} max={1} step={0.1}/>
                <button className={classes.audioSoundBtn} onClick={handlerToggleSound}>
                    {isPlay ? 'Off' : 'On'}
                </button>
            </div>

        </div>
    );
}

export default Player;
