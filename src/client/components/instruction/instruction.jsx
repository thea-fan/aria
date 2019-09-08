import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

//------------------------COMPONENT-----------------------------

class Instruction extends React.Component {

  render() {

    return (
        <div style={
                {display: this.props.recording? "block":"none"}}>
            <div className={styles.interim}>{this.props.interimText}</div>
            <div className={styles.final}>{this.props.finalText}</div>
            <p>To end recording, say "Goodbye Aria" <br/>
                To re-record, say "clear message" to start again.
            </p>
        </div>
    );
  }
}


export default Instruction;

Instruction.propTypes = {
    recording: PropTypes.bool,
  interimText: PropTypes.string,
  finalText: PropTypes.string
};