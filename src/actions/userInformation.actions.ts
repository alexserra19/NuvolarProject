import userInformationConstants from '../constants/userInformation.constants';
import { Action } from 'redux';

const userInformationAction: IUserInformationAction = {
  
  loadUserInfo() {
    return {
      type: userInformationConstants.LOAD_USER_INFO,
    };
  },
  setRemoveAdsCode(code) {
    return {
      type: userInformationConstants.SET_ADS_CODE,
      data: code,
    };
  },
  adsCodeValidationStart() {
    return {
      type: userInformationConstants.ADS_CODE_VALIDATION_START,
    };
  },
  adsCodeValidationFinish() {
    return {
      type: userInformationConstants.ADS_CODE_VALIDATION_FINISH,
    };
  },
}

export default userInformationAction;

export interface IUserInformationAction {
  loadUserInfo?: () => Action;
  setRemoveAdsCode?: (code) => Action;
  adsCodeValidationStart?: () => Action;
  adsCodeValidationFinish?: () => Action;

}
