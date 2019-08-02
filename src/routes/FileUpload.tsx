import React from 'react';
import {compose} from "redux";
import * as firebase from "firebase";

interface State {
    progress: string
    imageURL: string
}

class FileUpload extends React.Component<{}, State> {

    myinput: any;
    public state: State

    constructor(props) {
        super(props);
        this.state = {
            progress: '0',
            imageURL: ''
        }
    }


    functionUploadFile = (file: File) => {
        const fileRef = firebase.storage().ref(`/images/${new Date()}.png`);
        const uploadTask = fileRef.put(file)
        uploadTask.on('state_changed', (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            this.setState({progress: progress.toString(10)})
        }, (error) => {
            console.log(error)
        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
                this.setState({imageURL: downloadURL})
            })
        })
    };

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        return (
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignContent: "center", alignItems: "center", paddingTop: 50}}>
                <div>
                    <input type='file' accept='image/*' style={{display: "none"}}
                           ref={generatedReference => {
                               this.myinput = generatedReference
                           }}
                           onChange={event1 => {
                               console.log(event1.target.files);
                               this.functionUploadFile(event1.target.files![0])
                           }}
                    />
                    <button className="btn btn-bordered btn-primary" onClick={() => this.myinput.click()}>Upload File</button>
                </div>
                <div>
                    <span>{this.state.progress}</span>
                </div>
                <div>
                    {this.state.imageURL !== '' && <img src={this.state.imageURL} style={{width: 200, height: 200}}/>}
                </div>
            </div>
        )
    }
}

export default compose<any>()(FileUpload)
