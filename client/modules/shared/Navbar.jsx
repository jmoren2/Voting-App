import React from 'react'

/*
This file is a standard implementation in React but got idea from this post
and was implemented by me

https://stackoverflow.com/questions/34607841/react-router-nav-bar-example

 */

class Navbar extends React.Component {
    render () {
        return (
            <div className="row">
                <nav className="navbar navbar-inverse" role="navigation">
                    <div className="navbar-header">
                        <a className="navbar-brand"  href='/'>Personal-Polls App</a>
                        <a className="navbar-brand" href='/'>Home </a>
                        <a className="navbar-brand" href="/polls">All Polls</a>
                        </div>

                </nav>
            </div>
        )
    }
}

module.exports = Navbar;