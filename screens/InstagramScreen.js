import React from 'react';
import {WebView} from 'react-native';

export default class SocialNetworksScreen extends React.Component {

    render() {
        return (
            <WebView
                source={{uri: 'https://www.instagram.com/pulvblinders'}}
                style={{}}
            />
        );
    }
}
