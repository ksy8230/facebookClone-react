import * as ActionTypes from '@/data/rootActionTypes';
import axios from 'axios';
import { apiUrl } from '@/service';

export function writePostSuccess(contents, user) {
  return {
    type: ActionTypes.ADD_POST_SUCCESS,
    contents,
    user,
  };
}

export function writePost(contents, user) {
  return (dispatch, getState) => {
    axios
      .post(
        `${apiUrl}/post`,
        { contents, user },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((response) => {
        const contents = response.data.response.contents;
        const user = response.data.response.writer;
        dispatch(writePostSuccess(contents, user));
      })
      .catch((error) => {
        console.log(error.response);
        alert(error.response.data.error.message);
      });
  };
}

export function getUserPostsSuccess(data) {
  return {
    type: ActionTypes.GET_USER_POSTS_SUCCESS,
    data,
  };
}

export function getUserPosts(id) {
  return (dispatch, getState) => {
    axios
      .get(`${apiUrl}/user/${id}/post/list`)
      .then((response) => {
        const data = response.data.response;
        dispatch(getUserPostsSuccess(data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
}

export function getPosts() {
  return {
    type: ActionTypes.GET_POSTS,
  };
}

export function likePostSuccess(postId) {
  return {
    type: ActionTypes.LIKE_POST,
    postId,
  };
}

export function likePost(postId, userId) {
  return (dispatch, getState) => {
    axios.patch(`${apiUrl}/user/${userId}/post/${postId}/like`).then((response) => {
      const data = response.data.response.seq;
      dispatch(likePostSuccess(data));
    });
  };
}
