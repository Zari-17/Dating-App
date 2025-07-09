const _Environments = {
  development: {
    BASE_URL: `https://dating-app-backend-1-a9413d881c07.herokuapp.com/api/v1/`,
    LOGIN: `auth/login`,
    SIGNUP: `auth/register`,
    FORGET_PASSWORD: `auth/resetPasswordRequest`,
    RESET_PASSWORD: `auth/resetPassword`,
    GETPROFILE: `users/getprofile`,
    GET_USERS: `users/getAllusers`,
    GIVE_LIKE: `users/giveLike`,
    GET_MATCH: `match/getMatch`,
    POST_LOCATION: `location/add`,
    UPDATE_LOCATION: `location/update`,
    NEAR_ME: `location/nearMe`,
    MY_LIKE: `users/getAllLikes`,
    LIKE_FOR_ME: `users/likesForMe`,
    GIVE_DISLIKE: `users/giveDislike`,
    GET_NOTIFICATION: `users/getAllNotifications`,
    DELETE_ACCOUNT: `auth/deleteAccount`,
    REPORT_USER: `users/reportUser`,
    DISLIKE_USER: `users/giveDislike`,
    PAYMENT_URL: `payment/createPaymentIntent`,
    GET_PLANS: `payment/getActiveSubscriptions`,
    CREATE_SUBSCRIPTION: `payment/createSubscriptionIntent`,
    IS_ACTIVE: `users/islive`,
    GET_PROFILE_USING_HASHTAG: `users/getProileUsingHashtag`,
    GET_LIKE_DISLIKE: `users/getLikeDisLike`,
  },
};

function getEnvironment() {
  const platform = 'development';
  return _Environments[platform];
}

const Environment = getEnvironment();
export default Environment;
