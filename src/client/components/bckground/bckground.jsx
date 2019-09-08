import React from 'react';
import styles from './style.scss';
import PropTypes from 'prop-types';

//------------------------COMPONENT-----------------------------

class Bckground extends React.Component {


  render() {

    return (
        <div className={ `${styles.waveWrapper} ${styles.waveAnimation}`}>
            <div style={
                {backgroundImage: this.props.recording? "linear-gradient(to top, #c17097 20%, #efd9e1 80%)" :"linear-gradient(to top, #d5ddec 20%, #dddbff 80%)"}}
            className={`${styles.waveWrapperInner} ${styles.bgTop}`}>
                <div className={`${styles.wave} ${styles.waveTop}`}/>
            </div>
            <div style={
                {backgroundImage: this.props.recording? "linear-gradient(to top, #c17097 20%, #efd9e1 80%)" :"linear-gradient(to top, #d5ddec 20%, #dddbff 80%)"}}
            className={`${styles.waveWrapperInner} ${styles.bgMiddle}`}>
                <div className={`${styles.wave} ${styles.waveMiddle}`}/>
            </div>
            <div style={
                {backgroundImage: this.props.recording? "linear-gradient(to top, #c17097 20%, #efd9e1 80%)" :"linear-gradient(to top, #d5ddec 20%, #dddbff 80%)"}}
            className={`${styles.waveWrapperInner} ${styles.bgBottom}`}>
                <div className={`${styles.wave} ${styles.waveBottom}`}/>
            </div>
        </div>
    );
  }
}


export default Bckground;


Bckground.propTypes = {
  recording: PropTypes.bool
};