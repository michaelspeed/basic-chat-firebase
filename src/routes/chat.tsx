import React from "react";
import firebase from '../utils/firebase'
import * as fr from 'firebase'
import * as moment from "moment";

interface State {
    message: string
    allMessages: any[]
}

class Chat extends React.Component<{}, State> {

    public state: State;
    messageRef: any;
    messageSub: any;

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            allMessages: []
        }
        this.messageRef = firebase.firestore().collection('messages')
    }

    componentDidMount(): void {
        this.messageSub = this.messageRef.onSnapshot(this.onMessageRead)
    }

    componentWillUnmount(): void {
        this.messageSub()
    }

    onMessageRead = (querySnapshot) => {
        const allMes: any[] = []
        querySnapshot.forEach(doc => {
            allMes.push(doc.data())
        })
        console.log(allMes)
        this.setState({
            allMessages: allMes
        })
    }

    createMessage = () => {
        if (this.state.message !== '') {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    const db = firebase.firestore();
                    const messageObj = {
                        text: this.state.message,
                        email: user.email,
                        uid: user.uid,
                        createdAt: fr.firestore.FieldValue.serverTimestamp()
                    };
                    const ref = db.collection('messages').doc();
                    ref.set(messageObj).then(value => {
                        this.setState({message: ''})
                    })
                }
            })
        }
    };


    render() {
        return (
            <React.Fragment>
                <div style={{padding: 30, display: 'flex', flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                    <textarea className="gui-textarea" placeholder="Message" style={{width: 500}}
                              value={this.state.message}
                              onChange={event1 => this.setState({message: event1.target.value})}
                    ></textarea>
                    <button className="btn btn-bordered btn-primary" onClick={this.createMessage}>Send</button>
                </div>
                <div>
                    {this.state.allMessages.map((item, index) => {
                        return (
                            <div style={{backgroundColor: 'white', padding: 20}} key={index}>
                                <div>
                                    <h6>{item.text}</h6>
                                </div>
                                <div>
                                    <span>Sent By: {item.email}</span>
                                </div>
                                {item.createdAt !== null && <div>
                                    <span>Sent On: {moment.unix(item.createdAt.seconds).format('DD - MM - YYYY, H:mm:ss')}</span>
                                </div>}
                            </div>
                        )
                    })}
                </div>
            </React.Fragment>
        )
    }
}

export default Chat
