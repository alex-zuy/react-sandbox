import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Multiselect from './Multiselect.jsx';

const options = [
    {
        value: 'one',
        title: 'Title one'
    },
    {
        value: 'two',
        title: 'Title two'
    }
];

storiesOf('Multiselect', module)
    .add('with two options', () => (
        <Multiselect options={options} selected={null}/>
    ));
