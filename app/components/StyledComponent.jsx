import React from 'react';

import './StyledComponent.scss';

export default function(props) {
    return <span styleName="button">
        {props.text + ' is text'}
    </span>
}