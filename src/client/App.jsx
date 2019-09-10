import React from 'react';
import { hot } from 'react-hot-loader';
import styles from './style.scss';
import { Route, Link } from "react-router-dom";
import moment from 'moment';

let localStorage = [];

//-----------------IMPORT COMPONENTS---------------------
import Bckground from './components/bckground/bckground';
import Home from './components/home/home';
import Navbar from './components/navbar/navbar';
import Header from './components/header/header';
import Instruction from './components/instruction/instruction';
import Audio from './components/audio/audio';
import ItemList from './components/itemList/itemList';
import DoneList from './components/doneList/doneList';


//-----------------SPEECH RECOGNITION SETUP---------------------

const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
const recognition = new SpeechRecognition()

recognition.continous = true
recognition.interimResults = true
recognition.lang = 'en-US'

//------------------------COMPONENT-----------------------------

class App extends React.Component {

    constructor() {
        super();
        this.state = {
          recording: false,
          listening: false,
          interimText: "",
          finalText: "",
          editing: false,
          todoList:[
            {
                text: "Hi this is first attempt",
                created_at: "4 Sep, 5:29 pm",
                updated_at: "4 Sep, 5:29 pm",
                checked: false
            },
            {
                text: "second attempt",
                created_at: "5 Sep, 12:29 pm",
                updated_at: "5 Sep, 12:29 pm",
                checked: true
            }
          ],
          audioInfo:[]
        };
        this.toggleListen = this.toggleListen.bind(this)
        this.handleListen = this.handleListen.bind(this)
        this.checkItem = this.checkItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.addAudio = this.addAudio.bind(this);
    }

    componentDidMount() {
    localStorage = JSON.parse(window.localStorage.getItem('todoList')) || this.state.todoList;
    let audioLocalStorage = JSON.parse(window.localStorage.getItem('audioInfo')) || this.state.audioInfo;
    this.setState({todoList: localStorage, audioInfo: audioLocalStorage});
  }

    toggleListen() {
        console.log("entered")
        this.setState({listening: !this.state.listening}, this.handleListen)
    }

