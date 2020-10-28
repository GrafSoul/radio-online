import React from 'react';

import classes from './ModalAllDelete.module.scss';

const ModalAllDelete = ({ deleteAllStations, deleteAllModal }) => {
    return (
        <div className={classes.modalDeleteWrap}>
            <h2>Do you really want to delete all radio stations in Radion?</h2>
            <h3>
                If you restart the app without adding your own radio stations,
                the list of radio stations will be restored
            </h3>
            <div className={classes.modalDeleteBtnWrap}>
                <button
                    className={classes.deleteBtn}
                    onClick={deleteAllStations}
                >
                    Delete
                </button>
                <button className={classes.cancelBtn} onClick={deleteAllModal}>
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ModalAllDelete;
