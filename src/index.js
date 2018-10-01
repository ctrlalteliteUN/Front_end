import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Login from './components/Login';
import App from './components/App';
import Error from './components/Error';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Registro from './components/Registro';
import groups from './components/groups';
import search from './components/search';
import members from './components/members';
import msgs from './components/msgs';
import profile from './components/profile';
import Landingpage from './components/Landingpage';

ReactDOM.render(
    <BrowserRouter>
    <div>
        <Switch>
            <Route  path='/login' component={Login} exact/>
            <Route  path='/signup' component={Registro} exact/>
            <Route  path='/groups' component={groups} exact/>
            <Route  path='/search' component={search} exact/>
            <Route  path='/members' component={members} exact/>
            <Route  path='/msgs' component={msgs} exact/>
            <Route  path='/profile' component={profile} exact/>
            <Route  path='/' component={Landingpage} exact/>
            <Route  component={Error}/>
        </Switch>
    </div>
        
    </BrowserRouter>
    , document.getElementById('root'));
registerServiceWorker();
