import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';

class Bugflix extends React.Component {
    render() {
        return (
            <div className="bugflix">
                <div>Good morning</div>
            </div>
        );
    }
}

ReactDOM.render(React.createElement(Bugflix), document.getElementById('app'));