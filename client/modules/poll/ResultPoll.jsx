import React from 'react'
import jQurey from 'jquery'
import {Link} from 'react-router';

class ResultPoll extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            question: null,
            pollOptions: null,
            loading: true,
            error:false
        }

    }
    componentWillMount() {
        var {pollId} = this.props.params;
        this.serverHandler = jQurey.get(`/api/poll/${pollId}`, function (result) {
            var {question, pollOptions} = result;
            this.setState({
                question,
                pollOptions,
                loading: false
            })
        }.bind(this)).fail(function () {
            this.setState({
                error: true,
                loading: false
            })
        }.bind(this));
    }

    render () {
        var {question} = this.state;
        var {pollOptions} = this.state;
        var {loading} = this.state;
        var {pollId} = this.props.params;

        return (
            <div className='text-center'>
                <h2>Result Poll</h2>
                <h4> Question: {question}</h4>
                {
                    !loading ?
                    pollOptions.map(function (pollOption, id) {
                    var {optionId, text, voteCount} = pollOption;

                    return (
                    <div key={id} style={{border: '1px solid black'}}>
                    <p>Id: {optionId}</p>
                    <p>Option: {text}</p>
                    <p>Votes: {voteCount}</p>
                    </div>
                    )

                })
                : null
                }

                {
                    <Link to={`/vote/${pollId}`}>Cast your vote on this Poll! </Link>
                }
            </div>
        )
    }
}

module.exports = ResultPoll;