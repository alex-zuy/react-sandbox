import 'babel-polyfill';
import React from 'react';
import App from './App.jsx';
import ReactDom from 'react-dom';

ReactDom.render(
    <App/>,
    document.getElementById('content-root')
);
