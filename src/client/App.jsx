import React from 'react';
import { hot } from 'react-hot-loader';
import styles from './style.scss';
import Todo from './components/todo/todo';



//------------------------COMPONENT-----------------------------

class App extends React.Component {


  render() {




    return (
      <div className={styles.container}>
        <Todo />
      </div>
    );
  }
}


export default hot(module)(App);