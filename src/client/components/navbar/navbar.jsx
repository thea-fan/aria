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
            microphone: "microphone",
            audioTab: false,
            landingPg: true
        }
        this.clickHandler = this.clickHandler.bind(this);
        this.audioTabHandler = this.audioTabHandler.bind(this);
        this.notAudioTab = this.notAudioTab.bind(this);
        this.inHome = this.inHome.bind(this);
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

    audioTabHandler() {
        this.setState({audioTab: true})
    }

    notAudioTab() {
        this.setState({audioTab: false})
    }

    inHome(e) {
        e.preventDefault();
        $('#nav-tab a:nth-child(2)').tab('show');
        this.setState({landingPg: false})
    }


  render() {

    let className = cx({
        microphone: true,
        listeningAnimation: this.state.listeningAnimation,
        'mx-auto rounded-circle': true
    })

        return (
            <div>
                <nav className="navbar fixed-bottom p-0 justify-content-around">
                    <div className = {className}
                        style={{display: !this.state.landingPg?
                                    (this.state.audioTab? 'none':'block') : "none",
                                backgroundImage: this.props.recording? "url('https://image.flaticon.com/icons/svg/1361/1361878.svg')" : "url('https://image.flaticon.com/icons/svg/1361/1361730.svg')",
                                width: this.props.recording? '5.5rem' : '2.5rem',
                                height: this.props.recording? '5.5rem' : '2.5rem'
                            }}
                        onClick={this.clickHandler}>
                    </div>
                    <div style = {{display: this.state.landingPg?
                                    'none':'flex'}}
                        className="nav nav-tabs border-bottom-0 ml-1" id="nav-tab" role="tablist">
                        <a style = {{display: this.state.landingPg?
                                    'none':'none'}}
                            className={`nav-item font-weight-bold ${styles.rounded} ${styles.tab}`} data-toggle="tab" href="#nav-landing" role="tab" aria-selected="true" onClick={this.notAudioTab}>Landing
                        }
                        </a>
                        <a className={`nav-item font-weight-bold ${styles.rounded} ${styles.tab}`} data-toggle="tab" href="#nav-home" role="tab" aria-selected="true" onClick={this.notAudioTab}>Home
                        </a>
                        <a className={`nav-item font-weight-bold ${styles.rounded} ${styles.tab}`} data-toggle="tab" href="#nav-focuses" role="tab" aria-selected="false" onClick={this.notAudioTab}>Focuses
                        </a>
                        <a className={`nav-item font-weight-bold ${styles.rounded} ${styles.tab}`} data-toggle="tab" href="#nav-accomplished" role="tab" aria-selected="false" onClick={this.notAudioTab}>Accomplished
                        </a>
                        <a className={`nav-item font-weight-bold ${styles.rounded} ${styles.tab}`} data-toggle="tab" href="#nav-audio" role="tab" aria-selected="false" onClick={this.audioTabHandler}>Audio
                        </a>
                    </div>
                </nav>
                <div style = {{display: this.state.landingPg?'block':'none'}}
                    className="tab-pane fade show active" id="nav-landing" role="tabpanel">
                    <div className = {styles.landing}>
                        <p className = {styles.spacer}> Entddafhldajhflfadfadfhjlahdflhakjhdfaajkhdfjlhaldshfljahlher
                        </p>
                        <p className = {styles.tagline}>Your voice. Your notes. </p>
                        <button className = {styles.enter} onClick={this.inHome}> Enter </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Navbar;

Navbar.propTypes = {
  recording: PropTypes.bool,
  listening: PropTypes.bool,
  toggleListen: PropTypes.func,
};