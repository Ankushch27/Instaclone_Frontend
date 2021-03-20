import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';

const Post = ({ post, likePost, deletePost, postComment }) => {
  const { image, likes, comments, postedBy } = post;
  const {
    loginState: {
      userData: { _id },
    },
  } = useAuthContext();
  const [shouldLike, setShouldLike] = useState(likes.includes(_id) ? false : true);

  return (
    <div className="post-card">
      <div className="post-author">
        <img src={image} alt="" />
        <Link to={`/${postedBy._id}`}>
          <div>{postedBy.name}</div>
        </Link>
        <FontAwesomeIcon icon="trash" onClick={() => deletePost()} />
      </div>
      <div className="post-image">
        <img src={image} alt="" />
      </div>
      <div className="post-content">
        <FontAwesomeIcon
          icon="heart"
          onClick={() => {
            setShouldLike(!shouldLike);
            likePost(shouldLike);
          }}
        />
        <FontAwesomeIcon icon="paper-plane" />
        <div className="caption">
          <h4>
            {likes.length} {likes.length === 1 ? 'Like' : 'Likes'}
          </h4>
          caption
        </div>
      </div>
      <div className="comments">
        {comments.map((comment) => (
          <div className="comment" key={comment._id}>
            <h4>{comment.postedBy.name}</h4>
            <span>{comment.text}</span>
          </div>
        ))}
      </div>
      <div className="post-comment-input">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            postComment(e.target[0].value);
          }}>
          <input type="text" placeholder="Add a comment..." />
        </form>
      </div>
    </div>
  );
};

export default Post;
