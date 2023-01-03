import React from 'react';
import PropTypes from 'prop-types';
import { postedAt } from '../utils';
import UpVoteButton, { upVoteButtonShape } from './buttons/UpVoteButton';
import DownVoteButton, { downVoteButtonShape } from './buttons/DownVoteButton';

function DetailThread({
  id,
  title,
  category,
  body,
  createdAt,
  owner,
  authUserId,
  upVotesBy,
  upVote,
  downVotesBy,
  downVote,
  neutralVote,
}) {
  return (
    <section className="detail-thread">
      <header>
        <p className="detail-thread__category">
          #
          {category}
        </p>
        <h2 className="detail-thread__title">{title}</h2>
      </header>
      <article>
        <p dangerouslySetInnerHTML={{ __html: body }} />
      </article>
      <footer>
        <div className="detail-thread__votes">
          <UpVoteButton
            id={id}
            upVotesBy={upVotesBy}
            authUserId={authUserId}
            upVote={upVote}
            neutralVote={neutralVote}
          />
          <DownVoteButton
            id={id}
            downVotesBy={downVotesBy}
            authUserId={authUserId}
            downVote={downVote}
            neutralVote={neutralVote}
          />
        </div>
        <div className="detail-thread__owner">
          <p>Created by</p>
          <img className="detail-thread__owner__avatar" alt="owner avatar" src={owner.avatar} />
          <h4 className="detail-thread__owner__name">{owner.name}</h4>
        </div>
        <p className="detail-thread__posted">{postedAt(createdAt)}</p>
      </footer>
    </section>
  );
}

const ownerShape = {
  name: PropTypes.string.isRequired,
};

DetailThread.propTypes = {
  ...upVoteButtonShape,
  ...downVoteButtonShape,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVote: PropTypes.func.isRequired,
  neutralVote: PropTypes.func.isRequired,
};

export default DetailThread;
