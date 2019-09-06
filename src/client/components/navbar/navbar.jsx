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
        'mx-auto rounded-circle mb-3': true
    })

        return (
            <nav className="navbar fixed-bottom">
                <div id = 'microphone' className = {className}
                style={{backgroundImage: this.props.recording? "url('https://image.flaticon.com/icons/svg/1361/1361878.svg')" : "url('https://image.flaticon.com/icons/svg/1361/1361730.svg')",
                        width: this.props.recording? '5.5rem' : '2.5rem',
                        height: this.props.recording? '5.5rem' : '2.5rem'
                    }}
                onClick={this.clickHandler}></div>
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