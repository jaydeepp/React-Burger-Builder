import React, { useState } from 'react';
import { connect } from 'react-redux';

import Aux from '../Auxiliary/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'

import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'

import classes from './Layout.css'

const layout = props => {

    const [isSideDrawerVisible, setIsSideDrawerVisible] = useState(false)

    const hideSideDrawer = () => {
        setIsSideDrawerVisible(false)
    };

    const sideDrawerClickedHandler = () => {
        setIsSideDrawerVisible(!isSideDrawerVisible)
    };

    return (
        <Aux>
            <Toolbar isAuth={props.isAuthenticated} sideDrawerToggleClicked={sideDrawerClickedHandler} />
            <SideDrawer isAuth={props.isAuthenticated} show={isSideDrawerVisible} closed={hideSideDrawer} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Aux>
    )
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(layout);