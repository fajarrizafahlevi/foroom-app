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
  id: 'id',
  upVotesBy: ['john', 'jane', 'doe'],
  authUserId: 'john',
};

const isNotUpVoted = TemplateStory.bind({});
isNotUpVoted.args = {
  id: 'id',
  upVotesBy: ['jane', 'doe'],
  authUserId: 'john',
};

export { isUpVoted, isNotUpVoted };
