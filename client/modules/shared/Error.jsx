import React from 'react'
import Link from 'react-router'

class Error extends React.Component {
    render () {
        return (
            <div className='container text-center panel panel-default col-sm-offset-3 col-sm-6' style={{color:'red'}}>
                <h2>Error!</h2>
                <h3>Url not found</h3>
            </div>
        )
    }
}

module.exports = Error;
