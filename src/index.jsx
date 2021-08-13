import React from 'react';
import ReactDOM from 'react-dom';
import { Container } from 'react-bootstrap';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import bugflixReducer from './reducers/reducers'
import MainView from './components/main-view/main-view';
import './index.scss';

class Bugflix extends React.Component {
	render() {
		return (
			<Provider store={createStore(bugflixReducer, devToolsEnhancer())}>
				<Container fluid className='p-0'>
					<MainView />
				</Container>
			</Provider>
		);
	}
}

ReactDOM.render(React.createElement(Bugflix), document.getElementById('app'));