import React from 'react'

import classes from './Toolbar.css'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'

const toolbar = (props) => (
    <div className={classes.Toolbar}>
        <DrawerToggle clicked={props.sideDrawerToggleClicked} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <div className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth} />
        </div>
    </div>
)

export default toolbar;