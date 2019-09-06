import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

//------------------------COMPONENT-----------------------------

class Listener extends React.Component {


  render() {

    return (
        <div>
            <div className={styles.interim}>{this.props.interimText}</div>
            <div className={styles.final}>{this.props.finalText}</div>
        </div>
    );
  }
}


export default Listener;

Listener.propTypes = {
  interimText: PropTypes.string,
  finalText: PropTypes.string
};