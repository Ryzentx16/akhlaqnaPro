import React from 'react';
import { FlatList, Image, SafeAreaView, StyleSheet, I18nManager, Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import UserAvatar from "@muhzi/react-native-user-avatar";
import posts from "../../data/posts";
import PostCard from "../../screens/post/PostCard";

const isRTL = I18nManager.isRTL;

export default function PersonProfile({ route }) {
    console.log(route);
    const ourUser = route.params?.user;
    console.log(ourUser);
    const isUserMe = ourUser.id === 'u1' ? true : false;
    let x = [];

    for (let i = 0; i < posts.length; i++) {
        if (posts[i].user.id === ourUser.id) {
            x.push(posts[i]);
            x.push(posts[i]);
            x.push(posts[i]);
        }
    }

    // console.warn(route.params.user);

    return (
        <View style={styles.container}>
            <FlatList
                style={styles.postsContainer}
                ListHeaderComponent={
                    <View style={headerStyles.headContaienr}>
                        <View style={headerStyles.head}>
                            <View style={headerStyles.profileContainer}>
                                <View style={styles.imageContainer}>
                                    <UserAvatar
                                        src={ourUser.profileImage}
                                        userName={"Jhon"}
                                        size={80} />
                                </View>
                                <View style={headerStyles.detailsContaienr}>
                                    <Text style={headerStyles.name}>
                                        {ourUser.name}
                                    </Text>
                                    <MaterialCommunityIcons
                                        name={"dots-vertical"}
                                        color={"#660032"}
                                        size={50}
                                    />
                                </View>
                            </View>
                            <View style={headerStyles.actionContaienr}>
                                {(!isUserMe) ? (
                                    <>
                                        <TouchableOpacity style={headerStyles.btnStyle}>
                                            <View style={headerStyles.messageButton}>
                                                <Text style={headerStyles.messageText}>Message</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={headerStyles.btnStyle}>
                                            <View style={headerStyles.lostAndFoundButton}>
                                                <Text style={headerStyles.lostAndFoundText}>Lost & Found</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </>)
                                    :
                                    (<TouchableOpacity style={headerStyles.myBtnStyle}>
                                        <View style={headerStyles.editProfileButton}>
                                            <Text style={headerStyles.editProfileText}>Edit Profile</Text>
                                        </View>
                                    </TouchableOpacity>)}
                            </View>
                        </View>
                    </View>
                }
                data={x}
                keyExtractor={(item, index) => index}
                renderItem={(item, index) => {
                    return <PostCard post={item.item}
                        key={index}
                    />;
                }}
            />
        </View>
    );
}

const headerStyles = StyleSheet.create({
    headContaienr: {
        flex: 1,
        maxHeight: 170,
        minHeight: 170,
        backgroundColor: 'white',
    },
    head: {
        flex: 4,
        borderTopWidth: 3,
        borderBottomWidth: 3,
        borderColor: "#660032"
    },
    profileContainer: {
        flex: 5,
        flexDirection: 'row',
        // backgroundColor:'red'
    },
    detailsContaienr: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
    },
    name: {
        fontSize: 24,
        color: '#660032',
        marginTop: 10
    },

    actionContaienr: {
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    btnStyle: {
        flex: 1,
        maxWidth: 170,
        minWidth: 170,
    },
    myBtnStyle: {
        flex: 1,
        maxWidth: 170,
        minWidth: 170,
    },
    editProfileButton: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 99,
        borderWidth: 1,
        maxHeight: 30,
        minHeight: 30,
        borderColor: '#660032',
        alignItems: 'center',
        // paddingLeft: isRTL ? -20 : 10,
        paddingTop: 3
    },
    editProfileText: {
        // marginLeft: 30,
        color: '#660032',
        fontSize: 16
    },
    messageButton: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 99,
        borderWidth: 1,
        maxHeight: 40,
        minHeight: 40,
        borderColor: '#660032',
        alignItems: 'center',
        // paddingLeft: isRTL ? -20 : 10,
        paddingTop: 5
    },
    messageText: {
        // marginLeft: 30,
        color: '#660032',
        fontSize: 20
    },
    lostAndFoundButton: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 99,
        borderWidth: 1,
        borderColor: '#660032',
        maxHeight: 40,
        alignItems: 'center',
        paddingTop: 8
    },
    lostAndFoundText: {
        // marginLeft: 30,
        color: '#660032',
        fontSize: 16
    }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    iconImageBackContainer: {
        flex: 1,
        // backgroundColor: 'grey',
        maxWidth: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        // backgroundColor: 'green',
    },
    postsContainer: {
        flex: 4,
        paddingBottom: 10,
        // paddingTop: 5,
        backgroundColor: "#CCCCCC",
    }

});
