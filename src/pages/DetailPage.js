/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CommentInput from '../components/comments/CommentInput';
import CommentsList from '../components/comments/CommentsList';
import DetailThread from '../components/DetailThread';
import {
  asyncAddComment,
  asyncUpVoteComment,
  asyncDownVoteComment,
  asyncNeutralizeVoteComment,
} from '../states/comments/action';
import { asyncReceiveDetailThreadAndComments } from '../states/shared/action';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralizeVoteThread,
} from '../states/threads/action';

function DetailPage() {
  const { id } = useParams();
  const {
    authUser,
    detailThread = null,
    comments = [],
    users = [],
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncReceiveDetailThreadAndComments(id));
  }, [id, dispatch]);

  const onCommentThread = (content) => {
    dispatch(asyncAddComment({ content, threadId: id }));
  };

  const onUpVoteThread = () => {
    authUser === null
      ? alert('You must login to vote')
      : dispatch(asyncUpVoteThread(id));
  };

  const onDownVoteThread = () => {
    authUser === null
      ? alert('You must login to vote')
      : dispatch(asyncDownVoteThread(id));
  };

  const onNeutralVoteThread = () => {
    dispatch(asyncNeutralizeVoteThread(id));
  };

  const onUpVoteComment = (commentId) => {
    authUser === null
      ? alert('You must login to vote')
      : dispatch(asyncUpVoteComment({ threadId: id, commentId }));
  };

  const onDownVoteComment = (commentId) => {
    authUser === null
      ? alert('You must login to vote')
      : dispatch(asyncDownVoteComment({ threadId: id, commentId }));
  };

  const onNeutralVoteComment = (commentId) => {
    dispatch(asyncNeutralizeVoteComment({ threadId: id, commentId }));
  };

  if (!detailThread) {
    return null;
  }

  const commentsList = comments.map((comment) => ({
    ...comment,
    user: users.find((user) => user.id === comment.owner.id),
  }));

  if (authUser === null) {
    return (
      <section className="detail-page">
        <DetailThread
          {...detailThread}
          upVote={onUpVoteThread}
          downVote={onDownVoteThread}
          neutralVote={onNeutralVoteThread}
        />
        <CommentInput authUser={authUser} commentThread={onCommentThread} />
        <CommentsList
          comments={commentsList}
          upVote={onUpVoteComment}
          downVote={onDownVoteComment}
          neutralVote={onNeutralVoteComment}
        />
      </section>
    );
  }

  return (
    <section className="detail-page">
      <DetailThread
        {...detailThread}
        authUserId={authUser.id}
        upVote={onUpVoteThread}
        downVote={onDownVoteThread}
        neutralVote={onNeutralVoteThread}
      />
      <CommentInput authUser={authUser} commentThread={onCommentThread} />
      <CommentsList
        comments={commentsList}
        authUserId={authUser.id}
        upVote={onUpVoteComment}
        downVote={onDownVoteComment}
        neutralVote={onNeutralVoteComment}
      />
    </section>
  );
}

export default DetailPage;