    handleListen(){
        console.log('listening?', this.state.listening);

        if (this.state.listening) {
          recognition.start()
          recognition.onend = () => {
            console.log("...user is pausing, continue listening...")
            recognition.start();
          }
        } else {
          recognition.stop()
          recognition.onend = () => {
            console.log("Stopped listening by click")
            if (this.state.finalText != ""){
                let todoList = this.state.todoList
                todoList.push({
                    text: this.state.finalText,
                    created_at: moment().format('DD MMM, h:mm a'),
                    updated_at: moment().format('DD MMM, h:mm a'),
                    checked: false
                })
                this.setState({todoList: todoList, finalText:"", recording:false}, () => {
                    window.localStorage.setItem("todoList", JSON.stringify(this.state.todoList))
                })
            } else {
                this.setState({recording:false})
            }
            console.log('recording?', this.state.recording)
          }
        }

        let finalTranscript = '';

        recognition.onresult = event => {
            let interimTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                let transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal){
                    finalTranscript += transcript + ' '
                } else {
                    interimTranscript += transcript
                }

                let transcriptArr = finalTranscript.split(' ')
                let ariaIndex;

                if (transcriptArr.includes("hello")) {
                    console.log(transcriptArr);
                    let helloIndex = transcriptArr.lastIndexOf("hello");
                    ariaIndex = helloIndex+2;
                    let startCmd = transcriptArr.slice(helloIndex, ariaIndex);
                    if (startCmd[0] === 'hello' && startCmd[1] === 'Aria'){
                        let recordedText = transcriptArr.slice(ariaIndex).join(' ')
                        this.setState({interimText:interimTranscript, finalText:recordedText, recording:true}, () => console.log('recording?', this.state.recording))
                    }
                }

                if (transcriptArr.includes("clear")) {
                    let helloIndex = transcriptArr.lastIndexOf("clear");
                    ariaIndex = helloIndex+2;
                    let startCmd = transcriptArr.slice(helloIndex, ariaIndex);
                    if (startCmd[0] === 'clear' && startCmd[1] === 'message'){
                        let recordedText = transcriptArr.slice(ariaIndex).join(' ');
                        this.setState({interimText:interimTranscript, finalText:recordedText, recording:true})
                    }
                }

                //**************************** STUPID OK NEXT COMMAND
                if (transcriptArr.includes("okay")) {
                    let helloIndex = transcriptArr.lastIndexOf("okay");
                    ariaIndex = helloIndex+2;
                    let startCmd = transcriptArr.slice(helloIndex, ariaIndex);
                    if (startCmd[0] === 'okay' && startCmd[1] === 'next'){
                        let recordedText = transcriptArr.slice(ariaIndex, -3).join(' ');
                        let todoList = this.state.todoList
                        todoList.push({
                            text: recordedText,
                            created_at: moment().format('DD MMM, h:mm a'),
                            updated_at: moment().format('DD MMM, h:mm a'),
                            checked: false
                        })
                        this.setState({finalText:"", interimText:interimTranscript, recording:true, todoList: todoList}, () => {
                            window.localStorage.setItem("todoList", JSON.stringify(this.state.todoList))
                        })
                    }
                }
                //****************************

                let stopCmd = transcriptArr.slice(-4);

                if (stopCmd[0] === 'thank' && stopCmd[1] === 'you' && stopCmd[2] === 'Aria'){
                    //recognition.stop()
                    recognition.onend = () => {
                        console.log('Stopped recording by voice command')
                        if (this.state.finalText != stopCmd.join(" ")){
                                let finalText = transcriptArr.slice(ariaIndex, -4).join(' ')
                                let todoList = this.state.todoList
                                todoList.push({
                                    text: finalText,
                                    created_at: moment().format('DD MMM, h:mm a'),
                                    updated_at: moment().format('DD MMM, h:mm a'),
                                    checked: false
                                })
                                this.setState({finalText:"", recording: false, todoList: todoList}, () => {
                                    window.localStorage.setItem("todoList", JSON.stringify(this.state.todoList))
                                    this.handleListen();
                                })
                        } else {
                            this.setState({recording: false, finalText:""})
                            this.handleListen();
                        }
                    }
                }
            }
        }
    }


    checkItem(index) {
        let todoList = this.state.todoList;
        if(todoList[index].checked) {
            todoList[index].checked = false
        }
        else {
            todoList[index].checked = true;
        }
        this.setState({todoList: todoList}, () => {
            window.localStorage.setItem("todoList", JSON.stringify(this.state.todoList))
        })
    }

    editItem(index){
        let list = this.state.todoList;
        if (!this.state.editing) {
            list[index].editing = true;
            this.setState({
                todoList: list,
                todoItem: list[index].text,
                editing: true
            });
        }
        else {
            if (list[index].editing) {
                list[index].editing = false;
                this.setState({
                    todoList: list,
                    todoItem: "",
                    editing: false
                });
            }
        }
    }

    updateItem(event,index,word) {
        event.preventDefault();
        let todoList = this.state.todoList;
        todoList[index].text = word;
        todoList[index].updated_at = moment().format('DD MMM, h:mm a');
        todoList[index].editing = false;
        this.setState({
            todoList: todoList,
            editing: false
        }, () => {
            window.localStorage.setItem("todoList", JSON.stringify(this.state.todoList))
        })
    }

    removeItem(index) {
        let todoList = this.state.todoList;
        todoList.splice(index, 1);
        this.setState({todoList: todoList}, () => {
            window.localStorage.setItem("todoList", JSON.stringify(this.state.todoList))
        })
    }

    addAudio(event, URL){
        event.preventDefault();
        console.log(this.state.audioInfo)
        let audioInfo = this.state.audioInfo;
            audioInfo.push({
                fileURL: URL,
                created_at: moment().format('DD MMM, h:mm a')
            });
            this.setState({
                audioInfo: audioInfo
            }, () => {
            window.localStorage.setItem("audioInfo", JSON.stringify(this.state.audioInfo));
            })
    }


  render() {


    return (
      <div className={styles.container}>
        <Bckground
            recording = {this.state.recording}>
         </Bckground>




        <div className = "col-12">
            <div style={
                {display: this.state.recording? "block":"none"}}>
                <Header
                    recording = {this.state.recording}
                    listening = {this.state.listening}
                    interimText = {this.state.interimText}
                    finalText = {this.state.finalText}>
                </Header>
                <Instruction
                    recording = {this.state.recording}
                    interimText = {this.state.interimText}
                    finalText = {this.state.finalText}>
                </Instruction>
            </div>
            <div style={
                {display: !this.state.recording? "block":"none"}}
                className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" >
                    <Home
                        recording = {this.state.recording}
                        listening = {this.state.listening}
                        todoList = {this.state.todoList}>
                    </Home>
                </div>

                <div className="tab-pane fade" id="nav-focuses" role="tabpanel" >
                    <Header
                        recording = {this.state.recording}
                        listening = {this.state.listening}
                        interimText = {this.state.interimText}
                        finalText = {this.state.finalText}>
                    </Header>
                    <ItemList
                        todoList = {this.state.todoList}
                        checkItem = {this.checkItem}
                        editItem = {this.editItem}
                        updateItem = {this.updateItem}
                        removeItem = {this.removeItem}>
                    </ItemList>
                </div>


                <div className="tab-pane fade" id="nav-accomplished" role="tabpanel" >
                    <Header
                        recording = {this.state.recording}
                        listening = {this.state.listening}
                        interimText = {this.state.interimText}
                        finalText = {this.state.finalText}>
                    </Header>
                    <DoneList
                        todoList = {this.state.todoList}
                        checkItem = {this.checkItem}
                        editItem = {this.editItem}
                        updateItem = {this.updateItem}
                        removeItem = {this.removeItem}>
                    </DoneList>
                </div>
                <div className="tab-pane fade" id="nav-audio" role="tabpanel" >
                    <Header
                        recording = {this.state.recording}
                        listening = {this.state.listening}
                        interimText = {this.state.interimText}
                        finalText = {this.state.finalText}>
                    </Header>
                    <Audio
                        audioInfo = {this.state.audioInfo}
                        addAudio = {this.addAudio}>
                    </Audio>
                </div>
            </div>
        </div>
        <Navbar
            recording = {this.state.recording}
            listening = {this.state.listening}
            toggleListen = {this.toggleListen}>
        </Navbar>
      </div>
    );
  }
}


export default hot(module)(App);