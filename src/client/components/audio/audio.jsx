import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';

//-----------------IMPORT COMPONENTS---------------------


//------------------------COMPONENT-----------------------------



class Audio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            audioInfo: "",
            audioList: []
        };
    this.renderRecording = this.renderRecording.bind(this)
    }

    componentDidMount (){
        // localStorage = JSON.parse(window.localStorage.getItem('audioInfo')) || [];
        //     this.setState({audioList: localStorage});


        const getMic = document.getElementById('mic');
        const recordButton = document.getElementById('record');
        const list = document.getElementById('recordings');

        if ('MediaRecorder' in window) {
          getMic.addEventListener('click', async () => {
            getMic.setAttribute('hidden', 'hidden');
            try {
              const stream = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
              });
              const mimeType = 'audio/webm';
              let chunks = [];
              const recorder = new MediaRecorder(stream, { type: mimeType });
              recorder.addEventListener('dataavailable', event => {
                if (typeof event.data === 'undefined') return;
                if (event.data.size === 0) return;
                chunks.push(event.data);
              });
              recorder.addEventListener('stop', () => {
                const recording = new Blob(chunks, {
                  type: mimeType
                });
                this.renderRecording(recording, list);
                chunks = [];
              });
              recordButton.removeAttribute('hidden');
              recordButton.addEventListener('click', () => {
                if (recorder.state === 'inactive') {
                  recorder.start();
                  recordButton.innerText = 'Stop';
                } else {
                  recorder.stop();
                  recordButton.innerText = 'Record';
                }
              });
            } catch {
              alert(
                'You denied access to the microphone so this demo will not work.'
              );
            }
          });
        }
    }


    renderRecording(blob, list) {
        const div = document.createElement('div');
        const audio = document.createElement('audio');

        const blobUrl = URL.createObjectURL(blob);

        let reactComponent = this

        fetch(blobUrl)
            .then(function(res) {
              res.blob().then(function(blob) {
                var size = blob.size;
                var type = blob.type;

                var reader = new FileReader();
                reader.addEventListener("loadend", function() {

                  var base64FileData = reader.result.toString();

                  var mediaFile = {
                    fileUrl: blobUrl,
                    size: blob.size,
                    type: blob.type,
                    src: base64FileData
                  };

                  reactComponent.setState({audioInfo: mediaFile});
                  reactComponent.props.addAudio(event, reactComponent.state.audioInfo)
                })
                reader.readAsDataURL(blob);
            })
        })
    }


  render() {

    let recordings;

    if (this.props.audioInfo.length > 0){
        console.log('IT COMES IN HERE!')
        recordings = this.props.audioInfo.map((item, index) => {
        return(
            <div>
                <audio src = {item.fileURL.src} controls = "controls"/>
            </div>
        )
    })

    } else {
        recordings =
            <div>
                <p>You have not recorded any audio notes yet</p>
            </div>
    }

    console.log(this.props.audioInfo[0])


    return (
      <div>
        <main>
          <div className="controls">
            <button className={styles.record} id="mic">Get Microphone</button>
            <button className={styles.record} id="record" hidden>Record</button>
          </div>
          <div id="recordings">
            {recordings}
          </div>

        </main>
      </div>
    );
  }
}


export default Audio;

Audio.propTypes = {
  audioInfo: PropTypes.array,
  addAudio: PropTypes.func
};