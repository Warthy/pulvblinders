import React from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import axios from "axios";
import API from '../constants/API';
import * as WebBrowser from "expo-web-browser";
import Layout from "../constants/Layout";
import * as Permissions from "expo-permissions";
import {Notifications} from "expo";

async function registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    // POST the token to your backend server from where you can retrieve it to send push notifications.
    return fetch(API.endpoints.phone, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token,
        }),
    });
}

export default class HomeScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: 'n',
            sponsors: [],
            isLoading: false,
            notification: null
        };
    }

    componentDidMount() {
        registerForPushNotificationsAsync();
        this.listener = Notifications.addListener(this._handleNotification);
        this._getSponsors();
    }

    _handleNotification = (notification) => {
        this.setState({notification: notification});
    };

    _getSponsors() {
        this.setState({isLoading: true});

        axios.get(API.endpoints.sponsors)
            .then(res => {
                const sponsors = res.data;
                this.setState({
                    sponsors: sponsors || [],
                    isLoading: false,
                });
            })
            .catch(e => {
                console.log(e);
                this.setState({
                    error: e.message,
                    isLoading: false,
                })
            });
    }

    render() {
        let sponsors = this.state.sponsors;
        return (
            <ScrollView>
                <View style={styles.container}>

                {sponsors.map((sponsor, index) => (
                    <View key={index}>
                        <TouchableOpacity onPress={() => _handleOpenWithWebBrowser(sponsor.url)}>
                            <Image
                                style={styles.image}
                                source={{uri: API.media + sponsor.media}}
                            />
                        </TouchableOpacity>
                    </View>
                ))}

                </View>
            </ScrollView>
        );
    }
}

function _handleOpenWithWebBrowser(url) {
    try {
        return url && WebBrowser.openBrowserAsync(url);
    } catch (e) {
        console.log('error');
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: "#fff",
        justifyContent: 'center'
    },
    image: {
        width: (Layout.window.width) / 2 ,
        minHeight: 300
    }
});
