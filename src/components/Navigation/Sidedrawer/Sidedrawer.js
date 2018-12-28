import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

import classes from '../Sidedrawer/Sidedrawer.css';

const sideDrawer = (props) => {
    
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.showing) 
        attachedClasses = [classes.SideDrawer, classes.Open];

    return(
    <>
            <Backdrop showing={props.showing} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')}>

            <div className={classes.Logo}>
                <Logo/>
            </div>
            <nav>
                <NavigationItems />
            </nav>
        </div>
    </>
    );
}

export default sideDrawer;