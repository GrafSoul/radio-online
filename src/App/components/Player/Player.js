import React, {useState, useRef } from 'react';
// import ReactPlayer from 'react-player'

import classes from './Player.module.scss' 

const Player = () => {
    const audioStream = useRef(null);
    const [isPlay, setIsPlay] = useState(true)
    const [isLive, setIsLive] = useState(true)
    const [volume, setVolume] = useState(0.5)
    const [stopVolume, setStopVolume] = useState(0.5)

    const playAudio = () => {
        audioStream.current.play();
        return false;
    }

    const pauseAudio = () => {
        audioStream.current.pause();
        setIsLive(false);
        return false;
    }

    const handlerLiveAudio = () => {
        if(!isLive) {
            audioStream.current.load();
            setIsLive(!isLive);
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
        setIsPlay(!isPlay)
        return false;
    }

    return (
        <div className={classes.audioContent}>

            <audio 
                autoPlay
                ref={audioStream}
            >
                <source  src="http://us5.internet-radio.com:8166/stream?type=http&nocache=184" type="audio/mpeg"></source>
                <source src="http://us5.internet-radio.com:8166/stream?type=http&nocache=184" type="audio/ogg"></source>
            </audio>

            <div className={classes.audioName}>Radio 101</div>

            <div className={classes.audioControlPlay}>
                <button className={classes.audioPlayBtn} onClick={playAudio}>Play</button>
                <button className={classes.audioPauseBtn} onClick={pauseAudio}>Pause</button>
                <div className={classes.liveAudio}>
                {isLive ? 'Live' : <button className={classes.audioReloadBtn} onClick={handlerLiveAudio}>Back to Live</button>}               
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