var React = require('react');

class Layout extends React.component{
    render(){
        var content = this.props.chilren;
        return (
            <div className="container">
                <h2>Layout</h2>
                {content}
            </div>
        )
    }
}

module.exports = Layout;