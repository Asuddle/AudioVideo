import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AudioPlayer from "./AudioPlayer";
import Input from "reactstrap/es/Input";

const AddAudio = () => {
    const [audio, setAudio]=useState(null)
    const [audioobj, setAudioobj]=useState(null)
    const [title, setTitle]=useState('')
    const [modal, setModal]=useState(false)
    const [artist, setArtist]=useState('')
    const [show, setShow]=useState(false)
    const [image, setImage]=useState(false)
    const [originalName, setOriginalName]=useState(false)
    const [duration,setDuration]=useState(0)
    const [trim,setTrim]=useState(false)
    const [data,setData]=useState(false)
    const [prevData,setPrevdata]=useState(false)
    const [offset,setOffset]=useState(false)
    let handleAudio=(e)=>{
        let file = e.target.files[0]
        let data=new FileReader()
        data.readAsDataURL(file)
        data.onloadend = function() {
            var base64data = data.result;
            setAudio(base64data)
        }
        setOriginalName(file.name)
        setTitle(file.name)
        setAudioobj(file)
    };
    let handleImage=(e)=>{
        let file = e.target.files[0];
        let blobURL = URL.createObjectURL(file);
        console.log(blobURL)
        setImage(blobURL)
    }
    let submitForm=()=>{
        if(audio){
            setShow(true)
            toggle()
            let data={
                artist:artist,
                title:title,
                image:image
            }
            setData(data)
        }

    }
    let getDuration =(props)=>{
        setDuration(props)
        console.log('here it is',props)
    }
    let getTrimValue=(props)=>{
        setOffset(props)
        setTrim(false)
    }
    let toggle=()=>{ setModal(!modal) }
    let RemoveAudio=()=>{
        setAudio(false)
        setOriginalName(false)
        setImage(false)
        setTitle('')
        setDuration(0)
        setTrim(false)
        setArtist('')
        setShow(false)
    }
    let addModal=()=>{
        toggle()
        setPrevdata(data)
        setData(false)
        setShow(false)
    }
    let handleCancel=()=>{
        toggle()
        setShow(true)
        setData(prevData)
    }
    let SaveData=()=>{
        let allData={
            ...data,
            audio:audio,
            offset:offset
        }
        console.log('all Data',allData)
    }
    return (
        <div>
           {<Button onClick={addModal}>{show?'Edit':'Audio'}</Button>}
           {show&&<Button color='danger' onClick={RemoveAudio}>Remove Audio</Button>}
            {duration>0&&!trim&&<Button color='info' onClick={e=>setTrim(true)}>Trim</Button>}
            {show&&<Button color='success' onClick={SaveData}>Save</Button>}
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Add Audio</ModalHeader>
                <ModalBody>
                    <p><strong>Add Audio</strong></p>
                    {
                        originalName?
                            <div>
                            <Input type="text" name='title' disabled value={originalName}/>
                            <Button onClick={
                                ()=>{
                                    setAudio(false)
                                    setOriginalName(false)
                                    setShow(false)
                                }} size='sm'>Remove Audio</Button>
                            </div>
                            :
                            <Input type="file"  onChange={handleAudio}/>
                    }
                    <br/>
                    <p><strong>Add Title</strong></p>
                    <Input type="text" name='title' value={title} onChange={e=>setTitle(e.target.value)}/>
                    <br/>
                    <p><strong>Add Artist Name</strong></p>
                    <Input type="text" value={artist} onChange={e=>setArtist(e.target.value)}/>
                    <br/>
                    <p><strong>Add Image</strong></p>
                    {image?
                        <div>
                        <img width="38%" src={image}/>
                        <Button onClick={()=>setImage(false)}>Remove Image</Button>
                        </div>:
                        <Input type="file" onChange={handleImage}/>}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={submitForm} >Submit</Button>{' '}
                    <Button color="secondary" onClick={handleCancel}>Cancel</Button>
                </ModalFooter>
            </Modal>
           {show&&<AudioPlayer audio={audio} audioObj={audioobj} data={data} getDuration={getDuration} getTrimVal={getTrimValue}   trim={trim} />}
         </div>
    );
};

export default AddAudio;
