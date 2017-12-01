
var React = require('react');
var {render} = require('react-dom');
import { Router, Route, IndexRoute, browserHistory } from 'react-router'


import Layout from './modules/shared/Layout.jsx'
import Error from './modules/shared/Error.jsx'
import CreatePoll from './modules/poll/CreatePoll.jsx'
import VotePoll from './modules/poll/VotePoll.jsx'
import ResultPoll from './modules/poll/ResultPoll.jsx'
import AllPoll from './modules/poll/AllPoll.jsx'

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
    document.getElementById('app')
);