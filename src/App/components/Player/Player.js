import React, {useState, useEffect } from 'react';

import classes from './Player.module.scss'; 

const Player = ({audioStream, station, stations}) => {
 
    const [isPlay, setIsPlay] = useState(false);
    const [isLive, setIsLive] = useState(true);
    const [isStop, setIsStop] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [stopVolume, setStopVolume] = useState(0.5);

    useEffect(() => {
        audioStream.current.load();
        setIsPlay(false)
    }, [station, audioStream]);

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
                ref={audioStream}
            >
                <source  src={station.url} type="audio/mpeg"></source>
                <source src={station.url} type="audio/ogg"></source>
            </audio>

            <div className={classes.audioInfo}>
                <div className={classes.audioName}>
                    { station.station === '' || stations.length === 0 ?
                    'Select or Add Radio Station' : station.station }

                </div>
                <div className={classes.audioCategory}>{station.category}</div>
            </div>  

            <div className={[classes.controlWrap, 
                station.station === '' ||
                stations.length === 0  ?
                classes.hidden : null].join(' ')}>             

                <div className={classes.audioControlPlay}>
                    <div className={classes.audioControlPlayBtn}>                    
                        {!isPlay ?
                            <button className={classes.audioPlayBtn} onClick={playAudio}><i className="fas fa-play-circle"></i></button>
                            :
                            <button className={classes.audioPauseBtn} onClick={pauseAudio}><i className="fas fa-pause-circle"></i></button>
                        }
                        <button className={classes.audioStopBtn} onClick={stopAudio}><i className="fas fa-stop-circle"></i></button>

                        <div className={classes.liveAudio}>
                            {isLive ? isStop ? <span className={classes.liveOff}>Live</span> : 
                            <span className={classes.liveOn}><span className={classes.onlineIndicator}></span> Live</span> : 
                            <button className={classes.audioReloadBtn} onClick={handlerLiveAudio}>Back to Live</button>}               
                        </div>
                    </div>
                </div>

                <div className={classes.audioControlVolume}>
                    <input type="range" value={volume} className={classes.volume}  onChange={(e) => handlerVolumeControl(e)} min={0} max={1} step={0.1}/>
                    <button className={classes.audioSoundBtn} onClick={handlerToggleSound}>
                        {isPlay ? <i className="fas fa-volume-down"></i> : <i className="fas fa-volume-up"></i>}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Player;
