import React, {Component, useState} from 'react';
import {Handle, SliderRail, Tick, Track} from "../Components/Component"
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider'

const sliderStyle = {
    position: 'relative',
    width: '100%',
}
const defaultValues = [250, 350]
const SliderControl = (props) => {
    const[domain,setDomain]=useState([0,props.domain])
    const[reversed,setReversed]=useState(false)
    const[values,setValues]=useState(defaultValues.slice())
    let onChange = values => { setValues(values)  }

    const {onUpdate,updateOffset}=props

    console.log('domain here',domain)
    return (
        // style={{ height: 150, width: '100%' }}
<div>
    <Slider
        style={{position:'relative'}}
        mode={1}
        step={domain[1]/50}
        domain={domain}
        reversed={reversed}
        rootStyle={sliderStyle}
        onUpdate={onUpdate}
        onChange={onChange}
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
    <Ticks count={10}>
            {({ ticks }) => (
                <div className="slider-ticks">
                    {ticks.map(tick => (
                        <Tick key={tick.id} tick={tick} count={ticks.length} />
            ))}
                </div>
                            )}
    </Ticks>
    </Slider>
</div>

    );
};

export default SliderControl;

