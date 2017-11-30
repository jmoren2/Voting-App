import React from 'react'
import jQurey from 'jquery'
import {Link} from 'react-router';
import {Pie} from 'react-chartjs'
import Color from 'color'
import { getRandomPastelColor } from './../../utl.js'

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
        const chartData = this.state.pollOptions.map((pollOption) => {
            const color = getRandomPastelColor();
            return {
                value: pollOption.voteCount,
                label: pollOption.text,
                color: color,
                highlight: Color(color).lighten(0.05).hexString()
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
                            <h3>{question}</h3>
                            <Pie className='center-block' style={{marginTop: 16, marginBottom: 16}} data={chartData} width='300' height='220' />
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