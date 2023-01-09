import React from 'react';
import {Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';


export default function SearchPage({navigation}){

    return (
        <View style={styles.background}>
            <View style={styles.headerSection}>
                <View>
                    <TouchableOpacity style={styles.iconHolder} onPress={() => this.props.navigation.goBack()}>
                        <Image source={require("../../assets/Icon_arrow_back.png")} style={styles.iconBack}/>
                    </TouchableOpacity>
                </View>
                {/*<View>
                    <Image style={styles.curveLine}
                           source={require('../../assets/circleHeader.png')}
                    />
                </View>*/}
                <View style={styles.logoHolder}>
                    <Image source={require("../../assets/Logo.png")}
                           style={styles.imageLogo}
                    />
                </View>
                <View style={styles.homeIconHolder}>
                    <Image source={require("../../assets/Icon_home.png")}
                           style={styles.homeIcon}
                    />
                </View>
                <View style={styles.searchBar}>
                    <Image style={styles.searchBarIcon}
                           source={require('../../assets/Search-icon.png')}/>
                    <TextInput style={styles.searchBarText}
                               placeholder={'Search Bar'}
                               placeholderTextColor={'#660032'}/>
                    <Image style={styles.filterIcon}
                           source={require('../../assets/Icon_filter.png')}/>
                </View>
            </View>

            <View style={styles.searchSection}>
                <Text style={{fontSize: 36, color: 'red'}}>MISSING LOGIC</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white',
    },

    headerSection: {
        borderColor: 'red',

        marginBottom: 20,
    },
    iconHolder: {
        marginTop: 15,
        marginLeft: 15,
    },
    iconBack: {
        height: 32,
        width: 32,
    },
    curveLine: {
        flex: 1,
        position: 'absolute',
        height: 460,
        width: 800,
        resizeMode: 'stretch',

        alignSelf: 'center',
        marginTop: -350,
        // marginHorizontal: -100,
    },
    circleShape: {
        // position: 'absolute',
        height: 70,
        width: 70,

        borderWidth: 2,
        borderRadius: 99,
        borderColor: 'white',
        overflow: 'hidden',

        marginTop: 20,
        marginLeft: 30,
    },

    myPicture: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },

    logoHolder: {
        // flex: 1,
        height: 75,
        width: 75,
        alignSelf: 'center',

        borderWidth: 3,
        borderColor: '#660032',
        borderRadius: 99,

        marginTop: -40,
        marginLeft: 0,
    },
    imageLogo: {
        height: '85%',
        width: '55%',
        alignSelf: 'center',

        marginTop: 6,
        marginLeft: 4,
        // justifyContent: 'center',
    },

    homeIconHolder: {
        position: 'absolute',

        marginTop: 20,
        marginLeft: 300,
    },
    homeIcon: {
        height: 40,
        width: 36,

    },
    menuIconHolder: {
        position: 'absolute',

        marginTop: 50,
        marginLeft: 360,
    },
    menuIcon: {
        height: 30,
        width: 30,

    },

    searchBar: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: 'white',

        borderWidth: 2,
        borderRadius: 8,
        borderColor: '#660032',


        paddingVertical: 3,
        paddingLeft: 5,
        marginTop: 15,
        marginHorizontal: 25,
    },
    searchBarIcon: {
        height: '100%',
        width: '11%',
    },
    filterIcon: {
        height: '100%',
        width: '11%',

        marginTop: 1,
        marginLeft: '50%',
    },
    searchBarText: {
        marginLeft: 5,
        textAlign: 'left',
    },


    searchSection: {
        flex: 1,
        backgroundColor: 'black',

        justifyContent: 'center',
        alignItems: 'center',

        marginBottom: 20,
        marginHorizontal: 20,
    }

});