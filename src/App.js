
import React,{ useState } from 'react';
import Videojs from './video.js';
import hotkeys from 'videojs-hotkeys'
import offset from "videojs-offset";
import overlay from 'videojs-overlay'
import thumbnails from "videojs-thumbnails";
// import videoJsResolutionSwitcher from 'videojs-resolution-switcher'
import spriteThumbnails from 'videojs-sprite-thumbnails'
// import zoomRotate from 'videojs-rotatezoom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Row from "reactstrap/es/Row";
// import("videojs-resolution-switcher");
import SliderControl from "./SliderControl";
import Col from "reactstrap/es/Col";
// import './App.css'
const App = () =>{

     const defaultValues = [250, 350]
    const[domain,setDomain]=useState([0,100])
    const[update,setUpdate]=useState(defaultValues.slice())
    // const[reversed,setReversed]=useState(false)
    const[player,setPlayer]=useState({})
    const[sprite,setSprite]=useState(false)
     let  onUpdate = update => {
         console.log(update)
        setUpdate(update)
    }





let handleVideo=(e)=>{
        let file = e.target.files[0];
        let blobURL = URL.createObjectURL(file);
        console.log('handling video',blobURL)
    setVideo([{src:blobURL,type:'video/mp4'}])
}
    // const [video, setVideo] = useState([{src:"//vjs.zencdn.net/v/oceans.webm" ,type:"video/webm"}]);
    // const [thumbnail, setThumbNail] = useState('https://i.picsum.photos/id/237/200/300.jpg');
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const [slider, setSlider] = useState(false);
    const [duration, setDuration] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [video, setVideo] = useState(false);
    const [thumbnail, setThumbNail] = useState(false);
    const [offset, setOffset] = useState([0,0]);
    let videoJsOptions = {
        // autoplay: true,
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
        breakpoints: {medium: 100},
        plugins: {
            hotkeys: ({seekStep: 3,}),
            offset: {start: offset[0], end: offset[1], restart_beginning: true},
            spriteThumbnails:({
                url: sprite,
                width: 160,
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
        setSprite(blobURL)
    }
  let handlePicture=(e)=>{
      let file = e.target.files[0];
      let blobURL = URL.createObjectURL(file);
      console.log(blobURL)
      setThumbNail(blobURL)
  }
  let handleRemove=()=>{
        setThumbNail(false)
        setVideo(true)
        setSubmit(false)
        setOffset([0,0])
        setSlider(false)
        setDuration(false)
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
        setPlayer(props)
        console.log('player',props)
    }

  let UpdateOffset=()=>{
      let time=player.duration()
        if(player.paused()==true){
            player.play()
            setDuration(time)
        }else{
            setDuration(time)
        }
  }

  let SetOffset=()=>{
        alert('done')
      setOffset(update)
  }

let handleCancel=()=>{
    toggle()
    if(video&&thumbnail){
        setSubmit(true)
    }
}
       return(
    <div>
        <br/>
        <br/>
        <Row>
            <Col>
            <h3>Video Upload</h3>
            </Col>
                <Col>
            <Button color="success" onClick={addVideo}> + Add Video</Button>
                </Col>
        </Row>
       <br/>
        {submit&&
        <React.Fragment>
        <Button className='float-right'  color='danger' onClick={handleRemove}>Remove Video</Button>
       <Button  className='float-right' color='secondary' onClick={UpdateOffset}>Trim Video</Button>
        </React.Fragment>}
        <React.Fragment>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Video</ModalHeader>
                <ModalBody>
                    <h5><strong>Add Video</strong></h5>
                    <br/>
                    <input type="file" onChange={handleVideo}/>
                    <br/>
                    <br/>
                    <h5><strong>Add Thumbnail</strong></h5>
                    <br/>
                    <input type="file" onChange={handlePicture}/>
                    <br/>
                    <br/>
                    <h5><strong>Add Sprite ThumbNail</strong></h5>
                    <br/>
                    <input type="file" onChange={handleSprite}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSubmit}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={handleCancel}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </React.Fragment>
    <div>
            {submit&&<Videojs getPlayer={getPlayer}
                              getDuration={getDuration}
                              currentTime={update} {...videoJsOptions}
                              updateOffset={UpdateOffset}
                              duration={duration}
                              onUpdate={onUpdate}
                              setOffset={SetOffset}
            />}
            <br/>

        </div>


    </div>
       )
       }

export  default App

