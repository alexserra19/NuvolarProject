import React, { StatelessComponent } from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType, TouchableOpacity } from 'react-native';
import { normalize } from 'react-native-elements';
import AppConstants from '../../AppConstants';

interface IUserInfoRowProps {
    label: string;
    image: ImageSourcePropType;
    displayInfo?: boolean;
}

export const UserInfoRow: StatelessComponent<IUserInfoRowProps> = (props) =>  {

    return  !!props.label? (
        <View style={styles.rowContainer}>
            <Image 
                style={styles.rowIcon}
                source={props.image}
            />
            <Text style={styles.rowLabel}>
                {props.label}
            </Text>

            {props.displayInfo &&

                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={()=> console.log('click')}
                >
                    <Image 
                        style={styles.rowIcon}
                        source={require('../../assets/images/view-info.png')}
                    />
                </TouchableOpacity>
            }
        </View>
    ) : null 
}


const styles = StyleSheet.create({

    rowContainer:{
        flexDirection:'row', 
        alignItems:'center', 
        borderBottomWidth:1, 
        borderBottomColor: AppConstants.colors.gray,
        padding: normalize(10),
        paddingLeft:normalize(15),
    },
    rowIcon: {
        width:normalize(23), 
        height:normalize(23),
        marginRight:normalize(10),
        tintColor: AppConstants.colors.white
    },
    rowLabel:{
        fontSize: normalize(15), 
        marginLeft: normalize(8), 
        color: AppConstants.colors.white,
        flex: 1
    },
    buttonContainer:{
        position:'absolute',
        right:0
    }
})

