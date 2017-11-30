import React from 'react'
import jQurey from 'jquery'
import {Link} from 'react-router';

class VotePoll extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            question: null,
            pollOptions: null,
            loading: true,
            error:false,
            optionIDChecked: ''
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
    render ()
    {
        var {question} = this.state;
        var {pollOptions} = this.state;
        var {loading} = this.state;
        var {pollId} = this.props.params;
        var {optionIdChecked} = this.state;

        console.log(optionIdChecked);

        return (
            <div className='text-center'>
                <h2>Vote Poll</h2>
                <h4> Question: {question}</h4>
                <form onSubmit={this.placeVote.bind(this)}>
                {
                    !loading ?
                        pollOptions.map(function (pollOption, i) {
                            var {optionId, text} = pollOption;


                            return (
                                <div key={i} style={{border: '1px solid black'}}>
                                    <p>Id: {optionId}</p>
                                    <p>Option: {text}</p>
                                    <input type='radio' name='options' onClick={(event) => this.checkedOption(event) }/>
                                </div>
                            )

                        })
                    :null
                }
                <button type='submit' style={{margin: 12}} className='btn btn-lg btn-primary'> Vote</button>
                </form>
                {
                    <Link to={`/result/${pollId}`}>See results from this poll!</Link>
                }
            </div>
        )}
    checkedOption(Id)
    {
        this.setState({
            optionIDChecked: Id
        })
    }

    placeVote(event)
    {

    }

    }




module.exports = VotePoll;