import React from 'react';
import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
// import Toast from "react-native-toast-message";

export default function SignUpConfirmation({navigation}) {
    let enteredOtp;
    const checkOTP = () => {
        return (enteredOtp === '999999') ? navigation.navigate('Homepage') : alert("Invalid OTP");
    }

    return (
        <View style={styles.background}>
            <View style={styles.headContainer}>
                <View style={styles.backContainer}>
                    <Ionicons name={'arrow-back'} size={45} color={"#660032"}/>
                </View>
                <View style={styles.logoContainer}>
                    <View style={styles.logo}>
                        <Image source={require("../../assets/Logo.png")}
                               style={styles.imageLogo}
                        />
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>We Sent You an OTP code Please Enter it</Text>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <View style={styles.input}>
                    <TextInput placeholder={"OTP"}
                               placeholderTextColor={"#660032"}
                               onChangeText={(text) => {
                                   enteredOtp = text
                               }}
                               maxLength={6}/>
                </View>
            </View>
            <View style={styles.actionsContainer}>
                <View style={styles.submitContainer}>
                    <TouchableOpacity style={styles.submit} onPress={checkOTP}>
                        <Text style={{color: 'white', fontSize: 20}}>Submit</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.resendContainer}>
                    <TouchableOpacity style={styles.resend}>
                        <Text style={{color: '#660032', fontSize: 20}}>Resend The OTP</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.changePhoneContainer}>
                    <TouchableOpacity style={styles.changePhone}>
                        <Text style={{color: '#660032', fontSize: 20}}>Change My Phone Number</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white',
    },

    headContainer: {
        flex: 3,
        // backgroundColor: 'blue',
    },
    backContainer: {
        marginTop: 10,
        justifyContent: 'center'
    },
    logoContainer: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

        // backgroundColor: 'green',
    },
    logo: {
        height: 125,
        width: 125,
        borderColor: '#660032',
        borderWidth: 2,
        borderRadius: 150 / 2,

        alignItems: 'center',
        justifyContent: 'center',
    },
    imageLogo: {
        // alignSelf: 'center',
        height: 87,
        width: 57,

        // marginTop: 12,
        marginLeft: 4,
    },

    textContainer: {
        marginTop: '20%',
        alignSelf: 'center',
        // backgroundColor: 'red',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 14,
        color: '#660032',
    },

    inputContainer: {
        flex: 1,
        // backgroundColor: '#165815',
        justifyContent: 'center',

        paddingHorizontal: 90,
    },
    input: {
        height: 47,
        // backgroundColor: 'red',

        borderColor: '#660032',
        borderWidth: 2,
        borderRadius: 50,

        paddingLeft: 15,
        padding: 10,
    },

    actionsContainer: {
        flex: 4,
    },
    submitContainer: {
        marginTop: 7,
        justifyContent: 'center',
        paddingHorizontal: 130,
    },
    submit: {
        height: 40,
        backgroundColor: '#660032',

        borderColor: '#660032',
        borderWidth: 2,
        borderRadius: 50,

        justifyContent: 'center',
        alignItems: 'center',
    },
    resendContainer: {
        alignSelf: 'center',
        marginTop: '30%',
        marginBottom: 10,
    },
    resend: {},
    changePhoneContainer: {
        alignSelf: 'center',
    },
    changePhone: {},
});