import React from 'react';
import videojs from 'video.js'
import 'video.js/dist/video-js.css'
import './App.css'
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import './VideoResolution.css'
const  filters = ['blur','inverse','convolve','convoblur','offset','convolve2','blackandwhite','noir','bluefill','displacement']
let Resolution=null
export default class VideoPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            video:true,
            state:'',
            filter:'',
        }
    }

    componentDidMount() {
        if(window)window.videojs=videojs
        require('../Components/VideoResolution')
        this.intializeVideo()
    }
    intializeVideo=()=>{
        let data={...this.props,plugins: {
                ...this.props.plugins,
                videoJsResolutionSwitcher: {
                                                default: this.props.resolution,
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
            let Label=this.currentResolution().label
            Resolution=Label
            console.log('resolution',Resolution)
            console.info('Source changed to %s', Resolution)
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

     }
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }

    }

    handleFilter=(e)=>{
        this.setState({player:this.player})
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

    render() {
            return (
            <div style={{width: "100%"}}>
                <Row>
                    <Col>
                {this.state.video&& <div data-vjs-player style={{width:'700px'}}>
                    <video  ref={ node  => this.videoNode = node } className=" video-js vjs-big-play-centered  vjs-theme-city video-js"></video>
                </div>}
                    </Col>
                </Row>
            </div>
        )
    }
}
