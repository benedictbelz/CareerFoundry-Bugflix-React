import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'react-bootstrap';
import { MainView } from './components/main-view/main-view';
import './index.scss';

class Bugflix extends React.Component {
    render() {
        return (
            <Container fluid className="p-0">
                <MainView />
            </Container>
        );
    }
}

ReactDOM.render(React.createElement(Bugflix), document.getElementById('app'));