import React from 'react';

import classes from '../Backdrop/Backdrop.css';

const backdrop = (props) => {
    return (
        props.showing ? 
        <div 
            className={classes.Backdrop} 
            onClick={props.clicked}>
        </div> : null
    );
}


export default backdrop;