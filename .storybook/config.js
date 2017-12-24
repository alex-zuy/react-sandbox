import { configure } from '@storybook/react';

function loadStories() {
  require('../app/components/Multiselect.story');
  require('../app/components/StyledComponent.story.js')
}

configure(loadStories, module);
