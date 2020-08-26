import React from 'react';
import {View, StyleSheet, Image, ActivityIndicator, Dimensions, Text, ScrollView } from 'react-native';
import AppConstants from '../../AppConstants';
import { normalize } from 'react-native-elements';
import ApplicationService from '../../services/applicationService'
import CommonService from '../../services/commonService'
import asyncStorageService from '../../services/asyncStorageService';

interface IProfileComponentProps {
    currentUser: ICurrentUser;
    setCurrentUserFollowers?: (followers: IGitUser) => void;
    setCurrentUserRepositories?: (repositories: IGitUser) => void;
    setCurrentUserInfo?: (userInfo) => void;

}

interface IProfileComponentState {
    isLoading: boolean;
    isLandscape: boolean;
}

class Profile extends React.Component<IProfileComponentProps, IProfileComponentState> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isLandscape: false
        }
    }

    async componentDidMount(){
        Dimensions.addEventListener('change', () => {
            this.setState({isLandscape: CommonService.isLandscape()})
        });

        const followersResponse = await ApplicationService.getUserFollowersByUsername(this.props.currentUser.profile.login)
        const reposResponse = await ApplicationService.getUserReposByUsername(this.props.currentUser.profile.login)
        const userInfoResponse = await ApplicationService.getUserInformationByUsername(this.props.currentUser.profile.login)
        
        if(followersResponse.isSuccess) this.props.setCurrentUserFollowers(followersResponse.body);
        if(reposResponse.isSuccess) this.props.setCurrentUserRepositories(reposResponse.body);       
        if(userInfoResponse.isSuccess) this.props.setCurrentUserInfo(userInfoResponse.body);       
        
        await asyncStorageService.setItem(AppConstants.asyncStorageKeys.currentUser, this.props.currentUser)
        
        this.setState({isLoading: false})
    }

    componentWillUnmount(){
        Dimensions.removeEventListener('change', () => {
            this.setState({isLandscape: CommonService.isLandscape()})
        })
    }

    render() {
        return (
            <View style={styles.centeredView}>
                {this.state.isLoading &&

                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size={'large'} color={'white'} />
                    </View>
                }
                {!this.state.isLoading &&
                
                    <ScrollView>
                        <View style={styles.bodyContainer}>
                            <View style={[
                                styles.logoContainer,
                                {
                                    marginTop: this.state.isLandscape? normalize(10) : normalize(30),
                                    marginBottom: this.state.isLandscape? normalize(5) : normalize(15)
                                },
                            ]}>
                                <Image 
                                    style={[
                                        styles.logo,
                                        { 
                                            height: this.state.isLandscape? normalize(70) : normalize(150),
                                            width: this.state.isLandscape? normalize(70) : normalize(150)
                                        }
                                    ]}
                                    source={{uri: this.props.currentUser.profile.avatar_url}}
                                    />
                            </View>

                            <Text style={styles.usernameText}>
                                {this.props.currentUser.profile.login}
                            </Text>                    
                        </View>
                    </ScrollView>
                }
            </View>
        );
    }
}

export default Profile;


const styles = StyleSheet.create({
    centeredView: {
        backgroundColor: AppConstants.colors.dark,
        padding: normalize(20),
        flex: 1,
    },

    logoContainer:{
        alignItems: 'center',
        justifyContent: 'center',
    },

    logo:{
        borderRadius:100,
        borderColor: AppConstants.colors.white,
        borderWidth:3
    },

    loadingOverlay:{
        flex: 1,
        justifyContent: "center",
        position: 'absolute',
        right: 0,
        top: 0,
        left: 0,
        bottom: 0,
        alignItems: 'center'
    },

    bodyContainer:{
        flexDirection:'column',
        alignItems: 'center'
    },

    usernameText:{
        fontWeight:'bold', 
        fontSize:normalize(20),
        color: AppConstants.colors.white,
    }

});