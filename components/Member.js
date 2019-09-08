import React, { useState } from 'react';
import {
    Image, StyleSheet,
    View, Text,
    TouchableOpacity,
    Platform,
} from 'react-native';
import Layout from '../constants/Layout';
import Modal from "./Modal";


export default function Member(props) {
    const [modalVisible, toggleModal] = useState(false);
    const {name, position, description, images} = props.memberInfo;

    return (
        <View>
            <Modal modalVisible={modalVisible} onToggle={() => toggleModal(!modalVisible)} style={styles.modal}>
                <Image
                    style={Platform.OS === 'ios' ? styles.imageios : styles.imageandroid}
                    source={images.modal}
                />

                <Text style={styles.name}>{name}</Text>
                <Text style={styles.position}>{position.toUpperCase()}</Text>

                <Text style={styles.description}>{description}</Text>
            </Modal>

            <TouchableOpacity onPress={() => toggleModal(!modalVisible)}>
                <Image
                    style={styles.imagePreview}
                    source={images.preview}
                />
            </TouchableOpacity>
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
    },
    description: {
        textAlign: 'center',
        marginTop: 10,
        fontSize: 12
    }
});