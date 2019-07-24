import React from "react";
import * as fr from 'firebase'
import * as moment from "moment";
import {compose} from "redux";
import {firestoreConnect, isLoaded} from "react-redux-firebase";
import {connect} from 'react-redux'

interface State {
    message: string
    allMessages: any[]
}

interface Props {
    messages: any[]
}

class Chat extends React.Component<Props, State> {

    public state: State;
    messageRef: any;
    messageSub: any;

    constructor(props) {
        super(props);
        this.state = {
            message: '',
            allMessages: []
        }
    }

    componentDidMount(): void {
    }

    componentWillUnmount(): void {
    }

    createMessage = () => {
        /*if (this.state.message !== '') {
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
        }*/
    };


    render() {
        console.log(this.props)
        return (
            <React.Fragment>
                <div style={{padding: 30, display: 'flex', flexDirection: "row", justifyContent: "space-around", alignItems: "center"}}>
                    <textarea className="gui-textarea" placeholder="Message" style={{width: 500}}
                              value={this.state.message}
                              onChange={event1 => this.setState({message: event1.target.value})}
                    ></textarea>
                    <button className="btn btn-bordered btn-primary" onClick={this.createMessage}>Send</button>
                </div>
                {isLoaded(this.props.messages) && <div>
                    {this.props.messages.map((item, index) => {
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
                </div>}
            </React.Fragment>
        )
    }
}

export default compose<any>(
    firestoreConnect(['messages']),
    connect((state) => ({
        messages: state.firestore.ordered.messages
    }))
)(Chat)
