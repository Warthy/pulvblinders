import React from 'react';
import {Image, ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import axios from "axios";
import API from '../constants/API';
import * as WebBrowser from "expo-web-browser";
import Layout from "../constants/Layout";
import {Notifications} from "expo";



export default class SponsorScreen extends React.Component {

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
        this._getSponsors();
    }

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
                                defaultSource={require('../assets/images/loading.gif')}
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
