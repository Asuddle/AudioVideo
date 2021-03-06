
import React,{ useState } from 'react';
import Videojs from './video.js';
import hotkeys from 'videojs-hotkeys'
import offset from "videojs-offset";
import overlay from 'videojs-overlay'
import spriteThumbnails from 'videojs-sprite-thumbnails'
import titleoverlay from 'videojs-titleoverlay'

import test1 from './images/test1.jpg'
import test2 from './images/test2.jpeg'
import test3 from './images/test3.jpeg'
import test4 from './images/test4.jpeg'
import test5 from './images/test5.jpg'
import test6 from './images/test6.jpg'
import test7 from './images/test7.jpg'
import test8 from './images/test8.jpg'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import Slider from "./Slider";
import SvgFilters from "./Filter/SvgFilters";
const  filters = ['blur','inverse','convolve','convoblur','offset','convolve2','blackandwhite','noir','bluefill','displacement']

let Filter=''
let GetPlayer=''
const Overview = () =>{

    let images=[test1,test2,test3,test4,test5,test6,test7,test8]
    // let images=[1,2,3,4,5,6,7]
    const defaultValues = [250, 350]
    const[domain,setDomain]=useState([0,100])
    const[update,setUpdate]=useState(defaultValues.slice())
    const[sprite,setSprite]=useState(false)


    let  onUpdate = update => {
        console.log(update)
        setUpdate(update)
    }


    let handleVideo=(e)=>{
        let file = e.target.files[0];
        let blobURL = URL.createObjectURL(file);
        console.log('handling video',blobURL)
        // setVideo([{src:blobURL,type:'video/mp4'}])


        setVideo([
            {
                src: blobURL,
                type: 'video/mp4',
                label: '144p',
                res:144
            },
            {
            src: blobURL,
            type: 'video/mp4',
            label: '240p',
            res:240
            },
            {
                src: blobURL,
                type: 'video/mp4',
                label: '480p',
                res:480
            },
            {
                src: blobURL,
                type: 'video/mp4',
                label: '720p',
                res:720
            },
            {
                src:blobURL,
                type: 'video/mp4',
                label: '1080p',
                res:1080
            },
            {
                src: blobURL,
                type: 'video/mp4',
                label: '2160p',
                res:2160
            }])
    }

    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [slider, setSlider] = useState(false);
    const [duration, setDuration] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [video, setVideo] = useState(false);
    const [thumbnail, setThumbNail] = useState(false);
    const [title, setTitle] = useState(false);
    const [offset, setOffset] = useState([0,0]);
    const [detail, showDetail] = useState(false);
    const [save, setSave] = useState(false);
    const [resolution, setResolution] = useState('480p');
    // const [filter, setFilter] = useState('none');
    const [trimvideo, setTrimVideo] = useState('Trim Video');
    let videoJsOptions = {
        controls: true,
        sources: video,
        poster: thumbnail,
        responsive: true,
        aspectRatio: '16:9',
        loop: true,
        fluid: true,
        language: 'es',
        playbackRates: [0.25, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4],
        // aspectRatio: '4:3',
        resolution:resolution,
        breakpoints: {medium: 100},
        thumbnail:sprite,
        plugins: {
            hotkeys: ({seekStep: 3,}),
            offset: {start: offset[0], end: offset[1], restart_beginning: true},
            titleoverlay:{
                title: title,
                floatPosition: 'center',
                margin: '10px',
                fontSize: '3em',
                // debug: false,
            },
            spriteThumbnails:({
                url: sprite,
                width: 160,
                interval: 3,
                height: 90
            }),
            overlay:[{
                start: 3,
                end: 15
            }]
        },
    }
    let handleSprite=(e)=>{
        let file = e.target.files[0];
        let blobURL = URL.createObjectURL(file);
        setSprite(blobURL)
    }
    let handlePicture=(e)=>{
        let file = e.target.files[0];
        let blobURL = URL.createObjectURL(file);
        setThumbNail(blobURL)
    }
    let handleRemove=()=>{
        setThumbNail(false)
        setVideo(false)
        setSubmit(false)
        setOffset([0,0])
        setSlider(false)
        setDuration(false)
        setSprite(false)
    }
    let handleSubmit=()=>{
        if(thumbnail&&video){
            setSubmit(true)
            setModal(false)
        }
    }
    let addVideo=()=>{
        setModal(true)
        setSubmit(false)
    }
    let  getDuration=(props)=>{
        setDomain([0,props])
        setSlider(true)
    }

    let getPlayer=(props)=>{
        GetPlayer=props
    }
    let  saveVideo=()=>{ showDetail(true) }


    let UpdateOffset=()=>{
        if(duration!==false){
            setTrimVideo('Trim Video')
            setDuration(false)
        }else {
            let time = GetPlayer.duration()
            if (GetPlayer.paused() === true) {
                setDuration(time)
                GetPlayer.play()
            } else {
                setDuration(time)
            }
            setSave(false)
            setTrimVideo('Save')
        }
    }

    let SetOffset=()=>{
        setSave(true)
        alert('done')
        setOffset(update)
    }

    let handleCancel=()=>{
        toggle()
        if(video&&thumbnail){
            setSubmit(true)
        }
    }

    let handleImage=(e)=>{  setSprite(e.target.src) }
    let handlePoster=(e)=>{ setThumbNail(e.target.src) }
    let getFilter=(props)=>{
        let data=JSON.stringify(props)
        console.log(data)
        Filter=data
        // setFilter(data)
    }
    // console.log('origin',window.location.origin)
    {detail&&
         console.log({
        Poster:thumbnail,
        Sprite:sprite,
        Video:video[0].src,
        Title:title,
        Offset:offset,
        Filter:Filter
    })}

    let getResolution=(props)=>{
        setResolution(props)
    }
   let handleFilter=(e)=>{
        let video=document.querySelector('video')
        Filter=e.target.value
        if(e.target.value=='no'){
            video.style.filter = '';
        }else {
            video.style.webkitFilter = 'url(#' + e.target.value + ')';
            video.style.mozFilter = 'url(#' + e.target.value + ')';
            video.style.filter = 'url(#' + e.target.value + ')';
        }

    }

    return(
        <div>
            <React.Fragment>
                <Modal isOpen={modal} toggle={toggle} >
                    <ModalHeader toggle={toggle}>Video</ModalHeader>
                    <ModalBody>
                        <h5><strong>Add Video</strong></h5>
                        <input type="file" onChange={handleVideo}/>
                        <br/>
                        <br/>
                        <h5><strong>Add Title</strong></h5>
                        <input type="text" onChange={(e)=>setTitle(e.target.value)}/>
                        <br/>
                        <br/>
                        <h5><strong>Add Poster</strong></h5>
                        {!thumbnail &&<div>
                            <br/>
                            <h6><strong>Choose From Computer</strong></h6>
                            <input type="file" onChange={handlePicture}/>
                            <br/>
                            <br/>
                            <h6><strong>Choose From Default Images</strong></h6>
                        </div>}
                        {
                            images.map(item=>{
                                return(
                                    <img value={item} key={item} style={{display:thumbnail?'none':''}} width='30%' height='100px'  src={item} onClick={(e)=>{handlePoster(e)}}/>
                                )
                            })
                        }
                        {thumbnail!==false&&
                        <React.Fragment>
                            <img width='50%' height='150px' src={thumbnail}/>
                            {' '}
                            <Button onClick={()=>setThumbNail(false)}>Change Image</Button>
                        </React.Fragment>}
                        <br/>
                        <br/>
                        <h5><strong>Add Sprite Thumbnail</strong></h5>
                        {sprite==false&& <div>
                            <br/>
                            {!sprite&&<h6><strong>Choose From Computer</strong></h6>}
                            <input style={{display:sprite?'none':''}} type="file" onChange={handleSprite}/>
                            <br/>
                            <br/>
                            <h6><strong>Choose From Default Images</strong></h6>
                        </div>}
                        {
                            images.map(item=>{
                                return(
                                    <img value={item} style={{display:sprite?'none':''}} width='30%' height='100px'  src={item} onClick={(e)=>{handleImage(e)}}/>
                                )
                            })
                        }
                        {sprite!==false&&
                        <React.Fragment>
                            <img width='50%' height='150px' src={sprite}/>
                            {' '}
                            <Button onClick={()=>setSprite(false)}>Change Image</Button>
                        </React.Fragment>}

                        {/**/}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleSubmit}>Submit</Button>{' '}
                        <Button color="secondary" onClick={handleCancel}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </React.Fragment>
            <Row>
                <Col md={7}>
                        <h3>Video Upload</h3>
                    <br/>
                {submit &&
                    <Videojs
                        getPlayer={getPlayer}
                        getDuration={getDuration}
                        currentTime={update}
                        {...videoJsOptions}
                        handleFilter={getFilter}
                        getResolution={getResolution}
                    />
                }
                <Slider
                    updateOffset={UpdateOffset}
                    duration={duration}
                    onUpdate={onUpdate}
                    setOffset={SetOffset}
                   />
                </Col>
                <Col md={5}>
                <br/>
                    <Button color="success" onClick={addVideo}> + Add Video</Button>
                    <br/>
                    <br/>
                    {submit&&
                    <React.Fragment>
                        <br/>
                        <Button className='float-right'  color='danger' onClick={handleRemove}>Remove Video</Button>
                        {(duration===false||save)&& <Button  className='float-right' color='secondary' onClick={UpdateOffset}>{trimvideo}</Button>}
                        <Button className='float-right' onClick={saveVideo} color='success'>Save Video</Button>

                        <h3><strong>Filters</strong></h3>
                    <select id="drop-down" style={{width: '80%', margin: '10%'}} onChange={(e) => handleFilter(e)}>
                    {<React.Fragment>
                        <option value='no' defaultChecked>none</option>
                        {filters.map(item => {
                            return (
                                <option key={item} value={item}>{item}</option>
                            )
                        })}
                    </React.Fragment>
                    }
                </select>
                    </React.Fragment>
                        }
                <SvgFilters/>
                </Col>
            </Row>
        </div>
    )
}

export  default Overview
