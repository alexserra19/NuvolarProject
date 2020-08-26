import React, {Component} from 'react';
import AppConstants from '../AppConstants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import currentUserAction from '../actions/currentUserAction'
import Profile from '../components/Profile/ProfileComponent'

interface IProfileScreenProps {
  navigation: any;
  actions: any;
  route: any;
  currentUser: ICurrentUser;
}

class ProfileScreen extends React.Component<IProfileScreenProps> {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Profile 
        currentUser={this.props.currentUser}
        setCurrentUserFollowers={this.props.actions.currentUser.setCurrentUserFollowers}
        setCurrentUserRepositories={this.props.actions.currentUser.setCurrentUserRepositories}
        setCurrentUserInfo={this.props.actions.currentUser.setCurrentUserInfo}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUserReducer
});

function mapDispatchToProps(dispatch) {
  return{
    actions: {
      currentUser: bindActionCreators<any, any>(currentUserAction, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);