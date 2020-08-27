import React, { StatelessComponent } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import { normalize } from 'react-native-elements';
import AppConstants from '../../AppConstants';

interface IUserButtonProps {
    item: any;
    onPress: (item) => void;
}

export const UserButton: StatelessComponent<IUserButtonProps> = (props) =>  (
    <TouchableOpacity
        onPress={() => props.onPress(props.item)}
        style={{
            borderRadius: 10,
            backgroundColor:AppConstants.colors.white,
            padding: normalize(10),
            marginBottom: normalize(7),
            height: normalize(40),
            justifyContent:'center'
        }}
    >
        <View style={{
            flexDirection: 'row',
            alignItems:'center',
        }}>
            <Image 
                style={{width:normalize(30), height:normalize(30), borderRadius:50}}
                source={{uri: props.item.avatar_url}}
            />
            <Text style={{fontSize: normalize(13), marginLeft: normalize(8)}}>
                {props.item.login.length < 20
                    ? `${props.item.login}`
                    : `${props.item.login.substring(0, 20)}...`}
            </Text>
            
            <Image 
                style={{
                    width:normalize(20), 
                    height:normalize(20), 
                    borderRadius:50, 
                    position:'absolute', 
                    right:0,
                    tintColor:AppConstants.colors.dark
                }}
                source={require('../../assets/images/arrow-right.png')}
            />
            
        </View>
    </TouchableOpacity>
);


const styles = StyleSheet.create({
   
})

