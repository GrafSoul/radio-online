import React, { useState, useEffect } from 'react';

import classes from './RecordTimer.module.scss';

const RecordTimer = () => {
    const [hour, setHour] = useState(0);
    const [min, setMin] = useState(0);
    const [sec, setSec] = useState(0);
    const [ms, setMs] = useState(0);
    const [date, setDate] = useState(new Date().getTime());

    useEffect(() => {
        setInterval(updateTime, 10);
    }, []);

    const updateTime = () => {
        const data = new Date().getTime();
        const duration = data - date;
        setDate(data);

        let milliseconds = Math.floor((duration % 1000) / 10);
        let seconds = Math.floor((duration / 1000) % 60);
        let minutes = Math.floor((duration / (1000 * 60)) % 60);
        let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

        setMs(milliseconds);
        setSec(seconds);
        setMin(minutes);
        setHour(hours);
    };

    const addZero = (num) => {
        return num < 10 ? '0' + num : num;
    };

    return (
        <span className={classes.recordTime}>
            {addZero(hour)}:{addZero(min)}:{addZero(sec)}:{addZero(ms)}
        </span>
    );
};

export default RecordTimer;
