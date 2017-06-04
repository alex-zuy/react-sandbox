import React from 'react';
import styles from './MainPage.scss';

export default class MainPage extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <div styleName="content">Themeable content</div>
            <a href="?theme=red">Red theme</a>
            &nbsp; &nbsp;
            <a href="?theme=green">Green theme</a>
            </div>
    }
}
