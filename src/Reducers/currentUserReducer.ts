import currentUserConstants from '../constants/currentUserConstants';

export const initialState: ICurrentUser = {
  profile: null,
};

const CurrentUserReducer = (state: State = initialState, action) => {
  switch (action.type) {
    
    case currentUserConstants.SET_CURRENT_PROFILE:
      return {
        ...state,
        profile: action.data
      }
    default:
      return state
  }
};

export default CurrentUserReducer;


