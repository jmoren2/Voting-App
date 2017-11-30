import React from 'react'
import $ from 'jquery'
import {Link, browserHistory} from 'react-router';

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

        const {pollId} = this.props.params;
        const {question, pollOptions, loading} = this.state;

        return (
            <div className='text-center'>
                <h2>Vote Poll</h2>
                <h4> Question: {question}</h4>
                <form onSubmit={this.placeAvote.bind(this)} >
                    {!loading ? pollOptions.map((pollOption, i) => {
                        const {optionId, text} = pollOption;
                        return (
                            <div key={i} style={{border: '1px solid black'}}>
                                <p>ID: {optionId}</p>
                                <p>Option: {text}</p>
                                <input type="radio" name='option' onClick={this.checkedOption.bind(this, optionId)}/>
                            </div>
                        )
                    }) : null}
                    <button type='submit' style={{margin:12}} className='btn btn-lg btn-primary'> Vote!</button>
                </form>
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

        if (!this.state.optionIDChecked)
            alert('Select option before voting!')
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