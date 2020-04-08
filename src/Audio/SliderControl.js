import React, { Component } from 'react'
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'
import { SliderRail, Handle, Track, Tick } from '../Components/Component'
import moment from "moment";
import Button from "reactstrap/es/Button";

const ButtonStyle={
    'position': 'relative',
    'width': '13%',
    'top': '78%',
    'left': '35%',
    'marginTop': '-5%',
}
const sliderStyle = {
position: 'relative',
left: '22%',
width: '47%',
}

const defaultValues = [250, 350]

class Example extends Component {

state = {
    domain: [0,this.props.duration],
    duration:this.props.duration,
    values: defaultValues.slice(),
    update: defaultValues.slice(),
    reversed: false,
}
handleTrim=()=>{
    // console.log('trim',this.state.update)
    this.props.getTrimValue(this.state.update)
}
onUpdate = update => {
    this.setState({ update })
    // console.log('update',update)
}

onChange = values => {
    this.setState({ values })
}

setDomain = domain => {
    this.setState({ domain })
}

toggleReverse = () => {
    this.setState(prev => ({ reversed: !prev.reversed }))
}
formatTick=(ms)=>{
        console.log('ms here',ms)
        return moment(ms,'ss').format('HH:mm:ss')
}
render() {
    const {
        state: { domain, values, update, reversed },
    } = this
    // console.log('domain',domain)


    return (
        <div style={{ height: 150, width: '100%' }}>
            <Button color='success' style={ButtonStyle}  onClick={this.handleTrim}>Trim</Button>
                <Slider
                    mode={2}
                    // step={domain[1]/50}
                    step={domain[1]/50}
                    domain={domain}
                    reversed={reversed}
                    rootStyle={sliderStyle}
                    onUpdate={this.onUpdate}
                    onChange={this.onChange}
                    values={values}
                >
                    <Rail>
                        {({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}
                    </Rail>
                    <Handles>
                        {({ handles, getHandleProps }) => (
                            <div className="slider-handles">
                                {handles.map(handle => (
                                    <Handle
                                        key={handle.id}
                                        handle={handle}
                                        domain={domain}
                                        getHandleProps={getHandleProps}
                                    />
                                ))}
                            </div>
                        )}
                    </Handles>
                    <Tracks left={false} right={false}>
                        {({ tracks, getTrackProps }) => (
                            <div className="slider-tracks">
                                {tracks.map(({ id, source, target }) => (
                                    <Track
                                        key={id}
                                        source={source}
                                        target={target}
                                        getTrackProps={getTrackProps}
                                    />
                                ))}
                            </div>
                        )}
                    </Tracks>
                    <Ticks count={10} >
                        {({ ticks }) => {
                            // console.log(ticks)
                            return(
                            <div className="slider-ticks">
                                {ticks.map(tick =>
                                    (
                                    <Tick key={tick.id} tick={tick} count={ticks.length}   />
                                    // format={this.formatTick}
                                    )
                                )
                                }
                            </div>
                        )}}
                    </Ticks>
                </Slider>
                <br/>
            </div>
        )
    }
}

export default Example




//
// {/*<Form inline>*/}
// {/*    <FormGroup>*/}
// {/*        <Label for="exampleEmail" hidden>Email</Label>*/}
// {/*        <Input type="email" name="email" id="exampleEmail" placeholder="Email" />*/}
// {/*    </FormGroup>*/}
// {/*    {' '}*/}
// {/*    -*/}
// {/*    <FormGroup>*/}
// {/*        <Label for="examplePassword" hidden>Password</Label>*/}
// {/*        <Input type="password" name="password" id="examplePassword" placeholder="Password" />*/}
// {/*    </FormGroup>*/}
// {/*    {' '}*/}
// {/*    <Button>Submit</Button>*/}
// {/*</Form>*/}
// {/*<div>*/}
// {/*<Input style={{width: '8%'}} type='number'></Input>*/}
// {/*-*/}
// {/*<Input style={{width: '8%'}} type='number'></Input>*/}
// {/*</div>*/}
// {/*<h6>from: {Math.floor(this.state.update[0])}</h6>*/}
// {/*<h6>to: {Math.floor(this.state.update[1])}</h6>*/}