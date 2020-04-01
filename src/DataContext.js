import React from "react";

// set the defaults
const DataContext = React.createContext({
    player: {},
    setPlayer: () => {}
});

export default DataContext;
