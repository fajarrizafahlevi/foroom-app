import React from 'react';
import DownVoteButton from '../components/buttons/DownVoteButton';
import '../styles/style.css';

const stories = {
  title: 'DownVoteButton',
  component: DownVoteButton,
};

export default stories;

// eslint-disable-next-line react/function-component-definition
const TemplateStory = (args) => <DownVoteButton {...args} />;

const isDownVoted = TemplateStory.bind({});
isDownVoted.args = {
  id: 'id',
  downVotesBy: ['john', 'jane', 'doe'],
  authUserId: 'john',
};

const isNotDownVoted = TemplateStory.bind({});
isNotDownVoted.args = {
  id: 'id',
  downVotesBy: ['jane', 'doe'],
  authUserId: 'john',
};

export { isDownVoted, isNotDownVoted };
