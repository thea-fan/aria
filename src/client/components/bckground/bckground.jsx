import React from 'react';
import styles from './style.scss';

//------------------------COMPONENT-----------------------------

class Bckground extends React.Component {


  render() {

    return (
        <div className={ `${styles.waveWrapper} ${styles.waveAnimation}`}>
            <div className={`${styles.waveWrapperInner} ${styles.bgTop}`}>
                <div className={`${styles.wave} ${styles.waveTop}`}/>
            </div>
            <div className={`${styles.waveWrapperInner} ${styles.bgMiddle}`}>
                <div className={`${styles.wave} ${styles.waveMiddle}`}/>
            </div>
            <div className={`${styles.waveWrapperInner} ${styles.bgBottom}`}>
                <div className={`${styles.wave} ${styles.waveBottom}`}/>
            </div>
        </div>
    );
  }
}


export default Bckground;