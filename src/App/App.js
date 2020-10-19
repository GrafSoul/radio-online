import React, { Component } from 'react';

import Aux from './hoc/AuxComponent/AuxComponent';
import Header from './components/Header/Header';

class App extends Component {
    render() {
        return (
            <Aux>
                <Header />
            </Aux>
        );
    }
}

export default App;
