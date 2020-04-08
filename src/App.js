import React, {useState} from 'react';
import Overview from "./Video/Overview";
import AddAudio from "./Audio/AddAudio";
import Button from "reactstrap/es/Button";




const App = () => {
    return (
        <div>
            <AddAudio/>
            {/*<Overview/>*/}
        </div>
    );
};

export default App;
