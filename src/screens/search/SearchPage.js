import React, {useEffect} from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, I18nManager, TextInput, View } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import SearchCard from "./SearchCard";
import SearchCardData from "./SearchCardData";
import languages from '../../strings/LanguagesController';

const isRTL = I18nManager.isRTL;
// const currLang = languages.currLang();

export default function SearchPage({ navigation }) {
    let currLang = languages.currLang();
    useEffect(() => {
      currLang = languages.currLang();
    });

    return (
        <View style={styles.background}>
            <View style={styles.headerContainer}>
                <View style={styles.searchBarContainer}>
                    <View style={styles.searchIconContainer}>
                        <Ionicons name={"search-outline"} size={35} color={"#660032"} />
                    </View>
                    <View style={styles.searchBar}>
                        <TextInput placeholder={"Search Bar"}
                            placeholderTextColor={"#660032"}
                            onChangeText={(text) => {
                                text === 'exit code 1' ? navigation.navigate("LoginPage") : null
                            }} />
                    </View>
                    <View style={styles.filterContainer}>
                        <FontAwesome5 name={"filter"} size={30} color={"#660032"} />
                    </View>
                </View>
            </View>

            {/* <ScrollView style={styles.searchResultContainer}
                showsVerticalScrollIndicator={false}> */}


            <FlatList ListHeaderComponent={
                <View>
                    <View style={styles.historyContainer}>
                        <Text style={styles.historyTitle}>{currLang.searchPage.history}</Text>
                        <SearchCard contentName={"samsung product"}
                            searchType={"history"} />
                        <SearchCard contentName={"bag"}
                            searchType={"history"} />
                        <SearchCard contentName={"iphone 14"}
                            searchType={"history"} />
                        <SearchCard contentName={"samsung watch"}
                            searchType={"history"} />
                        <SearchCard contentName={"samsung product"}
                            searchType={"history"} />
                        <SearchCard contentName={"bag"}
                            searchType={"history"} />
                        <SearchCard contentName={"iphone 14"}
                            searchType={"history"} />
                        <SearchCard contentName={"samsung watch"}
                            searchType={"history"} />
                    </View>
                    <View style={styles.suggestedContainer}>
                        <Text style={styles.suggestedTitle}>{currLang.searchPage.suggestedforyou}</Text>
                    </View>
                </View>
            }
                style={styles.searchResultContainer}
                data={SearchCardData}
                keyExtractor={(item, index) => index}
                renderItem={(item, index) => {
                    return <SearchCard
                        style={{ paddingLeft: 38 }}
                        key={index}
                        contentName={item.item.name}
                        searchType={'suggested'} />
                }}
                showsVerticalScrollIndicator={false}
                // showsHorizontalScrollIndicator={false}
            />
            {/* </ScrollView> */}

            {/*<BottomSection navigation={navigation} currentFunctionValue={SearchPage}/>*/}
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'white',
    },

    headerContainer: {
        flex: 1,
        marginTop: 8,
        minHeight: 60,
        maxHeight: 60,
        // backgroundColor: 'red'
    },
    iconContainer: {
        flex: 1,
        // backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconBorder: {
        width: 70,
        borderColor: '#660032',
        borderWidth: 1,
        borderRadius: 99,
        alignItems: 'center',
        justifyContent: 'center',

        padding: 6,
    },
    icon: {
        height: '100%',
        // width: 50,
        resizeMode: 'contain'
    },
    searchBarContainer: {
        flex: 1,
        flexDirection: 'row',
        minHeight: 60,
        maxHeight: 60,
        // backgroundColor: 'blue',

        paddingVertical: 7,
        paddingHorizontal: 25,
    },
    searchIconContainer: {
        flex: 1,
        minWidth: 60,
        maxWidth: 60,
        borderColor: "#660032",
        borderWidth: 1,
        borderRightWidth: 0,
        borderTopStartRadius: 99,
        borderBottomStartRadius: 99,
        // backgroundColor: '#280323',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 7,
    },
    searchBar: {
        flex: 1,
        borderColor: "#660032",
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderLeftWidth: 1,
        // backgroundColor: 'red',
        justifyContent: 'center',
        paddingLeft: 8,
    },
    filterContainer: {
        flex: 1,
        minWidth: 60,
        maxWidth: 60,
        borderColor: "#660032",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopEndRadius: 99,
        borderBottomEndRadius: 99,
        // backgroundColor: '#846568',
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 7,
    },

    searchResultContainer: {
        flex: 1,
        // backgroundColor: 'green',

        marginBottom: 20,
        marginHorizontal: 30,
    },
    contentTextStyle: {
        color: '#660032',
        marginVertical: 4,
    },
    historyContainer: {
        // backgroundColor:'red',
        paddingTop: 10,
        padding: 20,
    },
    historyTitle: {
        // backgroundColor: 'red',
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: 24,
        color: '#660032',
        marginBottom: 4
    },
    historyContent: {
        // paddingLeft: 15,
    },

    suggestedContainer: {
        // backgroundColor:'red',
        paddingTop: 10,
        paddingLeft: 20,
    },
    suggestedTitle: {
        alignSelf: 'flex-start',
        fontWeight: 'bold',
        fontSize: 20,
        color: '#660032',
        marginBottom: 4
    },
});