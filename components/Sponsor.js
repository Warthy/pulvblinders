import React, {useState} from 'react';
import {
    Image, StyleSheet,
    View, Text,
    TouchableOpacity,
} from 'react-native';
import Layout from '../constants/Layout';
import Modal from "./Modal";

import API from '../constants/API';


export default function Sponsor(props) {


    const [modalVisible, toggleModal] = useState(false);
    const {name, description, reduction, media} = props.sponsorInfo;

    return (
        <View style={props.style}>
            <Modal modalVisible={modalVisible} onToggle={() => toggleModal(!modalVisible)}>

                <Image
                    style={styles.image}
                    source={{uri: API.media + media}}
                    resizeMode={'contain'}
                />
                <Text style={styles.name}>{name}</Text>

                <Text style={styles.description}>{description}</Text>

                {reduction &&
                <Text style={styles.reduction}>
                    <Text style={{fontWeight: 'bold'}}>CODE REDUCTION: </Text>
                    {reduction}
                </Text>
                }

            </Modal>

            <TouchableOpacity onPress={() => toggleModal(!modalVisible)}>
                <Image
                    style={styles.imagePreview}
                    source={{uri: API.media + media}}
                />
            </TouchableOpacity>
        </View>
    );

}


const styles = StyleSheet.create({
    imagePreview: {
        resizeMode: 'contain',
        width: (Layout.window.width) / (2.5),
        height: 150
    },
    image: {
        height: '30%',
        alignSelf: 'stretch',
        marginTop: 10
    },
    name: {
        textAlign: 'center',
        fontWeight: 'bold'
    },
    description: {
        marginTop: 50
    },
    reduction: {
        position: 'absolute',
        bottom: 20
    }
});