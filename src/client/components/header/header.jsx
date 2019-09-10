import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

//------------------------COMPONENT-----------------------------

class Header extends React.Component {

  render() {

    return (
        <div className = {`container ${styles.header}`}>
            <p className = {`text-left pl-2 my-1 ${styles.logo}`}> aria </p>
            <p className = {`my-3 ${styles.greeting}`} style={
                {display: !this.props.listening? "block":"none"}}>
                Your best self in the making<br/>
                <span className = {styles.smallfont}><i>Click on the mic icon to begin</i></span>
            </p>
            <div className = {`my-3 px-2 ${styles.interim}`} style={
                {display: !this.props.recording?
                (this.props.listening? "block":"none")  :"none"}}>
                    Say <big><b>&quot Hello Aria &quot</b></big> to start recording
            </div>
            <div className = {`my-3 px-2 ${styles.interim}`} style={
                {display: this.props.recording?
                (this.props.listening? "block":"none")  :"none"}}>
                <div className={styles.bars}>
                  <div className={styles.bar}></div>
                  <div className={styles.bar}></div>
                  <div className={styles.bar}></div>
                  <div className={styles.bar}></div>
                  <div className={styles.bar}></div>
                  <div className={styles.bar}></div>
                  <div className={styles.bar}></div>
                  <div className={styles.bar}></div>
                  <div className={styles.bar}></div>
                  <div className={styles.bar}></div>
                </div>
            </div>
        </div>
    );
  }
}


export default Header;

Header.propTypes = {
  recording: PropTypes.bool,
  listening: PropTypes.bool,
  interimText: PropTypes.string,
  finalText: PropTypes.string
};