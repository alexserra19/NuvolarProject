import React, { StatelessComponent } from 'react';
import {View, StyleSheet,Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import AppConstants from '../../AppConstants';
import Modal from 'react-native-modal';
import { normalize } from 'react-native-elements';


interface ICommonModalProps {
    title?: string;
    buttonText?: string;
    onPress?: () => void;
    onDismiss?: () => void;
    color: string
    modalInfo?: Array<any>
}

export const CommonModal: StatelessComponent<ICommonModalProps> = (props) =>{

    console.log('aaaa', props)
    return (
        <View style={styles.centeredView}>
            <Modal isVisible={true}>
                <View style={styles.modalContent}>
                    <Text style={[styles.modalTitleText, {color:props.color}]}>{props.title}</Text>

                    {props.modalInfo &&
                        <ScrollView style={styles.modalInfoList}>
                            {props.modalInfo.map((item, index) => (
                                <View style={styles.rowData}>
                                    <Image 
                                        style={styles.rowIcon}
                                        source={props.title === 'Followers' ? 
                                            require('../../assets/images/user-icon.png')
                                            : require('../../assets/images/user-repositories.png')
                                        }
                                    />                                    
                                    <Text style={styles.textInfo}>
                                        {props.title === 'Followers' ? item.login : item.name}
                                    </Text>
                                </View>
                            ))}
                        </ScrollView>
                    } 
                    <TouchableOpacity
                        style={[styles.onPressButton, styles.button, {backgroundColor:props.color}]}
                        onPress={props.onPress}
                    >
                        <Text style={styles.buttonText}>{props.buttonText}</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        ...StyleSheet.absoluteFillObject,
        opacity:0.2,
    },

    modalTitleText:{
        fontSize: normalize(18),
        textAlign:'center',
        marginBottom: normalize(3),
        fontWeight:'bold'
    },

    modalContent: {
        backgroundColor: '#ffffff',
        padding: 20,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderRadius:10, 
        flexDirection:'column', 
        justifyContent:'center', 
        overflow:'hidden',
        alignItems: 'center',
    },

    button:{
        padding:10,
        width:200,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30,
        elevation:999,
    },

    onPressButton:{
        marginBottom:5,
    },

    buttonText:{
        color: AppConstants.colors.white,
        fontSize: normalize(15),
    },

    modalInfoList:{
        marginVertical: normalize(10),
        height: normalize(190),
        width:'100%',
        paddingLeft: normalize(10)
    },

    rowData:{
        flexDirection:'row',
        width:'80%',
        alignItems:'center',
        marginBottom: normalize(7)
    },
    rowIcon: {
        width:normalize(23), 
        height:normalize(23),
        marginRight:normalize(10),
        tintColor: AppConstants.colors.dark
    },
    textInfo:{
        fontSize: normalize(15), 
        marginLeft: normalize(8), 
        color: AppConstants.colors.dark,
    }
  });