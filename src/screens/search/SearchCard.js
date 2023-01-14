import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

export default function SearchCard(props) {
    const {searchType, contentName} = props;
    // let searchType = 'history';
    let searchTypeIcon;
    switch (searchType) {
        case "history":
            searchTypeIcon = <MaterialCommunityIcons name={"history"} size={30} color={"#660032"}/>;
            break;
        case 'suggested':
            // searchTypeIcon = <Ionicons name={"search-outline"} size={30} color={"#660032"}/>;
            searchTypeIcon = <MaterialCommunityIcons name={"fire"} size={30} color={"#660032"}/>;
            break;
    }

    return (
        <TouchableOpacity style={[styles.content, props.style]}>
            <View style={styles.searchTypeIconContainer}>
                {searchTypeIcon}
            </View>
            <Text style={styles.contentTextStyle}>{contentName}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        marginVertical: 3,
    },
    searchTypeIconContainer: {
        marginRight: 8,
    },
    contentTextStyle: {
        fontSize: 18,
        color: '#660032',
        marginVertical: 4,
    },
});