import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

//------------------------COMPONENT-----------------------------

class Listener extends React.Component {


  render() {

    return (
        <div>
            <button style={{background: this.props.recording? "Salmon" : "lightblue"}}id='microphone-btn' className={styles.button} onClick={this.props.toggleListen}>Listen</button>
            <div className={styles.interim}>{this.props.interimText}</div>
            <div className={styles.final}>{this.props.finalText}</div>
        </div>
    );
  }
}


export default Listener;

Listener.propTypes = {
  recording: PropTypes.bool,
  toggleListen: PropTypes.func,
  interimText: PropTypes.string,
  finalText: PropTypes.string
};