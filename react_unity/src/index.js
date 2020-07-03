import React from 'react';
import ReactDOM from 'react-dom';
import Unity, { UnityContent } from "react-unity-webgl";
// import './index.css';

// const unityContent = new UnityContent(
//     "/unity/build/html.json",
//     "/unity/build/UnityLoader.js"
// );

// const App = () => {
//     return <Unity unityContent={unityContent} />;
// }

const START_STATUS = "START";
const STOP_STATUS = "STOP";
const ACTIVE_STATUS = "ACTIVE";
const DEACTIVE_STATUS = "DEACTIVE";

export class App extends React.Component {
    constructor(props) {
        super(props);  
        this.unityContent = new UnityContent(
            "unity/build/html.json",
            "unity/build/UnityLoader.js"
        );
        this.state = {
            visible_state: DEACTIVE_STATUS,
            rotation_state: START_STATUS
        };
        this.onClickActive = this.onClickActive.bind(this);
        this.onClickRotation = this.onClickRotation.bind(this);
        this.onClickChangeColor = this.onClickChangeColor.bind(this);
    }

    onClickActive() {
        var active_state = ACTIVE_STATUS;
        var active = 0;
        if (this.state.visible_state === ACTIVE_STATUS){
            active_state = DEACTIVE_STATUS;
            active = 1;
        }
        this.unityContent.send("Manager", "SetActive", active);
        this.setState(
            {
                visible_state: active_state
            }
        )
    }

    onClickRotation() {
        var rotation_state = START_STATUS;
        var rotate = 0;
        if (this.state.rotation_state === START_STATUS){
            rotation_state = STOP_STATUS;
            rotate = 1;
        }
        this.unityContent.send("Manager", "SetRotation", rotate);
        this.setState(
            {
                rotation_state: rotation_state
            }
        )
    }

    onClickChangeColor() {
        this.unityContent.send("Manager", "ChangeColor");
    }
  
    render() {
        return (
            <div>
                <Unity unityContent={this.unityContent} />
                <br/>
                <div>
                    <center>
                        <button onClick={this.onClickActive}>MAKE {this.state.visible_state}</button>
                        <button onClick={this.onClickRotation}>{this.state.rotation_state} ROTATION</button>
                        <button onClick={this.onClickChangeColor}>CHANGE COLOR</button>
                    </center>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);