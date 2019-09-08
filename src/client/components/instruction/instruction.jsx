import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

//------------------------COMPONENT-----------------------------

class Instruction extends React.Component {

  render() {

    return (
        <div className={`d-flex pt-5 flex-column align-items-center ${styles.rounded}`} style={
                {display: this.props.recording? "block":"none"}}>
            <div className={styles.interim}>{this.props.interimText}</div>
            <div className={styles.final}>{this.props.finalText}</div>
            <p className={`mt-3 text-muted ${styles.instruction}`}>
                To end, say <i>"thank you Aria"</i>. <br/>
                To re-record, say <i>"clear message"</i> to start again.
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