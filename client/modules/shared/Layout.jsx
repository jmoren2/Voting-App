import React from 'react'
import {Link} from 'react-router'
import Navbar from './Navbar.jsx'

/*
This file is a standard implementation in React but followed this tutorial

https://youtu.be/nL2wpZV1LYc

 */
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
