import React from 'react';
import 'video.js/dist/video-js.css'
import './App.css'
import SliderControl from "./SliderControl";
import {Button} from "reactstrap";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import DataContext from "./DataContext";

export default class Slider extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            video:true,
            showSlider:props.duration,
            state:'',
            filter:'',
            player:DataContext
        }
    }

    render() {
        return (
                <div style={{width: "55%%"}}>
                <Row>
                    <Col>
                        <br/>
                        <br/>
                        {this.props.duration&&
                        <React.Fragment>
                            <SliderControl
                                update={this.props.currentTime}  domain={this.props.duration}
                                onUpdate={this.props.onUpdate}    UpdateOffset={this.props.updateOffset}
                            />
                            <br/>
                            <br/>
                            <Button onClick={this.props.setOffset}>Trim</Button>
                        </React.Fragment>
                        }
                    </Col>
                </Row>
            </div>

        )
    }
}

// clickVideo=()=> {
//         let time=this.player.duration()
//     // this.setState({showSlider:true,time:time})
//     // this.player.play()
// }