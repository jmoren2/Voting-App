
var React = require('react');
var {render} = require('react-dom');
import { Router, Route, IndexRoute, browserHistory } from 'react-router'


import Layout from './modules/shared/Layout.jsx'
import Error from './modules/shared/Error.jsx'
import CreatePoll from './modules/poll/CreatePoll.jsx'
import VotePoll from './modules/poll/VotePoll.jsx'
import ResultPoll from './modules/poll/ResultPoll.jsx'
import AllPoll from './modules/poll/AllPoll.jsx'

/*

For this project i followed this following tutorials
        webpack: https: youtu.be/9kJVYpOqcVU
        express backend: https://youtu.be/M7g76xnRxmA
        React frontend: https://youtu.be/nL2wpZV1LYc
        Sequelize: https://youtu.be/qsDvJrGMSUY

 */

/*
This file is a standard implementation in React but followed this tutorial

https://youtu.be/nL2wpZV1LYc

 */
var rootRoute = (
    <Router history={browserHistory}>
        <Route path='/' component={Layout}>
            <IndexRoute component={CreatePoll} />
            <Route path='vote/:pollId' component={VotePoll}/>
            <Route path='result/:pollId' component={ResultPoll}/>
            <Route path='polls' component={AllPoll}/>
            <Route path='*' component={Error}/>
        </Route>
    </Router>
);

render(
    rootRoute,
    document.getElementById('voting-app')
);