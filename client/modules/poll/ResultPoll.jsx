import React from 'react'
import jQurey from 'jquery'
import {Link} from 'react-router';
import {Doughnut} from 'react-chartjs'
import Color from 'color'



/*
Followed this tutorial to learn react and implement it

https://youtu.be/nL2wpZV1LYc

Styling of the website and chart was done by me
 */


class ResultPoll extends React.Component {
    constructor(props)
    {
        super(props);

        this.state = {
            question: null,
            pollOptions: [],
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
        var data = this.state.pollOptions.map((options) => {

            //got this color function from https://stackoverflow.com/questions/1484506/random-color-generator#comment65671856_1484514

            var chartColor = "#"+((1<<24)*Math.random()|0).toString(16);

            return {
                value: options.voteCount,
                color: chartColor,
                highlight: Color(chartColor).lighten(0.1).hexString(),
                label: options.option,
            }
        });

        var {question} = this.state;
        var {pollOptions} = this.state;
        var {loading} = this.state;
        var {pollId} = this.props.params;

        return (
            <div className='container'>
                <div className='row'>
                    <div className='panel panel-default col-sm-offset-3 col-sm-6'>
                        <h2 className='text-center'>Poll Results</h2>
                        <div className='panel-body text-center'>
                            <h3 style={{fontSize: 20}} className='text-center'>QUESTION: </h3>
                            <h3>{question}</h3>
                            <Doughnut className='center-block' style={{marginTop: 15, marginBottom: 15}} data={data} width='400' height='320' />
                            {!loading ? pollOptions.map((option, i) => {
                                const { text, voteCount } = option;
                                return (
                                    <div key={i} className='well well-sm'>
                                        <h4>Option: {text}</h4>
                                        <h4>Votes: {voteCount}</h4>
                                    </div>
                                )
                            }) : null}
                            {
                                <Link to={`/vote/${pollId}`}>Place vote on this poll!</Link>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

module.exports = ResultPoll;