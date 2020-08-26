import React, {Component} from 'react';
import AppConstants from '../AppConstants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import currentUserAction from '../actions/currentUserAction'
import Home from '../components/Home/HomeComponent'

interface HomeProps {
  navigation: any;
  actions: any;
  route: any;
  currentUser: ICurrentUser;
}


class HomeScreen extends React.Component<HomeProps> {

  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <Home 
        navigation={this.props.navigation}
        currentUser={this.props.currentUser}
        setCurrentUserProfile={this.props.actions.currentUser.setCurrentUserProfile}
        setCurrentUserFollowers={this.props.actions.currentUser.setCurrentUserFollowers}
        setCurrentUserRepositories={this.props.actions.currentUser.setCurrentUserRepositories}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);