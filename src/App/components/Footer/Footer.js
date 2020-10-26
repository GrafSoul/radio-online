import React from 'react';

import classes from './Footer.module.scss';

const Footer = ({addStation}) => {
    return (
        <div className={classes.footerContent}>
            <div className={classes.addButtonWrap}>
                <button className={classes.addButton} onClick={addStation}><i className="far fa-plus-circle"></i></button>
            </div>
        </div>
    );
}

export default Footer;
