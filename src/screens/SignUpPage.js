import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Dimensions, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, I18nManager } from 'react-native';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import DateTimePicker from '@react-native-community/datetimepicker';

const windowHeight = Dimensions.get('window').height;
const isRTL = I18nManager.isRTL;
let firstName = "";
let lastName = "";
let phoneNumber = "";
let birthday = "";
let newPassword = "";
let confirmPassword = "";

export default function SignUpPage({ navigation }) {
    const [birthday, setbirthday] = useState(new Date());
    // console.warn(birthday);
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
        setbirthday(currentDate);
        // const test = new Date(date).getUTCDay();
    };

    const showMode = (currentMode) => {
        if (Platform.OS === 'android') {
            setShow(true);
            // for iOS, add a button that closes the picker
        }
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const onSubmit = () => {
        navigation.navigate("SignUpConfirmation")
        let isFilled = false;
        isFilled = firstName !== "" && lastName !== "" && phoneNumber !== "" && birthday !== "" && newPassword !== "" && confirmPassword !== "";
        // console.warn(isFilled);
        (isFilled) ? navigation.navigate("SignUpConfirmation") : alert("Please Fill Required")
    };

    const onLogin = () => {
        navigation.navigate("LoginPage");
    };

    return (
        <View style={styles.background}>
            <ScrollView alwaysBounceHorizontal={false}
                alwaysBounceVertical={false}
                bounces={false}
                contentContainerStyle={{ flex: 1, minHeight: windowHeight, maxHeight: windowHeight, }}>
                <View style={styles.logoSection}>
                    <View style={styles.logo}>
                        <Image source={require("../../assets/Logo.png")}
                            style={styles.imageLogo} />
                    </View>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Sign Up</Text>
                </View>

                <View style={styles.inputsContainer}>

                    <View style={styles.usernameContainer}>
                        <View style={styles.firstnameContainer}>
                            <View style={styles.firstname}>
                                <TextInput placeholder={"First Name *"}
                                    placeholderTextColor={"rgba(102,0,50,0.75)"}
                                    onChangeText={(text) => {
                                        firstName = text
                                    }}
                                    style={{ textAlign: isRTL ? 'right' : 'left' }} />
                            </View>
                        </View>
                        <View style={styles.lastnameContainer}>
                            <View style={styles.lastname}>
                                <TextInput placeholder={"Last Name *"}
                                    placeholderTextColor={"rgba(102,0,50,0.75)"}
                                    onChangeText={(text) => {
                                        lastName = text
                                    }}
                                    style={{ textAlign: isRTL ? 'right' : 'left' }} />
                            </View>
                        </View>
                    </View>

                    <View style={styles.phonenumberContainer}>
                        <View style={styles.phonenumber}>
                            <TextInput placeholder={"Phone Number (With Country Code) *"}
                                placeholderTextColor={"rgba(102,0,50,0.75)"}
                                onChangeText={(text) => {
                                    phoneNumber = text
                                }}
                                keyboardType={"phone-pad"}
                                style={{ textAlign: isRTL ? 'right' : 'left' }} />
                        </View>
                    </View>

                    <View style={styles.birthdayContainer}>
                        <TouchableOpacity style={styles.birthday} onPress={showDatepicker}>
                            <View style={{ flex: 8 }}>
                                <TextInput placeholder={"DD/MM/YYYY *"}
                                    placeholderTextColor={"rgba(102,0,50,0.75)"}
                                    value={birthday.toLocaleDateString()}
                                    onChange={(text) => {
                                        setbirthday(text)
                                    }}
                                    style={{ textAlign: isRTL ? 'right' : 'left' }} />
                            </View>
                            <View style={styles.birthdayIcon}>
                                <FontAwesome5 name={'calendar-alt'}
                                    size={30}
                                    color={"#660032"} />
                                {show && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        value={date}
                                        mode={mode}
                                        onChange={onChange}
                                    />
                                )}
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.passwordContainer}>
                        <View style={styles.newPasswordContainer}>
                            <TextInput placeholder={"Enter Password *"}
                                placeholderTextColor={"rgba(102,0,50,0.75)"}
                                onChangeText={(text) => {
                                    newPassword = text
                                }}
                                secureTextEntry={true}
                                style={{ textAlign: isRTL ? 'right' : 'left' }}
                            />
                        </View>
                        <View style={styles.confirmPasswordContainer}>
                            <TextInput placeholder={"Confirm Password *"}
                                placeholderTextColor={"rgba(102,0,50,0.75)"}
                                onChangeText={(text) => {
                                    confirmPassword = text
                                }}
                                secureTextEntry={true}
                                style={{ textAlign: isRTL ? 'right' : 'left' }}
                            />
                        </View>
                    </View>

                </View>

                <View style={styles.actionContainer}>
                    <View style={styles.loginContainer}>
                        <TouchableOpacity style={styles.login} onPress={onLogin}>
                            <Text style={{ fontSize: 18, color: '#660032' }}>Log in</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.submitContainer}>
                        <TouchableOpacity style={styles.submit} onPress={onSubmit}>
                            <Text style={{ fontSize: 20, color: 'white' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white',
    },

    logoSection: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',

        // backgroundColor: 'red',
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
        marginLeft: isRTL ? -5 : 5,
    },

    titleContainer: {
        flex: 1,
        // backgroundColor: 'green',

        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 26,
        color: '#660032'
    },

    inputsContainer: {
        flex: 5,
        // backgroundColor: 'blue',

    },
    usernameContainer: {
        flex: 1,
        flexDirection: isRTL ? 'row-reverse' : 'row',
        // backgroundColor: '#578978',
        alignItems: 'flex-end',
        justifyContent: 'center',
        marginBottom: 18,

    },
    firstnameContainer: {
        flex: 1,
        // backgroundColor: "red",

        paddingHorizontal: 20,
    },
    firstname: {
        flex: 1,
        maxHeight: 50,

        borderWidth: 2,
        borderColor: "#660032",
        borderRadius: 50,

        paddingHorizontal: 16,
        padding: 8,
    },
    lastnameContainer: {
        flex: 1,
        maxHeight: 50,

        // backgroundColor: "blue",
        paddingHorizontal: 20,

    },
    lastname: {
        flex: 1,

        borderWidth: 2,
        borderColor: "#660032",
        borderRadius: 50,

        paddingHorizontal: 16,
        padding: 8,
    },
    phonenumberContainer: {
        flex: 1,
        // backgroundColor: "#324234",
        justifyContent: 'center',
        maxHeight: 50,
        marginBottom: 18,

        paddingHorizontal: 20,
    },
    phonenumber: {
        // flex: 1,
        maxHeight: 50,
        minHeight: 50,
        borderWidth: 2,
        borderColor: "#660032",
        borderRadius: 50,
        marginVertical: 10,
        paddingHorizontal: 16,
        padding: 8,
    },
    birthdayContainer: {
        flex: 1,
        flexDirection: isRTL ? 'row-reverse' : 'row',
        // backgroundColor: '#987412',
        maxHeight: 50,
        minHeight: 50,

        // alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,

        paddingHorizontal: 20,
    },
    birthday: {
        flex: 1,
        flexDirection: 'row',
        maxHeight: 50,

        borderWidth: 2,
        borderColor: "#660032",
        borderRadius: 50,

        paddingHorizontal: 16,
        padding: 8,
    },
    birthdayIcon: {
        flex: 1,
        // position: 'absolute',
        // backgroundColor: 'red',

        alignItems: isRTL ? 'flex-start' : 'flex-end',
    },
    btnsContainer: {
        flex: 3,
        // backgroundColor: 'grey',
    },
    createNewPasswordContainer: {
        flex: 1,
        // backgroundColor: 'red',
    },
    createNewPassword: {},
    passwordContainer: {
        flex: 2,
        paddingHorizontal: 20,
    },
    newPasswordContainer: {
        flex: 1,
        maxHeight: 50,

        borderWidth: 2,
        borderColor: "#660032",
        borderRadius: 50,

        paddingHorizontal: 16,
        padding: 8,
        marginBottom: 18,
    },
    confirmPasswordContainer: {
        flex: 1,
        maxHeight: 50,

        borderWidth: 2,
        borderColor: "#660032",
        borderRadius: 50,

        paddingHorizontal: 16,
        padding: 8,
    },


    actionContainer: {
        flex: 1,
        flexDirection: isRTL ? 'row-reverse' : 'row',
        // backgroundColor: 'red',

        justifyContent: 'space-around',
        // paddingBottom: 6,
    },
    loginContainer: {
        // backgroundColor: 'blue',
        // marginBottom: 47,
        maxHeight: 40,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#660032',
        borderWidth: 2,
        borderRadius: 20,
    },
    login: {
        flex: 1,
        alignItems: 'flex-end',

        paddingTop: 2,
        padding: 8,
    },

    submitContainer: {
        backgroundColor: '#660032',
        maxHeight: 40,
        minHeight: 40,
        borderRadius: 20,
    },
    submit: {
        flex: 1,
        alignItems: 'flex-start',

        paddingTop: 3,
        padding: 8,
    }
});