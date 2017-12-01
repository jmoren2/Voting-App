import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

/*

This was all implemented by me

 */

class ListAllPolls extends Component {
    render() {
        var { polls } = this.props;
        var allPolls = polls.map((poll, i)=>{
            const { id, question } = poll;
            return (
                <div key={i} className="well well-sm">
                    <Link to={`/vote/${id}`}>{question}</Link>
                </div>
            )
        });

        return (
            <div className="container">
                <div className='row'>
                    <div className='panel panel-default col-sm-offset-3 col-sm-6'>
                        <div className='panel-body text-center'>
                            <h1>Questions</h1>
                            {allPolls}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


module.exports =  ListAllPolls;