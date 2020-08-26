import userInformationConstants from '../constants/userInformation.constants';
import AppConstants from '../AppConstants';

export interface State {
  removeAdsCode: string;
  validationProcess: Boolean;
}

export const initialState: State = {
  removeAdsCode: null,
  validationProcess: false,
};

const userInformationReducer = (state: State = initialState, action) => {
  switch (action.type) {
    
    case userInformationConstants.SET_ADS_CODE:
      return {
        ...state,
        removeAdsCode: action.data
      }
    case userInformationConstants.ADS_CODE_VALIDATION_START:
      return {
        ...state,
        validationProcess: true
      }
      
    case userInformationConstants.ADS_CODE_VALIDATION_FINISH:
      return {
        ...state,
        validationProcess: false
      }
    default:
      return state
  }
};

export default userInformationReducer;


