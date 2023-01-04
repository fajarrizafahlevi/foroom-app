import React from 'react';
import Navigation from '../components/Navigation';
import '../styles/style.css';

const stories = {
  title: 'Navigation',
  component: Navigation,
};

export default stories;

// eslint-disable-next-line react/function-component-definition
const TemplateStory = (args) => <Navigation {...args} />;

const WithLoginSuccess = TemplateStory.bind({});
WithLoginSuccess.args = {
  authUser: {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
};

const isNotUpVoted = TemplateStory.bind({});
isNotUpVoted.args = {
  authUser: null,
};

export { WithLoginSuccess, isNotUpVoted };
