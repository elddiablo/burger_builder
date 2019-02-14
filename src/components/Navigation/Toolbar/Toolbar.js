import React from 'react';

import Logo from '../../Logo/Logo';
import NavigatonItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../Sidedrawer/DrawerToggle/DrawerToggle.js';

import classes from '../Toolbar/Toolbar.css';

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.openSideDrawer}/>
        <div className={classes.Logo}>
            <Logo/>
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigatonItems isAuth={props.isAuth}/>
        </nav>
    </header>
)

export default toolbar