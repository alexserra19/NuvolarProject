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

export interface HomeState {
  currentTab: string;
}

class HomeScreen extends React.Component<HomeProps, HomeState> {


  constructor(props) {
    super(props);
  }
  
  componentDidMount(){

  }

  render() {
    return (
      <Home 
        navigation={this.props.navigation}
        currentUser={this.props.currentUser}
        setCurrentProfile={this.props.actions.currentUser.setCurrentProfile}
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