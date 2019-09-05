import React from 'react';
import { hot } from 'react-hot-loader';
import styles from './style.scss';
import moment from 'moment';

//-----------------IMPORT COMPONENTS---------------------
import Listener from './components/listener/listener';
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
          listening: false,
          interimText: "",
          finalText: "",
          todoList:[
            {
                text: "Hi this is first attempt",
                created_at: "4 Sep 2019, 5:29 pm",
                updated_at: "4 Sep 2019, 5:29 pm",
                checked: false
            },
            {
                text: "second attempt",
                created_at: "5 Sep 2019, 12:29 pm",
                updated_at: "5 Sep 2019, 12:29 pm",
                checked: false
            }
          ],
          editing: false
        };
        this.toggleListen = this.toggleListen.bind(this)
        this.handleListen = this.handleListen.bind(this)
        this.checkItem = this.checkItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.updateItem = this.updateItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
    }

    toggleListen() {
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
            let todoList = this.state.todoList
            todoList.push({
                text: this.state.finalText,
                created_at: moment().format('DD MMM YYYY, h:mm a')
            })
            this.setState({todoList: todoList, finalText:""})
          }
        }

        recognition.onstart = () => {
          console.log("Start Listening!")
        }


        let finalTranscript = '';

        recognition.onresult = event => {
            let interimTranscript = ''
            for (let i = event.resultIndex; i < event.results.length; i++) {
                let transcript = event.results[i][0].transcript
                if (event.results[i].isFinal){
                    finalTranscript += transcript + ' '
                } else {
                    interimTranscript += transcript
                }
                this.setState({interimText:interimTranscript, finalText:finalTranscript})
                let transcriptArr = finalTranscript.split(' ')
                let stopCmd = transcriptArr.slice(-3, -1)

                if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening'){
                    recognition.stop()
                    recognition.onend = () => {
                        console.log('Stopped listening by voice command')
                        let finalText = transcriptArr.slice(0, -3).join(' ')
                        let todoList = this.state.todoList
                        todoList.push({
                            text: finalText,
                            created_at: moment().format('DD MMM YYYY, h:mm a')
                        })
                        this.setState({finalText:"", listening: false, todoList: todoList})
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
        this.setState({todoList: todoList});
    }

    editItem(index){
        let list = this.state.list;
        if (!this.state.editing) {
            list[index].editing = true;
            this.setState({
                list: list,
                wordEdit: list[index].todo,
                editing: true
            });
        }
        else {
            if (list[index].editing) {
                list[index].editing = false;
                this.setState({
                    list: list,
                    wordEdit: "",
                    editing: false
                });
            }
        }
    }

    updateItem(event,index,word) {
        e.preventDefault();
        let list = this.state.list;
        list[index].todo = word;
        list[index].updated_at = moment().format('DD MMM YYYY, h:mm a');
        list[index].editing = false;
        this.setState({
            list: list,
            editing: false
        });
    }

    removeItem(index) {
        let list = this.state.todoList;
        list.splice(index, 1);
        this.setState({todoList: list});
    }


  render() {




    return (
      <div className={styles.container}>
        <Listener
            listening = {this.state.listening}
            interimText = {this.state.interimText}
            finalText = {this.state.finalText}
            toggleListen = {this.toggleListen}>
        </Listener>
        <ItemList
            todoList = {this.state.todoList}
            checkItem = {this.checkItem}
            editItem = {this.editItem}
            updateItem = {this.updateItem}
            removeItem = {this.removeItem}>
        </ItemList>
        <DoneList
            todoList = {this.state.todoList}
            checkItem = {this.checkItem}
            editItem = {this.editItem}
            updateItem = {this.updateItem}
            removeItem = {this.removeItem}>
        </DoneList>
      </div>
    );
  }
}


export default hot(module)(App);