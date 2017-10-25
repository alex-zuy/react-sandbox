import React from 'react';
import Multiselect from './Multiselect.jsx';
import './MainPage.scss';

export default class MainPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            options: [
                {value: 'one', title: 'One'},
                {value: 'two', title: 'Two'}
            ],
            selected: ['one']
        };
    }

    render() {
        return <div>
            <div styleName="content">Themeable content</div>
            <Multiselect multiple={true}
                         enabled={true}
                         options={this.state.options}
                         onSelect={selected => this.setState({selected})}/>
        </div>
    }
}
