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


    renderRecording(blob) {

        const blobUrl = URL.createObjectURL(blob);
        let reactComponent = this

        fetch(blobUrl)
            .then(function(res) {
              res.blob().then(function(blob) {

                var reader = new FileReader();
                reader.addEventListener("loadend", function() {

                  var base64FileData = reader.result.toString();

                  var mediaFile = {
                    fileUrl: blobUrl,
                    name: "Recording-"+(reactComponent.props.audioInfo.length+1).toString(),
                    size: blob.size,
                    type: blob.type,
                    src: base64FileData
                  };

                  reactComponent.setState({audioInfo: mediaFile});
                  reactComponent.props.addAudio(event, reactComponent.state.audioInfo);

                })
                reader.readAsDataURL(blob);
            })
        })
    }


  render() {
    let recordings;

    if (this.props.audioInfo.length > 0){
        recordings = this.props.audioInfo.map((item, index) => {
        return(

            <div key = {index} className = "my-1 d-flex flex-column align-items-center">
                <p className = {`m-0 pb-1 font-weight-bold ${styles.audiotitle}`}> {item.fileURL.name} </p>
                <audio className = "my-1" src = {item.fileURL.src} controls = "controls"/>
                <small className = {styles.audioInfo}>{item.created_at}
                    <i className={`p-0 bx bx-trash ${styles.trashicon}`} onClick={() => {this.props.removeAudio(index)}}></i>
                    <hr/>
                </small>
            </div>
        )
    })

    } else {
        recordings =
            <div>
                <p>You have not recorded any audio notes yet</p>
            </div>
    }


    return (
      <div className = {`pt-3 ${styles.rounded}`}>
          <div>
            <div className={` rounded-circle mx-auto my-2 ${styles.record}`} id="mic"></div>
            <div className={` rounded-circle mx-auto my-1 ${styles.recording}`} id="record" hidden></div>
          </div>
          <div className = {`mt-4 mx-2 ${styles.yscroll}`} id="recordings">
            {recordings}
          </div>
      </div>
    );
  }
}


export default Audio;

Audio.propTypes = {
  audioInfo: PropTypes.array,
  addAudio: PropTypes.func,
  removeAudio: PropTypes.func
};