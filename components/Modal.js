import React from 'react';
import {
    Modal as ReactModal,
    StyleSheet,
    TouchableOpacity,
    View, Text, Platform,
    TouchableWithoutFeedback,
} from 'react-native';
import Colors from '../constants/Colors'

export default function Modal(props) {
    return (
        <ReactModal
            animationType="fade"
            transparent={true}
            visible={props.modalVisible}
        >
            <TouchableOpacity style={styles.hidden} onPressOut={props.onToggle}>
                <View style={{...styles.modal, ...props.style}}>
                    <TouchableWithoutFeedback style={{flex: 1}}>
                        <View style={styles.children}>
                            {props.children}
                            <TouchableOpacity onPress={props.onToggle} style={styles.closeButton}>
                                <Text style={styles.close}>Retour</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableOpacity>
        </ReactModal>
    );
}

const styles = StyleSheet.create({
    hidden: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(52, 52, 52, 0.6)'
    },
    modal: {
        flex: 0,
        borderRadius: 10,
        width: '80%',
        minHeight: 360,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 70,
        paddingHorizontal: 10,
        paddingBottom: 10,
        backgroundColor: '#fff'
    },
    children: {
        minHeight: 360,
        alignSelf: 'stretch',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        marginBottom: 20
    },
    closeButton: {
        flex: 1,
        minHeight: 30,
        justifyContent: 'flex-end',
    },
    close: {
        textAlign: 'center',
        color: Colors.second,
        textTransform: 'uppercase',
        fontWeight: '300',
        fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
        fontSize: 18,
    },
});