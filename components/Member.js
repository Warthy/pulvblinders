import React from 'react';
import {
    Image, StyleSheet,
    View, Platform,
} from 'react-native';
import Layout from '../constants/Layout';


export default function Member(props) {
    const {images} = props.memberInfo;

    return (
        <View>
            <Image
                style={styles.imagePreview}
                source={images.preview}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    imagePreview: {
        width: (Layout.window.width) / 2
    },
    imageios: {
        marginTop: -(Layout.window.width / 2),
        width: Layout.window.width / 2,
        height: Layout.window.width / 2,
        borderRadius: (Layout.window.width / 4),
        borderWidth: 5,
        borderColor: '#fff',
    },
    imageandroid: {
        marginTop: -120,
        width: (Layout.window.width) / 2,
        height: (Layout.window.width) / 2,
        borderRadius: (Layout.window.width),
        borderWidth: 5,
        borderColor: '#fff',
    },
    name: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },
    position: {
        marginTop: 0,
        textAlign: 'center',
        textTransform: 'uppercase',
        fontWeight: '300',
        fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
        fontSize: 18,
    }
});