import React, { Component } from 'react';

import { connect } from 'react-redux';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/Sidedrawer/Sidedrawer';

import classes from '../Layout/Layout.css'
// import Wrapper from '../hoc/Wrapper';

class Layout extends Component {

state = {
    showSideDrawer: false
}

sideDrawerClosedHandler = () => {
    this.setState({showSideDrawer: false});
}

sideDrawerOpenedHandler = () => {
    this.setState({showSideDrawer: true});
}

render() {
    return(
        <>  
            <SideDrawer 
                showing={this.state.showSideDrawer} 
                closed={this.sideDrawerClosedHandler} 
            />
            <Toolbar openSideDrawer={this.sideDrawerOpenedHandler}
                isAuth={this.props.isAuthenticated}
            />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
        </>
    )   
}

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}
    

export default connect(mapStateToProps)(Layout);