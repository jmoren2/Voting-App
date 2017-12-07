import React from 'react'
import $ from 'jquery'
import {Link, browserHistory} from 'react-router';


/*
Followed this tutorial to learn react and implement it

https://youtu.be/nL2wpZV1LYc

 */

class VotePoll extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            question: null,
            pollOptions: null,
            loading: true,
            error: false,
            optionIDChecked: ''
        }

    }

    componentWillMount() {
        var {pollId} = this.props.params;
        return $.get(`/api/poll/${pollId}`, (result) => {
            const { question, pollOptions } = result;
            this.setState({
                question,
                pollOptions,
                loading: false
            })
        }).fail(() => {
            this.setState({error: true})
        })
    }

    render() {
        console.log(this.props)
        const {pollId} = this.props.params;
        const {question, pollOptions, loading} = this.state;

        return (
            <div className='container'>
                <div className='row'>
                    <div className='panel panel-default col-sm-offset-3 col-sm-6' style={{marginBottom: 4}}>
                        <h2 className='text-center'>Place your vote!</h2>
                        <div className='panel-body'>
                            <h4 style={{fontSize: 18}} className='text-center'>QUESTION: </h4>
                            <h2 className='text-center' style={{marginTop: 0}}>{question}</h2>
                            <form onSubmit={this.placeAvote.bind(this)}>
                                {!loading ? pollOptions.map((pollOption, i) => {
                                    var { optionId, option} = pollOption;
                                    return (
                                        <div key={i} className='radio text-center well well-sm' style={{margin: 12}}>
                                            <label style={{fontSize: 24}}>
                                            <p>Option:</p>
                                            <input type="radio" name='option' value={optionId} style={{marginTop: 10}} onClick={this.checkedOption.bind(this, optionId)}/>
                                            {option}
                                            </label>
                                        </div>
                                    )
                                }) : null}
                                <div className='row'>
                                    <div className='col-sm-4 col-sm-offset-4'>
                                        <button className='btn btn-block btn-danger center-block' type='submit'>Vote</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {
                    !loading ? <Link to={`/result/${pollId}`}>See results from this poll!</Link> : null
                }
            </div>

        )
    }
    checkedOption(id){
        this.setState({optionIDChecked:id});

    }

    placeAvote(event) {
        event.preventDefault();

        const {alert} = window;
        const {pollId} = this.props.params;

        if (!this.state.optionIDChecked) {
            return alert('Select option before voting!');
        }
        const data = {
            pollOptionId: this.state.optionIDChecked
        };

        $.ajax({
            method: 'POST',
            url: '/api/vote',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json'
        }).always((data) => {
            const {status, responseText} = data;

            if (status === 400) {
                return alert(JSON.parse(responseText).message);
            }
                if (status === 201) {
                    return browserHistory.push(`/result/${pollId}`);
                }
            })
        }


}

module.exports = VotePoll;