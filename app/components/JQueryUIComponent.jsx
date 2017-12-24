import React, { Component } from 'react';
import _ from 'lodash';

class JQueryUIComponent extends Component {


    constructor(props){
        super(props);
        this.isPropsChanged = (nextProps)=>{return false};
        this.shouldUpdate = true;
    }

    componentDidUpdate(){
        this.shouldUpdate = false;
    }

    shouldComponentUpdate() {
        if(this.shouldUpdate){
            return true;
        }
        return false;
    }


    componentWillReceiveProps(nextProps) {
        if (!this.isPropsChanged(nextProps)) {
            this.shouldUpdate = false;
            return;
        }
        this.shouldUpdate = true;
    }
}

export default JQueryUIComponent;