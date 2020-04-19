import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useAutoHeight from '@/hooks/useAutoHeight';
import * as actions from '@/data/rootActions';
import * as selectors from '@/data/rootSelectors';

const CommentForm = (props) => {
  const dispatch = useDispatch();
  const { postSeq, minHeight = 20, lineHeight = 20, placeholder = '!댓2글을 입력하세요...' } = props;
  const [contents, setContents] = useState('');
  const user = useSelector(selectors.users.getUser);
  const [textareaEl] = useAutoHeight(lineHeight, contents);
  const posts = useSelector(selectors.posts.getPosts);
  const comments = useSelector(selectors.comments.getComments);

  const writeComment = useCallback(
    (postId, contents) => {
      const newPosts = { ...posts };
      const post = newPosts.entities[postId];
      //post.comments = [];
      dispatch(actions.comments.writeComment(postId, contents, user, 1));
      //console.log('newPosts', newPosts);
      //console.log('posts', posts);
      //console.log('postId', postId);
      //console.log('post', post);
      //console.log('comments', comments);
    },
    [user, posts, comments]
  );

  const onSubmit = (e) => {
    e.preventDefault();
    writeComment(postSeq, contents);
    setContents('');
  };

  return (
    <form className="comment-form" onSubmit={onSubmit}>
      <textarea
        className="form-control input-lg"
        placeholder={placeholder}
        spellCheck="false"
        ref={textareaEl}
        value={contents}
        onChange={(e) => setContents(e.target.value)}
      />
      <button type="submit" className="btn btn-primary" disabled={!contents.trim().length}>
        댓글달기
      </button>

      <style jsx global>{`
        .comment-form {
          margin: 20px;
        }
        .comment-form > textarea.form-control {
          min-height: ${minHeight}px;
          line-height: ${lineHeight}px;
          border-radius: 0.5rem;
          resize: none;
        }
        .comment-form > button.btn {
          float: right;
          margin-bottom: 0;
          margin-top: 16px;
          background-color: #3b5999;
          color: #fffffe;
          border-color: unset;
          font-weight: 800;
        }
      `}</style>
    </form>
  );
};

export default CommentForm;
