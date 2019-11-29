import React from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from 'react-native';
import axios from "axios";
import API from '../constants/API';
import * as WebBrowser from "expo-web-browser";
import Layout from "../constants/Layout";


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
                    imagesLoaded: Array(sponsors.length).fill(false),
                    isLoading: false,
                    time: Date.now()
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

    _onLoad = (index) => {
        const {imagesLoaded} = this.state;
        imagesLoaded[index] = true;
        this.setState(() => ({imagesLoaded: imagesLoaded}))
    };


    render() {
        const {sponsors, imagesLoaded, time} = this.state;
        return (
            <ScrollView style={{backgroundColor: "#000"}}>
                <View style={styles.container}>
                    {sponsors.map((sponsor, index) => (
                        <View style={styles.imageView} key={index}>
                            <TouchableOpacity style={{flex: 1, justifyContent: 'center',}}  onPress={() => _handleOpenWithWebBrowser(sponsor.url)}>
                                <Image
                                    style={{flex: 1}}
                                    source={{uri: API.media + sponsor.media}}
                                    onLoad={() => this._onLoad(index)}
                                />
                                {!imagesLoaded[index] && time+ 800 < Date.now() && <ActivityIndicator size="large" color={"#c6c6c6"}/>}
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
        backgroundColor: "#000",
        justifyContent: 'center'
    },
    imageView: {
        width: (Layout.window.width) / 2,
        minHeight: 300
    }
});
