import {
  USER_LOGOUT,
  USER_LOGIN,
  USER_PROFILE_PICTURE,
  USER_FCM_TOKEN,
} from '../actionType';

// init state
const initState = {
  userData: {},
  isLogin: false,
  profilePicture: null,
  token: '',
};

export default reducer = (state = initState, action) => {
  switch (action.type) {
    case USER_LOGOUT:
      return {
        ...state,
        isLogin: false,
        userData: {},
      };
    case USER_LOGIN:
      return {
        ...state,
        isLogin: true,
        userData: action.userData,
      };
    case USER_PROFILE_PICTURE:
      return {
        ...state,
        profilePicture: action.profilePicture,
      };
    case USER_FCM_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};
