import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, Platform, ScrollView, ActivityIndicator } from 'react-native';
import AppConstants from '../../AppConstants';
import { SearchBar, normalize } from 'react-native-elements';
import ApplicationService from '../../services/applicationService'

interface IHomeComponentProps {
    navigation: any;
    currentUser: ICurrentUser;
    setCurrentProfile?: (profile: IGitUser) => void;
}

interface IHomeComponentState {
    search: string;
    usersList: Array<IGitUser>;
    isLoading: boolean;
}

class Home extends React.Component<IHomeComponentProps, IHomeComponentState> {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            usersList: null,
            isLoading: false,
        }
    }

    async updateSearch(){
        this.setState({isLoading: true, usersList:[]})
        const usersList = await ApplicationService.searchUsers(this.state.search)
        this.setState({ 
            usersList: usersList?.isSuccess ? usersList.body?.items : [],
            isLoading: false
        });
    };
    
    renderUsersList(){
        return(
            <View style={{flex:1}}>
                {this.state.usersList.map((item, index) => {
                    return(
                        <TouchableOpacity
                            onPress={() => this.handleItemPressed(item)}
                            key={index}
                        >

                            <View style={{
                                backgroundColor:AppConstants.colors.white,
                                borderBottomWidth: 1,
                                padding: normalize(10),
                                flexDirection: 'row',
                                alignItems:'center'
                            }}>

                                <Image 
                                    style={{width:normalize(30), height:normalize(30)}}
                                    source={{uri: item.avatar_url}}
                                />
                                <Text style={{fontSize: normalize(12), marginLeft: normalize(8)}}>{item.login}</Text>
                        
                        </View>
                        </TouchableOpacity>
                    )
                })}
            </View>
        )
    }

    handleItemPressed(item: IGitUser){
        this.props.setCurrentProfile(item);
        this.props.navigation.navigate(AppConstants.routeName.profile)
    }

    clearSearch(){
        this.props.setCurrentProfile(null);
        this.setState({usersList:[]})
    }

    render() {
        return (
            <View style={styles.centeredView}>
                <ScrollView>
                    <View style={styles.logoContainer}>
                        <Image 
                            style={styles.logo}
                            source={require('../../assets/images/gitLogo.png')}
                        />
                    </View>
                    <SearchBar
                        placeholder="Type Here the Username..."
                        onChangeText={(value) => this.setState({search: value})}
                        onBlur={()=> this.updateSearch()}
                        value={this.state.search}
                        containerStyle={styles.search}
                        inputContainerStyle={{backgroundColor: AppConstants.colors.white}}
                        platform={Platform.OS === 'ios' ? 'ios' : 'android'}
                        onClear={() => this.clearSearch()}
                    />

                    <View style={styles.bodyContainer}>
                        {this.state.isLoading &&
                            <ActivityIndicator size={'large'} color={'white'} />
                        }

                        {!this.state.isLoading && this.state.usersList?.length > 0 &&
                            this.renderUsersList()
                        }
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default Home;


const styles = StyleSheet.create({
    centeredView: {
        backgroundColor: AppConstants.colors.dark,
        padding: normalize(20),
        flex: 1,

    },

    search:{
        width:'100%',
        backgroundColor: 'transparent',        
    },

    logoContainer:{
        height: normalize(200),
        alignItems: 'center',
        justifyContent: 'center'
    },

    logo:{
        height: normalize(150),
        width: normalize(150),
        tintColor: AppConstants.colors.white
    },

    bodyContainer:{
        justifyContent: 'center',
        height: '100%',
    }
});