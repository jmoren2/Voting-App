import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import ListAllPolls from './ListAllPolls.jsx'

/*

This was implemented by Me.
 */

class AllPoll extends Component {
    constructor(props) {
        super(props)
        this.state = {
            polls: null,
            loading: true
        }
    }

    componentDidMount(){
        fetch(`/api/polls`)
            .then((response) => {
                if(response.status === 200){
                    console.log(response.status)
                    return response.json();
                }
                else
                    throw "Server response wasn’t OK";
            })
            .then((response) => {
                console.log(response);
                this.setState({
                    polls: response,
                    loading: false
                });
            })
            .catch((err) => {
                 console.log(err);
                return browserHistory.push(`/error`);
            });
    }

    render() {
        var { loading } = this.state;
        if(loading)  {
            return <div>...loading</div>;
        }  else {
            var {polls} = this.state;
            return (
                <div className="text-center">
                    <ListAllPolls polls={polls}/>
                </div>
            )
        }
    }
}

module.exports = AllPoll;