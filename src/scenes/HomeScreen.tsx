import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import AppConstants from '../AppConstants';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import userInformationActions from '../actions/userInformation.actions'

interface HomeProps {
  navigation: any;
  generalConfiguration:any;
  actions: any;
  route: any;
  userInformation: any;
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
      <View style={styles.container}>

        <TouchableOpacity
          style={[styles.button]}
          onPress={() => this.props.navigation.navigate(AppConstants.routeName.profile)}
        >
            <Text style={styles.buttonText}>press me</Text>
        </TouchableOpacity>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:AppConstants.colors.red,
    height:'100%'
  }
});