import {USER_LOGOUT, USER_LOGIN,USER_PROFILE_PICTURE,USER_FCM_TOKEN} from '../actionType';

export const logout = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const login = userData => {
  return {
    type: USER_LOGIN,
    userData,
  };
};

export const getProfilePicture = profilePicture => {
  return {
    type: USER_PROFILE_PICTURE,
    profilePicture,
  };
};

export const getFCMToken = token => {
  return {
    type: USER_FCM_TOKEN,
    token,
  };
};
