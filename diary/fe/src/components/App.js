import React, { Component } from 'react';
import Header from './Header';
import { Provider } from 'react-redux';
import store from '../store';

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
            <Header />
            </Provider>
        );
    }
}

