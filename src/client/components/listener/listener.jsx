import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

//------------------------COMPONENT-----------------------------

class Listener extends React.Component {

  render() {

    return (
        <div>
            <p style={
                {display: !this.props.recording?
                (this.props.listening? "block":"none")  :"none"}}>
                Say "Hello Aria" to start recording
            </p>
            <p style={
                {display: !this.props.listening? "block":"none"}}>
                Click on the mic icon to begin
            </p>
        </div>
    );
  }
}


export default Listener;

Listener.propTypes = {
  recording: PropTypes.bool,
  listening: PropTypes.bool,
  interimText: PropTypes.string,
  finalText: PropTypes.string
};