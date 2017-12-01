import React from 'react'
import Link from 'react-router'

class Error extends React.Component {
    render () {
        return (
            <div className='container text-center' style={{color:'red'}}>
                <h2>Error!</h2>
                <h3>Url not found</h3>
            </div>
        )
    }
}

module.exports = Error;
