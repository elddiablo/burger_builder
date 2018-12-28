import React, { Component } from 'react';

const Wrapper = (WrappedComponent, classes = null) => {
    class hoc extends Component {
        render() {
            return(
                <div className ={classes}>
                    <WrappedComponent {...this.props} />
                </div>
            );
        }
    }

    return hoc;

}

export default Wrapper;