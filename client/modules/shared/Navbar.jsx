import React from 'react'
import { Link } from 'react-router'

class Navbar extends React.Component {
    render () {
        return (
            <div className="row">
                <nav className="navbar navbar-inverse" role="navigation">
                    <div className="navbar-header">
                        <a className="navbar-brand" href='/'>Personal Polling App!</a>
                        <a className="navbar-brand" href='/'>Home </a>
                        <a className="navbar-brand" href="/polls">All Polls</a>
                        </div>

                </nav>
            </div>
        )
    }
}

module.exports = Navbar;