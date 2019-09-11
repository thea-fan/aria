import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';


//------------------------COMPONENT-----------------------------

class Home extends React.Component {

    constructor() {
        super();
        this.audioTab = this.audioTab.bind(this);
    }

    doneTab(e){
        e.preventDefault();
        $('#nav-tab a:nth-child(3)').tab('show');
    }

    focusTab(e){
        e.preventDefault();
        $('#nav-tab a:nth-child(4)').tab('show');
    }


    audioTab(e){
        e.preventDefault();
        $('#nav-tab a:nth-child(5)').tab('show');
    }



render() {

        let doneItems = [];
        let pendingItems = [];

        this.props.todoList.map(item => {
            if (item.checked) {
                doneItems.push(item)
            } else if (!item.checked){
                pendingItems.push(item);
            }
        });

        let focuses;
        let focusFn = (array) =>{
            if (array.length >1){
                return focuses = "focuses"
            } else{
                return focuses = "focus"
            }
        }

        let pendingStats = (
            <p className = "mb-1"> You have {pendingItems.length} {focusFn(pendingItems)} left.</p>
        )

        let doneStats = (
            <p className = "mb-1"> Out of {this.props.todoList.length} {focusFn(this.props.todoList)}, you have accomplished {doneItems.length}.</p>
        )



        return (
            <div className = {`${styles.header}`}>
                <p className = {`text-left pl-3 mt-2 ${styles.logo}`}> aria </p>
                <div className = {styles.graphics}/>
            <p className = {`mb-2 ${styles.greeting}`} style={
                {display: !this.props.listening? "block":"none"}}>
                Your best self in the making<br/>
                <span className = {styles.smallfont}><i>Click on the mic icon to begin</i></span>
            </p>
            <p className = {`mb-4 px-2 ${styles.interim}`} style={
                {display: !this.props.recording?
                (this.props.listening? "block":"none")  :"none"}}>
                Say <big><b>"Hello Aria"</b></big> to start recording
            </p>
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
            <div className = {`pt-3 ${styles.rounded}`}>
                <div className = "my-2">
                {pendingStats}
                {doneStats}
                </div>

                <div className = "my-2 row justify-content-center">
                    <div className = {`mx-1 d-flex align-items-center justify-content-center ${styles.itemdiv}`} onClick = {this.focusTab}><i className={`bx bx-list-ul ${styles.iconstyle}`}></i></div>
                    <div className = {` mx-1 d-flex align-items-center justify-content-center ${styles.itemdiv}`}><i className={`bx bx-list-check ${styles.iconstyle}`} onClick = {this.doneTab}></i></div>
                </div>
                    <div className = {`ml-4 d-flex align-items-center justify-content-center ${styles.audiodiv}`} onClick = {this.audioTab}>
                        <i className={`bx bx-voicemail ${styles.iconstyle}`}></i>
                    </div>
            </div>
        </div>
        )
    }
}

export default Home;

Home.propTypes = {
  todoList: PropTypes.array,
  recording: PropTypes.bool,
  listening: PropTypes.bool
};