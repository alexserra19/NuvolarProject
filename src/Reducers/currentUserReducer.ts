import currentUserConstants from '../constants/currentUserConstants';

export const initialState: ICurrentUser = {
  profile: null,
  followers: null,
  repositories: null,
  userInfo: null
};

const CurrentUserReducer = (state: ICurrentUser = initialState, action) => {
  switch (action.type) {
    case currentUserConstants.SET_CURRENT_USER_PROFILE:
      return {
        ...state,
        profile: action.data
      }
  
    case currentUserConstants.SET_CURRENT_USER_FOLLOWERS:
      return {
        ...state,
        followers: action.data
      }

    case currentUserConstants.SET_CURRENT_USER_REPOSITORIES:
      return {
        ...state,
        repositories: action.data
      }

    case currentUserConstants.SET_CURRENT_USER_INFO:
      return {
        ...state,
        userInfo: action.data
      }
    default:
      return state
  }
};

export default CurrentUserReducer;


