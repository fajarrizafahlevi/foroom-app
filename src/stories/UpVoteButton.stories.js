import React from 'react';
import UpVoteButton from '../components/buttons/UpVoteButton';
import '../styles/style.css';

const stories = {
  title: 'UpVoteButton',
  component: UpVoteButton,
};

export default stories;

// eslint-disable-next-line react/function-component-definition
const TemplateStory = (args) => <UpVoteButton {...args} />;

const isUpVoted = TemplateStory.bind({});
isUpVoted.args = {
  id: 'fajar',
  upVotesBy: ['fajar', 'riza', 'fahlevi'],
  authUserId: 'fajar',
};

const isNotUpVoted = TemplateStory.bind({});
isNotUpVoted.args = {
  id: 'fajar',
  upVotesBy: ['riza', 'fahlevi'],
  authUserId: 'fajar',
};

export { isUpVoted, isNotUpVoted };
