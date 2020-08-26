import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import AppConstants from '../AppConstants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

interface ProfileProps {
  navigation: any;
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