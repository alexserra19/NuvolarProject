import currentUserConstants from '../constants/currentUserConstants';
import { Action } from 'redux';

const currentUserAction: ICurrentUserAction = {
  
  setCurrentProfile(profile) {
    return {
      type: currentUserConstants.SET_CURRENT_PROFILE,
      data: profile,
    };
  },
}

export default currentUserAction;

export interface ICurrentUserAction {
  setCurrentProfile?: (profile: IGitUser) => Action;
}
