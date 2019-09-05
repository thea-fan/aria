import React from 'react';
import { hot } from 'react-hot-loader';
import styles from './style.scss';
import Listener from './components/listener/listener';



//------------------------COMPONENT-----------------------------

class App extends React.Component {


  render() {




    return (
      <div className={styles.container}>
        <Listener />
      </div>
    );
  }
}


export default hot(module)(App);