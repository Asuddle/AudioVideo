import React, {useState,useEffect} from 'react';
// import {Howl,Howler} from 'howler';
import './App.css'
import './Audio.css'
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import SliderControl from "./SliderControl";

function AudioPlayers(props) {
    const [duration,setDuration]=useState(0)
    const [data,setData]=useState(props.data)
    let getOffset=(data)=>{ props.getTrimVal(data) }
    // console.log('data',data)
    // console.log('propss',props.data)
    useEffect(() => {
        if(data!==props.data){
            setData(props.data)
        }
    })

    setTimeout(()=>{
        let audio=document.querySelector('audio')
        props.getDuration(audio.duration)
        setDuration(audio.duration)
    },300)

    return (
        <div>
                <img src={props.data.image} style={{
                    width: '17%',
                    position: 'relative',
                    height: '50%',
                    margin: '49px',
                    left: '394px',
                    top: '-52px'
                }}/>
                <AudioPlayer
                defaultCurrentTime="Loading" defaultDuration="Loading"
                header={`Title : ${data.title}`}
                customAdditionalControls={[]}
                footer={`Artist : ${data.artist}`}
                style={{width: '600px',position:"relative",left: '22%',bottom:'50px'}}
                src={props.audio}
                onPlay={e =>   console.log('playing')}
                onPause={e=>'pause'}
            />
          {props.trim&& <SliderControl duration={duration} getTrimValue={getOffset} trimValue={props.trimValue} />}
        </div>
    );
}

export default AudioPlayers;



// const[audio,setAudio]=useState(props.audio)
//     const Sounds = new Howl({
//     src: audio,
//     loop: true,
//     volume: 1,
//     onload: function() {
//         let data=Sounds.duration()
//         props.getDuration(data)
//         setDuration(data)
//     }
// });
//     console.log('audio player',AudioPlayer)

