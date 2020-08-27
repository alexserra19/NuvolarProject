import React from 'react';
import {View, StyleSheet, Image, Platform, ActivityIndicator, FlatList, Dimensions } from 'react-native';
import AppConstants from '../../AppConstants';
import { SearchBar, normalize } from 'react-native-elements';
import ApplicationService from '../../services/applicationService'
import { UserButton } from '../Shared/UserButton';
import CommonService from '../../services/commonService'

interface IHomeComponentProps {
    navigation: any;
    currentUser: ICurrentUser;
    setCurrentUserProfile?: (profile: IGitUser) => void;
    setCurrentUserFollowers?: (followers: IGitUser) => void;
    setCurrentUserRepositories?: (repositories: IGitUser) => void;

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
            isLandscape: CommonService.isLandscape()
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
            </View>
        )
    }


    renderItem = ({item}) => (
        <UserButton 
            item={item}
            onPress={this.handleItemPressed.bind(this)}
        />    
    );


    async handleItemPressed(item: IGitUser){
        this.props.setCurrentUserProfile(item); 
        this.props.navigation.navigate(AppConstants.routeName.profile)
    }

    clearSearch(){
        this.props.setCurrentUserProfile(null);
        this.setState({usersList:[]})
    }

    render() {
        return (
            <View style={styles.centeredView}>
                <View style={[
                    styles.logoContainer,
                    {marginVertical: this.state.isLandscape? normalize(10) : normalize(30)}
                ]}>
                    <Image 
                        style={[
                            styles.logo,
                            { 
                                height: this.state.isLandscape? normalize(70) : normalize(150),
                                width: this.state.isLandscape? normalize(70) : normalize(150)
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
        borderWidth: 0
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
        flex:1
    }
});