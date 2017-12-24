import React from 'react';
import { storiesOf } from '@storybook/react';

import StyledComponent from './StyledComponent.jsx';

storiesOf('StyledComponent', module)
    .add('with text', () => (
        <StyledComponent text="Some text"/>
    ));
