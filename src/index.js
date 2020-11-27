import React from 'react';
import ReactDOM from 'react-dom';

import './index.scss';
import App from './App/App';

document.cookie = 'user="Radion User"; secure';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);
