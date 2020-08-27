import React from 'react';
import {View, StyleSheet, Image, ActivityIndicator, Dimensions, Text, ScrollView } from 'react-native';
import AppConstants from '../../AppConstants';
import { normalize } from 'react-native-elements';
import ApplicationService from '../../services/applicationService'
import CommonService from '../../services/commonService'
import asyncStorageService from '../../services/asyncStorageService';
import { UserInfoRow } from '../Shared/UserInfoRow';
import { CommonModal } from '../Modals/CommonModal';

interface IProfileComponentProps {
    currentUser: ICurrentUser;
    setCurrentUserFollowers?: (followers: IGitUser) => void;
    setCurrentUserRepositories?: (repositories: IGitUser) => void;
    setCurrentUserInfo?: (userInfo) => void;

}

interface IProfileComponentState {
    isLoading: boolean;
    isLandscape: boolean;
    isModalShown: boolean;
    modalInfo: Array<{}>;
    modalTitle: string;

}

class Profile extends React.Component<IProfileComponentProps, IProfileComponentState> {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isLandscape: CommonService.isLandscape(),
            isModalShown: false,
            modalInfo: null,
            modalTitle: null,
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

                            <View style={styles.headerInfo}>
                                <View style={[
                                    styles.logoContainer,
                                    {
                                        marginTop: this.state.isLandscape? normalize(10) : normalize(20),
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
                                    {this.props.currentUser.userInfo?.login}
                                </Text>
                                <Text style={styles.nameSubText}>
                                    {!!this.props.currentUser.userInfo?.name ? this.props.currentUser.userInfo?.name : 'Undefined'}
                                </Text>  
                            </View>
                            <View style={styles.userInfoContainer}>
                                <UserInfoRow 
                                    label={this.props.currentUser.userInfo?.login}
                                    image={require('../../assets/images/gitLogo.png')}
                                />
                                <UserInfoRow 
                                    label={this.props.currentUser.userInfo?.name}
                                    image={require('../../assets/images/user-name.png')}
                                />
                                <UserInfoRow 
                                    label={this.props.currentUser.userInfo?.bio}
                                    image={require('../../assets/images/user-bio.png')}
                                />
                                <UserInfoRow 
                                    label={this.props.currentUser.userInfo?.company}
                                    image={require('../../assets/images/user-company.png')}
                                />
                                <UserInfoRow 
                                    label={this.props.currentUser.userInfo?.location}
                                    image={require('../../assets/images/user-location.png')}
                                />
                                <UserInfoRow 
                                    label={this.props.currentUser.userInfo?.email}
                                    image={require('../../assets/images/user-email.png')}
                                />
                                <UserInfoRow 
                                    label={this.props.currentUser.userInfo?.followers}
                                    image={require('../../assets/images/user-followers.png')}
                                    displayInfo={true}
                                    displayInfoAction={() => this.setState({
                                        isModalShown: true,
                                        modalTitle: 'Followers',
                                        modalInfo: this.props.currentUser.followers
                                    })}
                                />
                                <UserInfoRow 
                                    label={this.props.currentUser.userInfo?.public_repos}
                                    image={require('../../assets/images/user-repositories.png')}
                                    displayInfo={true}
                                    displayInfoAction={() => this.setState({
                                        isModalShown: true,
                                        modalTitle: 'Repositories',
                                        modalInfo: this.props.currentUser.repositories
                                    })}
                                />
                            </View>                  
                        </View>
                        {this.state.isModalShown &&
                            <CommonModal 
                                title={this.state.modalTitle}
                                buttonText={'Close'}
                                onPress={() => this.setState({
                                    isModalShown: false,
                                    modalTitle: null,
                                    modalInfo: null
                                })}
                                modalInfo={this.state.modalInfo}
                                color={AppConstants.colors.dark}
                            />
                        }    
                    </ScrollView>
                }
            </View>
        );
    }
}

export default Profile;


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: AppConstants.colors.dark,
    },

    headerInfo:{
        width:'100%',
        alignItems:'center',
        // borderBottomWidth:1, 
        // borderBottomColor: AppConstants.colors.gray,
        paddingBottom: normalize(20)
    },

    logoContainer:{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppConstants.colors.dark,
    },

    logo:{
        borderRadius:100,
        borderColor: AppConstants.colors.white,
        borderWidth:1
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
        alignItems: 'center',
        width:'100%'
    },

    usernameText:{
        fontWeight:'bold', 
        fontSize:normalize(20),
        color: AppConstants.colors.white,
    },
    nameSubText:{
        fontWeight:'bold', 
        fontSize:normalize(13),
        color: AppConstants.colors.blue,
    },

    userInfoContainer:{
        width:'100%',
    }

});