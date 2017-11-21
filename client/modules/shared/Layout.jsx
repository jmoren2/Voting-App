import React from 'react'


class Layout extends React.Component {
    render () {
        const content = this.props.children
        return (
            <div>
                {content}
            </div>
        )
    }
}

module.exports = Layout
