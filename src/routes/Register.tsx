import React from 'react';
import firebase from '../utils/firebase'

interface State {
    email: string
    pass: string
    newpass: string
}
class Register extends React.Component<{}, State> {

    public state: State;

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            newpass: ''
        }
    }

    componentDidMount(): void {
        firebase.auth().onAuthStateChanged(value => {
            console.log(value)
        })
    }

    handleEmailChange = (event) => this.setState({email: event.target.value});
    handlePassChange = (event) => this.setState({pass: event.target.value});
    handleNewPassChange = (event) => this.setState({newpass: event.target.value});

    createAccount = () => {
        if (this.state.newpass === this.state.pass) {
            firebase.auth().createUserWithEmailAndPassword(
                this.state.email,
                this.state.pass
            ).then(value => console.log(value)
            ).catch(error => {
                console.log(error)
                if (error.code === 'auth/email-already-in-use') {
                    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.pass)
                        .then(value => console.log(value))
                        .catch(error1 => console.log(error1))
                }
            })
        }
    }

    logout = () => {
        firebase.auth().onAuthStateChanged(value => {
            if (value) {
                firebase.auth().signOut()
            }
        })
    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <React.Fragment>
                <div id="main" className="animated fadeIn">

                    <section id="content_wrapper">

                        <div id="canvas-wrapper">
                            <canvas id="demo-canvas"></canvas>
                        </div>

                        <section id="content" className="">

                            <div className="allcp-form theme-primary mw600" id="register">
                                <div className="bg-primary mw600 text-center mb20 br3 pt15 pb10">
                                    <img src="assets/img/logo.png" alt=""/>
                                </div>
                                <div className="panel panel-primary">
                                    <div className="panel-heading pn">
                                    <span className="panel-title">
                                      Registration form
                                    </span>
                                    </div>

                                    <div>
                                        <div className="panel-body pn">


                                            <div className="section">
                                                <label htmlFor="email" className="field prepend-icon">
                                                    <input type="email" name="email" id="email" className="gui-input"
                                                           placeholder="Email address" onChange={event1 => this.handleEmailChange(event1)}/>
                                                    <span className="field-icon">
                                        <i className="fa fa-envelope"></i>
                                    </span>
                                                </label>
                                            </div>


                                            <div className="section">
                                                <label htmlFor="password" className="field prepend-icon">
                                                    <input type="password" name="password" id="password"
                                                           className="gui-input"
                                                           placeholder="Create a password" onChange={event1 => this.handlePassChange(event1)}/>
                                                    <span className="field-icon">
                                        <i className="fa fa-lock"></i>
                                    </span>
                                                </label>
                                            </div>


                                            <div className="section">
                                                <label htmlFor="confirmPassword" className="field prepend-icon">
                                                    <input type="password" name="confirmPassword" id="confirmPassword"
                                                           className="gui-input"
                                                           placeholder="Retype your password" onChange={event1 => this.handleNewPassChange(event1)}/>
                                                    <span className="field-icon">
                                        <i className="fa fa-unlock-alt"></i>
                                    </span>
                                                </label>
                                            </div>


                                            <div className="section">
                                                <div className="pull-right">
                                                    <button className="btn btn-bordered btn-primary"
                                                            onClick={this.createAccount}
                                                    >I
                                                        Accept - Create Account
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="section">
                                                <div className="pull-right">
                                                    <button className="btn btn-bordered btn-danger"
                                                            onClick={this.logout}
                                                    >I
                                                        Logout
                                                    </button>
                                                </div>
                                            </div>


                                        </div>

                                        <div className="panel-footer">

                                        </div>

                                    </div>
                                </div>
                            </div>


                        </section>


                    </section>


                </div>
            </React.Fragment>
        )
    }
}

export default Register
