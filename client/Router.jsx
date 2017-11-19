var React = require('react');
var {render} = require('react-dom');
var { Router, Route, IndexRoute, browserHistory } = require('react-router');


var Layout = require('./modules/shared/Layout');
var CreatePoll = require('./modules/poll/CreatePoll');

/*const rootRoute = (
    <Router history={browserHistory}>
        <Route path='/' component={Layout}>
            <IndexRoute component={CreatePoll} />
        </Route>
    </Router>
);*/

render(
    //rootRoute,
    document.getElementById('app')
);