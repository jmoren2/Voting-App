import React from 'react'


// this was all implemented by me

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