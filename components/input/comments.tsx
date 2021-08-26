import { useContext, useEffect, useState } from 'react';

import { NextPage } from 'next';

import api from '../../helpers/api';
import NotificationContext from '../../store/notification-context';
import { IComment } from '../../types/interfaces';
import CommentList from './comment-list';
import classes from './comments.module.css';
import NewComment from './new-comment';

const Comments: NextPage<{ eventId }> = ({ eventId }) => {
  const { showNotification } = useContext(NotificationContext);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [isFetchingComments, setIsFetchingComments] = useState(false);

  useEffect(() => {
    if (!showComments || !eventId) return;
    setIsFetchingComments(true);

    api.comment
      .list(eventId)
      .then(({ data }) => setComments(data.comments))
      .finally(() => setIsFetchingComments(false));
  }, [eventId, showComments]);

  const toggleCommentsHandler = () =>
    setShowComments((prevStatus) => !prevStatus);

  const addCommentHandler = (commentData) => {
    showNotification({
      title: 'Sending comment...',
      message: 'Your comment is currently being stored into a database...',
      status: 'pending',
    });

    api.comment
      .create(commentData, eventId)
      .then(() =>
        showNotification({
          title: 'Success!',
          message: 'Your comment was saved!',
          status: 'success',
        })
      )
      .catch((e) =>
        showNotification({
          title: 'Error!',
          message: e.message || 'Something went wrong!',
          status: 'error',
        })
      );
  };

  return (
    <section className={classes.comments}>
      <button type="button" onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isFetchingComments && <CommentList items={comments} />}
      {showComments && isFetchingComments && <p>Is loading...</p>}
    </section>
  );
};

export default Comments;
