import React, { Component } from 'react';
import {browserHistory} from 'react-router';
import ListAllPolls from './ListAllPolls.jsx'

/*

This file was all implemented by me was implemented by Me once i better understood react.
 */

class AllPoll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            polls: null,
            loading: true
        }
    }

    componentDidMount(){
        fetch(`/api/polls`)
            .then((response) => {
                if(response.status === 200){
                    console.log("Everything is good");
                    return response.json();
                }
                else
                    console.log("Something went wrong with the server");
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
            return <div>Component state is loading. </div>;
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