import React from 'react';
import MainPage from './components/MainPage.jsx';
import styles from './App.scss';

function App(props) {
    return <div>
        <h1 styleName="header-style">Hello from React!</h1>
        <MainPage/>
        </div>;
}

export default App;
