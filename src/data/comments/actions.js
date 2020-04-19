import * as ActionTypes from '@/data/rootActionTypes';
import axios from 'axios';
import { apiUrl } from '@/service';

export function getCommentsSuccess(postId, comments) {
  return {
    type: ActionTypes.GET_COMMENTS,
    comments,
    postId,
  };
}

export function getComments(postId, userId) {
  return (dispatch, getState) => {
    axios
      .get(`${apiUrl}/user/${userId}/post/${postId}/comment/list`)
      .then((response) => {
        const comments = response.data.response;
        dispatch(getCommentsSuccess(postId, comments));
      })
      .catch((error) => {
        console.log(error.data.error.message);
      });
  };
}

export function writeCommentSuccess(postId, contents, writer) {
  return {
    type: ActionTypes.ADD_COMMENT,
    contents,
    writer,
    postId,
  };
}

export function writeComment(postId, contents, writer, userId) {
  return (dispatch, getState) => {
    axios
      .post(`${apiUrl}/user/${userId}/post/${postId}/comment`, { contents })
      .then((response) => {
        const contents = response.data.response.contents;
        const user = response.data.response.writer;
        dispatch(writeCommentSuccess(postId, contents, user));
      })
      .catch((error) => {
        console.log(error.response.data.error.message);
        alert(error.response.data.error.message);
      });
  };
}
