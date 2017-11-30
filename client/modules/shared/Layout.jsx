import React from 'react'
import {Link} from 'react-router'

class Layout extends React.Component {
    render () {
        const content = this.props.children;
        return (
            <div className='container text-center'>
                <h2><Link to='/'>Voting-App!</Link></h2>
                {content}
            </div>
        )
    }
}

module.exports = Layout
