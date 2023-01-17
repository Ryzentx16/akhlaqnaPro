import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import lostPosts from "../data/lostPosts";
import PostCard from "../Classes/postCard";

function LostPosts({navigation}) {
    let _posts = [];

    for (let i = 0; i < lostPosts.length; i++) {
        let post = lostPosts[i];
        let postImage = post.user.profileImage;
        _posts.push(
            /*<View style={styles.posts}>
                <View style={{flex: 1, backgroundColor: 'white'}}>
                    <Image style={styles.profilePicture} source={postImage}/>
                </View>
                <View style={{flex: 4, backgroundColor: 'white', paddingLeft: 5,}}>
                    <View style={{flexDirection: 'row', marginBottom: 10,}}>
                        <Text style={{color: '#660032'}}>{post.user.name}</Text>
                        <Text style={{
                            marginLeft: 5,
                            color: '#99004b',
                            fontSize: 12,
                            alignSelf: 'center'
                        }}>{Math.floor((Math.random() * 40) + 1)}s</Text>
                        <View style={{flex: 1, alignItems: 'flex-end'}}>
                            <Image style={styles.iconStyle}
                                   source={require('../../assets/icon_lost.png')}/>
                        </View>
                    </View>
                    <View>
                        <View style={{marginBottom: 10}}>
                            <Text style={{color: '#660032'}}>{post.content}</Text>
                        </View>
                    </View>
                    <View style={styles.bottomIcons}>
                        <View style={styles.like}>
                            <Image style={styles.likeIcon} source={require('../../assets/Like.png')}/>
                            <Text style={{marginLeft: 5, color: '#660032'}}>{post.numberOfLikes}</Text>
                        </View>
                        <View style={styles.comment}>
                            <Image style={styles.commentIcon} source={require('../../assets/Comment.png')}/>
                            <Text style={{marginLeft: 5, color: '#660032'}}>{post.numberOfComments}</Text>
                        </View>
                        <View style={styles.share}>
                            <Image style={styles.shareIcon} source={require('../../assets/Share.png')}/>
                            <Text style={{marginLeft: 5, color: '#660032'}}>{post.numberOfShares}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.spaceLine}/>
            </View>*/
            <PostCard post={post} isLost={true}/>
        );
    }

    return (
        <View style={styles.container}>
            <HeaderSection isSearchBar={false} navigation={navigation}/>
            <View style={styles.postsSection}>
                <ScrollView>
                    {_posts}
                    {_posts}
                    {_posts}
                </ScrollView>
            </View>
            <BottomSection navigation={navigation}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    postsSection: {
        flex: 1,
        borderTopWidth: 2,
        borderRadius: 3,
        borderColor: '#660032',

        marginHorizontal: 20,
        marginTop: 80,
        marginBottom: 7,

        paddingHorizontal: 15,
        paddingTop: 4,
        paddingBottom: 5,
    },
    posts: {
        height: 'auto',
        minWidth: '50%',
        // backgroundColor: 'red',

        flexDirection: 'row',

        marginBottom: 20,
        paddingBottom: 20,
    },
    head: {
        flex: 1,
        flexDirection: "row",
        maxHeight: 'auto',

        justifyContent: 'flex-start',
        alignContent: 'space-between',

        // backgroundColor: 'green',

        marginBottom: 10,
    },
    pictureHolder: {
        flex: 1,
        backgroundColor: 'green',
        marginBottom: -4,

        borderRadius: 999,
    },
    profilePicture: {
        position: 'absolute',
        height: 65,
        width: 65,
    },
    nameHolder: {
        flex: 4,
        // backgroundColor: 'green',

        // justifyContent: 'center',
        paddingLeft: 10,
    },
    content: {
        flex: 3,
        backgroundColor: 'yellow',

        // marginBottom: -10,
        marginLeft: 60,
    },
    text: {
        flex: 1,
        backgroundColor: 'green',

        // marginLeft: 83,
    },
    imageHolder: {
        flex: 3,
        // height: 'auto',
        backgroundColor: 'grey',
    },
    bottomIcons: {
        // flex: 1,
        // backgroundColor: 'pink',
        flexDirection: 'row',


        justifyContent: 'space-around',

        marginTop: 10,
    },
    share: {
        flexDirection: 'row',
    },
    comment: {
        flexDirection: 'row',
    },
    like: {
        flexDirection: 'row',
    },
    shareIcon: {
        height: 16 + 10,
        width: 20 + 10,
    },
    commentIcon: {
        height: 16 + 10,
        width: 16 + 10,
    },
    likeIcon: {
        height: 16 + 10,
        width: 20 + 10,
    },
    iconStyle: {
        height: 20,
        width: 20,
    },

    spaceLine: {
        position: 'absolute',
        height: 5,
        width: '75%',
        // backgroundColor: 'red',

        // alignSelf: 'center',
        // justifyContent: 'center',

        borderTopWidth: 2,
        borderRadius: 99,
        borderColor: 'rgba(102,0,50,0.60)',

        marginTop: '-5%',
        marginLeft: '15%',
    }
});

export default LostPosts;
