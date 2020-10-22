import React from 'react';

import classes from './ModalDelete.module.scss';

const ModalDelete = ({ deleteStation, cancelModal }) => {
    return (
        <div className={classes.modalDeleteWrap}>
            <h2>Do you really want to delete a radio station</h2> 
            <div className={classes.modalDeleteBtnWrap}>
                <button className={classes.deleteBtn} onClick={deleteStation}>
                    Delete
                </button>
                <button  className={classes.cancelBtn}  onClick={cancelModal}>
                    Cancel
                </button>
            </div>
        </div>
    );
}

export default ModalDelete;
