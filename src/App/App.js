import React, { Component } from 'react';

import Aux from './hoc/AuxComponent/AuxComponent';
import Header from './components/Header/Header';
import Player from './components/Player/Player';


class App extends Component {
    render() {
        return (
            <Aux>
                <Header />
                <Player />
            </Aux>
        );
    }
}

export default App;
