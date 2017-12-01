import React from 'react'
import {Link} from 'react-router'
import Navbar from './Navbar.jsx'
class Layout extends React.Component {
    render () {
        const content = this.props.children;
        return (
            <div className='container text-center'>
                <Navbar />
                {content}
            </div>
        )
    }
}

module.exports = Layout
