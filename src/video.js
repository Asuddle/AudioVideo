import React from 'react';
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import './App.css'
// const videojs = require('video.js').default;
import Modal from "reactstrap/es/Modal";
import SliderControl from "./SliderControl";
import {Button} from "reactstrap";
import SvgFilters from "./SvgFilters";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
// import videoJsResolutionSwitcher from 'videojs-resolution-switcher'
const  filters = ['blur','inverse','convolve','convoblur','offset','convolve2','blackandwhite','noir','bluefill','displacement']

export default class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            video:true,
            time:'',
            showSlider:props.duration,
            state:'',
            filter:'',
            videoTag:document.querySelector('video'),
            button :document.getElementById('style-btn')
        }
    }

    componentDidMount() {
        this.intializeVideo()
    }
    intializeVideo=()=>{
        this.player = videojs(this.videoNode,this.props, function onPlayerReady() {
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
    clickVideo=()=> {
            let time=this.player.duration()
        // this.setState({showSlider:true,time:time})
        // this.player.play()
    }
    handleFilter=(e)=>{
       let video=document.querySelector('video')
        this.setState({filters:e.target.value})
        if(e.target.value=='no'){
            // video.style.webkitFilter = '';
            // video.style.mozFilter = '';
            video.style.filter = '';
        }else {
            video.style.webkitFilter = 'url(#' + e.target.value + ')';
            video.style.mozFilter = 'url(#' + e.target.value + ')';
            video.style.filter = 'url(#' + e.target.value + ')';
        }
        }


    render() {
        console.log(this.state)
        if(this.player) {
            console.log('paused', this.player.paused())
        }
            return (

            <div style={{width: "100%"}}>
                <Row>
                    <Col>
                {this.state.video&& <div data-vjs-player  >
                    <video onPlay={this.clickVideo}  ref={ node  => this.videoNode = node } className=" video-js vjs-big-play-centered  vjs-theme-city video-js"   ></video>
                </div>}
                <br/>
                <br/>
                {this.props.duration&&
                <div>
                <SliderControl
                    update={this.props.currentTime}  domain={this.props.duration}
                    onUpdate={this.props.onUpdate}    UpdateOffset={this.props.updateOffset}
                />
                <br/>
                <br/>
                <br/>
                <Button onClick={this.props.setOffset}>Trim</Button>
                </div>
                }

                    </Col>
                    <Col>
                        <h3><strong>Filters</strong></h3>
              <select id="drop-down" name="carlist" style={{width:'80%'}} form="carform" onChange={(e)=>this.handleFilter(e)}>
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


// style={{width: '500px',height:'70px'}}

// clickVideo=()=> {
//     console.log('paused',this.player.paused())
//     if(!this.player.paused()){
//         let time=this.player.duration()
//         this.setState({time:this.player.duration})
//         this.props.getDuration(time)
//     }
// // }
//
// var video = document.querySelector('video'),
//     button = document.getElementById('style-btn'),
//     current = document.querySelector('button span'),
//     filters = ['blur','inverse','convolve','convoblur','offset','convolve2','blackandwhite','noir','bluefill','displacement'],
//     i = 0;
// if(document.getElementById('drop-down')!==null)
// {   document.getElementById('drop-down').addEventListener('change',function() {
//        // current.innerHTML = this.state.filters;
//     console.log(this.state)
//        // video.style.webkitFilter = 'url(#' + this.state.filters + ')';
//        // video.style.mozFilter = 'url(#' + this.state.filters + ')';
//        // video.style.filter = 'url(#' + this.state.filters + ')';
//
//    })}
// var video = document.querySelector('video'),
//     button = document.getElementById('style-btn'),
//     current = document.querySelector('button span'),
//     filters = ['blur','inverse','convolve','convoblur','offset','convolve2','blackandwhite','noir','bluefill','displacement'],
//     i = 0;
//
// // document.getElementById('style-btn').addEventListener('click',function(){
// document.getElementById('drop-down').addEventListener('change',function() {
//     current.innerHTML = this.state.filter;
//     video.style.webkitFilter = 'url(#' + this.state.filter + ')';
//     video.style.mozFilter = 'url(#' + this.state.filter + ')';
//     video.style.filter = 'url(#' + this.state.filter + ')';
//
// })

