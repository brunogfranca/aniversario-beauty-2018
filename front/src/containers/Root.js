import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '../store/configureStore';
import AsyncApp from './AsyncApp';

const initialState = {}

const store = configureStore(initialState);

export default class Root extends Component {
	render() {
		return (
			<Provider store={store}>
				<AsyncApp />
			</Provider>
		);
	}
}
