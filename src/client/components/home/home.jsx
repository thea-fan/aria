import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';
import TodoItem from '../todoItem/todoItem';

//------------------------COMPONENT-----------------------------

class Home extends React.Component {
render() {

        let doneItems = [];
        let pendingItems = [];

        let listItems = this.props.todoList.map(item => {
            if (item.checked) {
                doneItems.push(item)
            } else if (!item.checked){
                pendingItems.push(item);
            }
        });

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
                <p> You have {pendingItems.length} focuses. </p>
                <p> Out of {pendingItems.length}, you have accomplished {doneItems.length}. </p>
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