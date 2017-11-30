import React from 'react'
var $ = require('jquery');
import {browserHistory} from 'react-router'


class CreatePoll extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            optionCount: 2 //default number of options to show
        }
    }
    render () {
        var options = this.createOptions();

        return (
            <div className='container'>
                <div className='row'>
                    <div className='panel panel-default col-sm-6 col-sm-offset-3'>
                        <div className='panel-body'>
                            <h2 className='text-center'>Create Poll</h2>
                            <form onSubmit={this.createPoll}>
                                <div className='form-group'>
                                    <label>Question: </label>
                                    <input placeholder='Enter a Question!' className='form-control' ref='question' /> <br />
                                </div>
                                {options}
                                <div className='row'>
                                    <div className='col-sm-4 col-sm-offset-4'>
                                        <button className='btn btn-block btn-primary center-block' type='submit'>Create Poll</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    createOptions (){
        const { optionCount } = this.state

        var options = [];


        for(var i =0; i < optionCount; i++)
        {
            var index = i +1;
            var addOption;
            var removeOption;
            if(index === optionCount)
            {
                addOption = this.addOption.bind(this);
            }
            if(index === optionCount - 1)
            {
                removeOption = this.removeOptions.bind(this)
            }
            var stuff = (
                <div key={index}>
                    <label>Option {index}: </label>
                <input type='text' className='form-control' ref={`option${index}`} placeholder='Enter poll options!' onFocus={addOption} onBlur={removeOption}/><br/>
                </div>
            );
            options.push(stuff);
        }

        return options;
    }

    addOption()
    {
        this.setState({optionCount: this.state.optionCount + 1})
    }

    removeOptions()
    {
        var { optionCount } = this.state;
        var lastOption = this.refs[`option${optionCount -1}`].value;

        if(optionCount > 2 && !lastOption){
            this.setState({optionCount: this.state.optionCount - 1})
        }
    }

    createPoll(event)
    {
        event.preventDefault();

        var { question } = this.refs;
        var { alert } = window;

        var data = {
            question: question.value.trim(),
            options: []
        }

        for(var option in this.refs)
        {
            if(option !== 'question' && this.refs[option].value !== '')
            {
                data.options.push(this.refs[option].value.trim())
            }
        }

        var checkPoll = this.checkPoll(data);
        if(checkPoll)
        {
            return alert(checkPoll);
        }

        $.ajax({
            method: 'POST',
            url: '/api/poll',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json'
        }).always((data) => {

                var { createdPollId } = data;


            if(data.status === 400)
            {
                return alert('Error creating poll! :(')
            }

            browserHistory.push(`vote/${createdPollId}`)
        })
    }

    checkPoll(data)
    {
        var { question, options} = data;

        if(question.length < 8)
        {
            return 'Question must be more than 8';
        }
        if(options.length < 2)
        {
            return 'need more options'
        }
        return false;
    }
}

module.exports = CreatePoll;