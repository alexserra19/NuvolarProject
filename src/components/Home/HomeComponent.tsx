import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity, Platform, ScrollView, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import AppConstants from '../../AppConstants';
import { SearchBar, normalize } from 'react-native-elements';
import ApplicationService from '../../services/applicationService'
import { UserButton } from '../UserButton';
import CommonService from '../../services/commonService'

interface IHomeComponentProps {
    navigation: any;
    currentUser: ICurrentUser;
    setCurrentProfile?: (profile: IGitUser) => void;
}

interface IHomeComponentState {
    search: string;
    usersList: Array<IGitUser>;
    isLoading: boolean;
    isLandscape: boolean;
}

class Home extends React.Component<IHomeComponentProps, IHomeComponentState> {

    constructor(props) {
        super(props);
        this.state = {
            search: '',
            usersList: null,
            isLoading: false,
            isLandscape: false
        }
    }

    componentDidMount(){
        Dimensions.addEventListener('change', () => {
            this.setState({isLandscape: CommonService.isLandscape()})
        })
    }

    componentWillUnmount(){
        Dimensions.removeEventListener('change', () => {
            this.setState({isLandscape: CommonService.isLandscape()})
        })
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
            <View style={{flex:1, marginHorizontal:8}}>
                <FlatList
                    data={this.state.usersList}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.login}
                    maxToRenderPerBatch={4}
                />

                {/* {this.state.usersList.map((item, index) => {
                    return(
                        <UserButton 
                            item={item}
                            onPress={this.handleItemPressed.bind(this)}
                            index={index}
                        />
                    )
                })} */}
            </View>
        )
    }


    renderItem = ({item}) => (
        <UserButton 
            item={item}
            onPress={this.handleItemPressed.bind(this)}
        />    
    );


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
                <View style={[
                    styles.logoContainer,
                    {height: this.state.isLandscape? normalize(90) : normalize(250)}
                ]}>
                    <Image 
                        style={[
                            styles.logo,
                            { 
                                height: this.state.isLandscape? normalize(90) : normalize(200),
                                width: this.state.isLandscape? normalize(90) : normalize(200)
                            }
                        ]}
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
        alignItems: 'center',
        justifyContent: 'center'
    },

    logo:{
        tintColor: AppConstants.colors.white
    },

    bodyContainer:{
        justifyContent: 'center',
        height: '50%',
    }
});