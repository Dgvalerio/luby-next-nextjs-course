import { useEffect, useState } from 'react';

import { NextPage } from 'next';

import api from '../../helpers/api';
import { IComment } from '../../pages/api/comments/[eventId]';
import CommentList from './comment-list';
import classes from './comments.module.css';
import NewComment from './new-comment';

const Comments: NextPage<{ eventId }> = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    if (!showComments || !eventId) return;

    api.comment.list(eventId).then(({ data }) => setComments(data.comments));
  }, [eventId, showComments]);

  const toggleCommentsHandler = () =>
    setShowComments((prevStatus) => !prevStatus);

  const addCommentHandler = (commentData) => {
    api.comment
      .create(commentData, eventId)
      .then(({ data }) => console.log(data));
  };

  return (
    <section className={classes.comments}>
      <button type="button" onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
};

export default Comments;
