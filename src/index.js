import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Login from './components/Login';
import App from './components/App';
import Error from './components/Error';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
    <div>
        <Switch>
            <Route  path='/login' component={Login} exact/>
            <Route  path='/signup' component={Login} exact/>
            <Route  path='/' component={App} exact/>
            <Route  component={Error}/>
        </Switch>
    </div>
        
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
