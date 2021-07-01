import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import './index.scss';

class Bugflix extends React.Component {
    render() {
        return (
            <MainView />
        );
    }
}

ReactDOM.render(React.createElement(Bugflix), document.getElementById('app'));