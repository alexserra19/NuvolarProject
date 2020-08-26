import currentUserConstants from '../constants/currentUserConstants';
import { Action } from 'redux';

const currentUserAction: ICurrentUserAction = {
  
  setCurrentUserProfile(profile) {
    return {
      type: currentUserConstants.SET_CURRENT_USER_PROFILE,
      data: profile,
    };
  },

  setCurrentUserFollowers(followers) {
    return {
      type: currentUserConstants.SET_CURRENT_USER_FOLLOWERS,
      data: followers,
    };
  },

  setCurrentUserRepositories(repositories) {
    return {
      type: currentUserConstants.SET_CURRENT_USER_REPOSITORIES,
      data: repositories,
    };
  },

  setCurrentUserInfo(userInfo) {
    return {
      type: currentUserConstants.SET_CURRENT_USER_INFO,
      data: userInfo,
    };
  },
}

export default currentUserAction;

export interface ICurrentUserAction {
  setCurrentUserProfile?: (profile: IGitUser) => Action;
  setCurrentUserFollowers?: (followers) => Action;
  setCurrentUserRepositories?: (repositories) => Action;
  setCurrentUserInfo?: (userInfo) => Action;

}
