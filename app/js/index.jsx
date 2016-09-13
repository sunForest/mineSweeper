import React from 'react';
import ReactDOM from 'react-dom';
import Perf from 'react-addons-perf';

import {Board} from './board.jsx';

window.Perf = Perf;

ReactDOM.render(<Board rows="10" cols="10" mines="15"/>, 
                document.getElementById('app'));