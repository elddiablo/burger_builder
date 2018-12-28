import React, { Component } from 'react';

import Backdrop from '../Backdrop/Backdrop';

import classes from '../Modal/Modal.css'

class Modal extends Component {

  shouldComponentUpdate(nextProps) {
    return nextProps.show !== this.props.show;
  }

  componentWillUpdate() {
      console.log("MODAL will update");
  }

  render() {
      return (
        <>
            <Backdrop showing={this.props.show} clicked={this.props.modalClosed}/>
            <div 
                className={classes.Modal}
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opactity: this.props.show ? '1' : '0'
                }}
            >   
                {this.props.children}
            </div>
        </>
    );
  }  
}

export default Modal;