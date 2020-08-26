import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import AppConstants from '../AppConstants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userInformationActions from '../actions/userInformation.actions'

interface ProfileProps {
  navigation: any;
  generalConfiguration:any;
  actions: any;
  route: any;
  userInformation: any;
}

export interface ProfileState {
  currentTab: string;
}

class ProfileScreen extends React.Component<ProfileProps, ProfileState> {

  componentDidMount(){
  }




  render() {
    return (
      <View style={styles.container}>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  userInformation: state.userInformationReducer
});

function mapDispatchToProps(dispatch) {
  return{
    actions: {
      userInformationActions: bindActionCreators<any, any>(userInformationActions, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:AppConstants.colors.blue,
    height:'100%'
  }
});