import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import HeaderSection from "../Classes/headerSection";
import {SvgXml} from "react-native-svg";

export default function AccountPage() {
    return (
        <View style={styles.container}>
            <HeaderSection isHome={false} isMenu={true} style={{paddingBottom: 50}}/>

            <View style={{flex: 1, paddingHorizontal: 42, marginTop: 9,}}>
                <View style={{flex: 1, alignItems: 'center'}}>
                    <SvgXml
                        xml={'<svg xmlns="http://www.w3.org/2000/svg" width="52.108" height="52.108" viewBox="0 0 52.108 52.108">\n' +
                            '                        <path id="Icon_material-account-circle" data-name="Icon material-account-circle" d="M29.054,3A26.054,26.054,0,1,0,55.108,29.054,26.063,26.063,0,0,0,29.054,3Zm0,7.816a7.816,7.816,0,1,1-7.816,7.816A7.806,7.806,0,0,1,29.054,10.816Zm0,37a18.76,18.76,0,0,1-15.632-8.389C13.5,34.239,23.843,31.4,29.054,31.4c5.185,0,15.554,2.84,15.632,8.025a18.76,18.76,0,0,1-15.632,8.389Z" transform="translate(-3 -3)" fill="#660032"/>\n' +
                            '                    </svg>'} width="100%"/>
                    <Text style={{fontSize: 36, color: '#660032'}}>Account</Text>
                </View>
                <View style={{flex: 2,}}>
                    <View style={{flex: 1, justifyContent: 'flex-end', marginBottom: 18}}>
                        <TouchableOpacity style={{flex: 1, flexDirection: 'row',alignItems: 'center', maxHeight: 60}}>
                            <View style={{flex: 1}}>
                                <SvgXml xml={'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="25.714" viewBox="0 0 20 25.714">\n' +
                                    '  <path id="Icon_material-delete" data-name="Icon material-delete" d="M8.929,27.357a2.866,2.866,0,0,0,2.857,2.857H23.214a2.866,2.866,0,0,0,2.857-2.857V10.214H8.929ZM27.5,5.929h-5L21.071,4.5H13.929L12.5,5.929h-5V8.786h20Z" transform="translate(-7.5 -4.5)" fill="#660032"/>\n' +
                                    '</svg>'} width="100%" />
                            </View>
                            <View style={{flex: 5}}>
                                <Text style={{fontSize: 20, color: '#660032'}}>Delete my account</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={{flex: 1, justifyContent: 'flex-start'}}>
                        <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'center', maxHeight: 60}}>
                            <View style={{flex: 1}}>
                                <SvgXml xml={'<svg xmlns="http://www.w3.org/2000/svg" width="20" height="26.001" viewBox="0 0 20 26.001">\n' +
                                    '  <path id="Icon_ionic-ios-lock" data-name="Icon ionic-ios-lock" d="M21.25,10.875h-1.5V7.956a6,6,0,1,0-12-.081v3H6.25a2.507,2.507,0,0,0-2.5,2.5v12a2.507,2.507,0,0,0,2.5,2.5h15a2.507,2.507,0,0,0,2.5-2.5v-12A2.507,2.507,0,0,0,21.25,10.875Zm-6.625,7.8v4.3a.9.9,0,0,1-.831.9A.876.876,0,0,1,12.875,23V18.675a2,2,0,1,1,1.75,0ZM18,10.875H9.5v-3a4.25,4.25,0,0,1,8.5,0Z" transform="translate(-3.75 -1.875)" fill="#660032"/>\n' +
                                    '</svg>'} width="100%" />
                            </View>
                            <View style={{flex: 5}}>
                                <Text style={{fontSize: 20, color: '#660032'}}>Change my password</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',

        paddingBottom: '72%',
    },
});
