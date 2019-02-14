import React from 'react';

import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

import classes from '../NavigationItems/NavigationItems.css';

const navigationItems = (props) => {
    return (
        <ul className={classes.NavigationItems}>    
            <NavigationItem link="/">
                Burger Builder
            </NavigationItem>

            {props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null}
            

            {!props.isAuth 
                ? <NavigationItem link="/auth">Authenticate</NavigationItem>
                : <NavigationItem link="/logout">Logout</NavigationItem>}
        </ul>
    );
}

export default navigationItems;