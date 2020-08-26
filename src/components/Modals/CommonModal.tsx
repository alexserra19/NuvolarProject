import React, { StatelessComponent, useState } from 'react';
import {View, Image, StyleSheet,Text, TextInput, TouchableOpacity } from 'react-native';
import AppConstants from '../../AppConstants';
import Modal from 'react-native-modal';
import I18n from '../../i18n';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


interface ICommonModalProps {
    title?: string;
    buttonText?: string;
    onPress?: () => void;
    onDismiss?: () => void;
    color: string
}

export const CommonModal: StatelessComponent<ICommonModalProps> = (props) =>{

    return (
        <View style={styles.centeredView}>
            <Modal isVisible={true}>
                <View style={styles.modalContent}>
                    <Text style={[styles.modalTitleText, {color:props.color}]}>{props.title}</Text>

                    <TouchableOpacity
                        style={[styles.onPressButton, styles.button, {backgroundColor:props.color}]}
                        onPress={props.onPress}
                    >
                        <Text style={styles.buttonText}>{props.buttonText}</Text>
                    </TouchableOpacity>

                    {props.onDismiss &&
                        <TouchableOpacity
                            style={[styles.cancelButton, styles.button, {borderColor:props.color, borderWidth:2}]}
                            onPress={props.onDismiss}
                        >
                            <Text style={[styles.buttonText,{color: props.color}]}>{I18n.t("buttons.cancel")}</Text>
                        </TouchableOpacity>
                    }
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
        fontSize: wp('8%'),
        fontFamily:'Amaranth-BoldItalic',
        textAlign:'center',
        marginBottom: hp('3%')
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

    cancelButton:{
        marginTop: hp('1%'),
        backgroundColor: AppConstants.colors.white
    },

    onPressButton:{
        marginBottom:5,
    },

    buttonText:{
        color: AppConstants.colors.white,
        fontSize: wp('6%'),
        fontFamily:'Amaranth-Bold',
    }

  });