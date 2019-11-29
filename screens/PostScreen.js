import React from 'react';
import {
    ScrollView, StyleSheet,
    View, RefreshControl
} from 'react-native';
import { Notifications } from 'expo';
import Articles from '../components/Articles';
import axios from 'axios';
import API from '../constants/API';
import * as Permissions from "expo-permissions";
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

export default class PostScreen extends React.Component {



    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            refreshing: true,
        };
        this.fetchNews = this.fetchNews.bind(this);
    }

    fetchNews() {
        this.setState({
            refreshing: true,
        });
        axios.get(API.endpoints.posts)
            .then(res => {
                const articles = res.data;
                this.setState({
                    articles,
                    refreshing: false,
                });
            })
            .catch(e => {
                console.log(e);
                this.setState({
                    refreshing: false,
                })
            });
    }

    handleRefresh = () => {
        this.setState({
                refreshing: true,
            },
            () => this.fetchNews()
        );
    };

    componentDidMount() {
        registerForPushNotificationsAsync();
        this.listener = Notifications.addListener(this._handleNotification);
        this.fetchNews();
    }

    _handleNotification = (notification) => {
        this.setState({notification: notification});
    };


    render() {
        let articles = this.state.articles;
        return (
            <View style={styles.container}>
                <ScrollView
                    style={styles.container}
                    contentContainerStyle={styles.contentContainer}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.handleRefresh}/>}
                >
                    <View style={styles.container}>
                        {articles.map((article, index) => {
                            return <Articles key={index} articleInfo={article} />
                        })}
                    </View>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    contentContainer: {
        paddingTop: 15,
    }
});
