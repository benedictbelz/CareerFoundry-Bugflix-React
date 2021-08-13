import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import bugflixReducer from './reducers/reducers';
import { Container } from 'react-bootstrap';
import MainView from './components/main-view/main-view';
import './index.scss';

class Bugflix extends React.Component {
    render() {
        return (
            <Provider store={createStore(bugflixReducer)}>
                <Container fluid className="p-0">
                    <MainView />
                </Container>
            </Provider>
        );
    }
}

ReactDOM.render(React.createElement(Bugflix), document.getElementById('app'));