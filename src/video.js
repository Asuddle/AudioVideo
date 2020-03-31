import React from 'react';
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import './App.css'
import SliderControl from "./SliderControl";
import {Button} from "reactstrap";
import SvgFilters from "./SvgFilters";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
const  filters = ['blur','inverse','convolve','convoblur','offset','convolve2','blackandwhite','noir','bluefill','displacement']

export default class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            video:true,
            showSlider:props.duration,
            state:'',
            filter:'',
        }
    }

    componentDidMount() {
        if(window)window.videojs=videojs
        require('./VideoResolution')
        // require('videojs-resolution-switcher')
        this.intializeVideo()
    }
    intializeVideo=()=>{
        let data={...this.props,plugins: {
                ...this.props.plugins,
                videoJsResolutionSwitcher: {
                                                default: '480p',
                                                dynamicLabel: true
                                                }}}

        this.player = videojs(this.videoNode,data, function onPlayerReady() {
            console.log('onPlayerReady', this)
        });
        this.props.getPlayer(this.player)
        var lengthOfVideo = this.player.duration();
        console.log('duration',lengthOfVideo)

        videojs.addLanguage('es', {
            Play: 'Reproducción',
            Pause: 'Pausa',
            'Current Time': 'Tiempo reproducido',
            'Duration': 'Duración total',
            'Remaining Time': 'Tiempo restante',
        });
        this.player.on('resolutionchange', function(){
            console.info('Source changed')
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
     if(prevProps!==this.props){
        if (prevProps.plugins.offset.start !== this.props.plugins.offset.start
            || this.props.plugins.offset.end !== prevProps.plugins.offset.end) {
            this.player._offsetStart = this.props.plugins.offset.start
            this.player._offsetEnd = this.props.plugins.offset.end
        }
        if(this.props.currentTime[0]!==prevProps.currentTime[0]) {
            this.player.currentTime(Math.floor(this.props.currentTime[0]))
        }

        if (typeof this.props.sources[0] === "undefined") {
            this.setState({video: false})
        } else {
            this.player.src({
                type: this.props.sources[0].type,
                src: this.props.sources[0].src
            });
        }
         // this.player.pause();
     }
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }

    }

    handleFilter=(e)=>{
       let video=document.querySelector('video')
        if(this.props.handleFilter){
            this.props.handleFilter(e.target.value)
        }
        this.setState({filter:e.target.value})
        if(e.target.value=='no'){
            video.style.filter = '';
        }else {
            video.style.webkitFilter = 'url(#' + e.target.value + ')';
            video.style.mozFilter = 'url(#' + e.target.value + ')';
            video.style.filter = 'url(#' + e.target.value + ')';
        }

        }

    onPlay=()=>{
        console.log(this.player.videoHeight());
        console.log(this.player.videoWidth());
    }
    render() {
            console.log(this.player)
        // this.player.on('resolutionchange', function() {
        //     console.log('dasds')
        //     // console.info('Source changed to %s', this.player.src());
        // });
            return (
            <div style={{width: "100%"}}>
                <Row>
                    <Col>
                {this.state.video&& <div data-vjs-player style={{width:'500px'}}>
                    <video onPlay={this.onPlay}  ref={ node  => this.videoNode = node } className=" video-js vjs-big-play-centered  vjs-theme-city video-js"></video>
                </div>}
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
                    <Col>
                        <h3><strong>Filters</strong></h3>
              <select id="drop-down" style={{width:'80%'}} onChange={(e)=>this.handleFilter(e)}>
                  { <React.Fragment>
                      <option value='no' defaultChecked>none</option>
                      {filters.map(item=>{
                          return (
                          <option value={item}>{item}</option>
                          )
                      })}
                  </React.Fragment>
                  }
                </select>
                    </Col>
                </Row>
            <SvgFilters/>
            </div>

        )
    }
}

// clickVideo=()=> {
//         let time=this.player.duration()
//     // this.setState({showSlider:true,time:time})
//     // this.player.play()
// }