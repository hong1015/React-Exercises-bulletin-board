import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import registerServiceWorker from './registerServiceWorker';
import Board from './Board';




ReactDOM.render(<Board count={50}/>, document.getElementById('root'));
registerServiceWorker();
