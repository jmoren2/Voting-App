import React from 'react'


class Error extends React.Component {
    render () {
        return (
            <div className='container' style={{color:'red'}}>
                <h2>Error!</h2>
                <h3>Url not found</h3>
            </div>
        )
    }
}

module.exports = Error
