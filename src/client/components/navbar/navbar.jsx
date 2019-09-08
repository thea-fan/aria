import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';
import classNames from 'classnames/bind';
var cx = classNames.bind(styles);

//------------------------COMPONENT-----------------------------

class Navbar extends React.Component {
    constructor() {
        super();
        this.state = {
            listeningAnimation: "",
            microphone: "microphone"
        }
        this.clickHandler = this.clickHandler.bind(this);
    }

    animation(){
         if (!this.props.listening){
            this.setState({listeningAnimation: "listeningAnimation"})
        } else {
            this.setState({listeningAnimation: ""})
        }
    }

    clickHandler() {
        this.props.toggleListen()
        this.animation()
    }


  render() {

    let className = cx({
        microphone: true,
        listeningAnimation: this.state.listeningAnimation,
        'mx-auto rounded-circle': true
    })

        return (
            <nav className="navbar fixed-bottom p-0">
                <div className = {className}
                style={{backgroundImage: this.props.recording? "url('https://image.flaticon.com/icons/svg/1361/1361878.svg')" : "url('https://image.flaticon.com/icons/svg/1361/1361730.svg')",
                        width: this.props.recording? '5.5rem' : '2.5rem',
                        height: this.props.recording? '5.5rem' : '2.5rem'
                    }}
                onClick={this.clickHandler}></div>
                <div className="nav nav-tabs border-bottom-0 ml-1" id="nav-tab" role="tablist">
                    <a className={`nav-item font-weight-bold ${styles.rounded} ${styles.tab}`} data-toggle="tab" href="#nav-home" role="tab" aria-selected="true">Home
                    </a>
                    <a className={`nav-item font-weight-bold ${styles.rounded} ${styles.tab}`} data-toggle="tab" href="#nav-focuses" role="tab" aria-selected="true">Focuses
                    </a>
                    <a className={`nav-item font-weight-bold ${styles.rounded} ${styles.tab}`} data-toggle="tab" href="#nav-accomplished" role="tab" aria-selected="false">Accomplished
                    </a>
                </div>
            </nav>
        )
    }
}

export default Navbar;

Navbar.propTypes = {
  recording: PropTypes.bool,
  listening: PropTypes.bool,
  toggleListen: PropTypes.func,
};