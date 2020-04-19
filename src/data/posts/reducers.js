import { combineReducers } from 'redux';
import * as ActionTypes from '@/data/rootActionTypes';

const INITIAL_ENTITIES_STATE = {
  [0]: {
    seq: 0,
    writer: { name: 'Jason', profileImageUrl: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50' },
    contents: 'Hello guys! Have a good weekend. Learning React is really fun!',
    createAt: Date.now(),
    likes: 1,
    comments: 0,
    likesOfMe: true,
  },
};

function entities(state = INITIAL_ENTITIES_STATE, action = {}) {
  switch (action.type) {
    case ActionTypes.ADD_POST_SUCCESS:
      return {
        ...state,
        [Object.keys(state).length]: {
          seq: Object.keys(state).length,
          writer: action.user,
          contents: action.contents,
          createAt: Date.now(),
          likes: 0,
          comments: 0,
          likesOfMe: false,
        },
      };
    case ActionTypes.GET_USER_POSTS_SUCCESS: {
      return Object.values(action.data);
    }
    case ActionTypes.LIKE_POST: {
      const findIndex = [...state].findIndex((v) => v.seq === action.postId);
      const newLikedPost = { ...state[findIndex] };
      if (newLikedPost.likesOfMe === false) {
        newLikedPost.likes += 1;
        newLikedPost.likesOfMe = true;
      } else {
        newLikedPost.likesOfMe = false;
        newLikedPost.likes -= 1;
      }
      return {
        ...state,
        [findIndex]: newLikedPost,
      };
    }
    default:
      return state;
  }
}

const INITIAL_IDS_STATE = [0];

function ids(state = INITIAL_IDS_STATE, action = {}) {
  switch (action.type) {
    case ActionTypes.GET_POSTS:
      return [...state];
    case ActionTypes.GET_USER_POSTS_SUCCESS:
      const postIds = action.data.map((v) => v.seq);
      return postIds;
    case ActionTypes.ADD_POST_SUCCESS:
      return [state.length, ...state];
    default:
      return state;
  }
}

export default combineReducers({
  entities,
  ids,
});
