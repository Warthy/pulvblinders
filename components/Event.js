import React, {useState} from 'react';
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity, Modal, Platform, ScrollView} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import API from '../constants/API';
import moment from 'moment';
import Colors from "../constants/Colors";


export default function Event(props) {
    const [modalVisible, toggleModal] = useState(false);
    const {startsAt, endsAt, location, title, media, description, date} = props.eventInfo
        , dateFormat = moment(date).format("DD/MM/YYYY"),
        [hours, minutes] = (endsAt || startsAt).split(':');

    return (
        <View style={{...styles.member, ...{opacity: moment(date).hours(hours).minutes(minutes).isAfter() ? 1 : 0.4}}}>
            <Modal animationType="fade" visible={modalVisible} style={styles.modal}>
                <ScrollView style={{flex: 9, backgroundColor: "#444"}}>
                    <TouchableOpacity onPress={() => toggleModal(!modalVisible)}
                                      style={{flex: 1, flexDirection: 'row-reverse', margin: 5}}>
                        <MaterialIcons name="close" size={20} color={Colors.tintColor}/>
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>{title.toUpperCase()}</Text>
                    <Text style={styles.modalLocation}>{location}</Text>


                    <View style={{marginTop: 40, alignSelf: 'stretch'}}>
                        <Text style={styles.modalSection}> Description : </Text>
                        <Text style={{textAlign: 'center', color: "#fff"}}>{description}</Text>
                    </View>

                    <View style={{marginTop: 20, alignSelf: 'stretch'}}>
                        <Text style={styles.modalSection}> Date : </Text>
                        <Text style={styles.modalDate}>
                            {dateFormat} - {endsAt ? startsAt + ' - ' + endsAt : startsAt}
                        </Text>
                    </View>
                </ScrollView>
                <View style={{flex: 1, backgroundColor: "#444"}}>
                    <TouchableOpacity onPress={() => toggleModal(!modalVisible)} style={styles.closeButton}>
                        <Text style={styles.close}>Retour</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <TouchableOpacity onPress={() => toggleModal(!modalVisible)}>
                <ImageBackground source={{uri: API.media + media}} style={styles.upperPart}>
                    <Text style={styles.title}>{title.toUpperCase()}</Text>
                </ImageBackground>
                <View style={styles.lowerPart}>
                    <Text style={styles.location}>
                        <MaterialIcons name="location-on" size={12} color="#c6c6c6"/>
                        {location}
                    </Text>
                    <Text style={styles.time}>
                        <MaterialIcons name="access-time" size={12} color="#c6c6c6"/>
                        {endsAt ? startsAt + ' - ' + endsAt : startsAt}
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: "#fff",
        justifyContent: "space-between"
    },
    member: {
        height: 125,
        flex: 1,
        flexDirection: 'column',
        margin: 5,
    },
    upperPart: {
        height: 100,
        width: '100%',
        elevation: 4,
        borderColor: '#c6c6c6',
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
        fontSize: 18,
        textShadowColor: '#00000f',
        textShadowOffset: {width: 3, height: 3},
        textShadowRadius: 3
    },
    lowerPart: {
        paddingHorizontal: 3,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 25,
        width: '100%',
        elevation: 4,
        borderColor: '#c6c6c6',
        backgroundColor: '#fff',
    },
    location: {
        fontSize: 12,
        color: "#c6c6c6",
        textAlign: 'left',
    },
    time: {
        fontSize: 12,
        color: "#c6c6c6",
        textAlign: 'right',
    },
    modalTitle: {
        marginVertical: 10,
        color: "#fff",
        textAlign: 'center',
        fontFamily: 'clarendon-condensed',
        fontSize: 20,
    },
    modalSection: {
        textAlign: 'left',
        fontSize: 15,
        color: "#fff",
        fontWeight: 'bold',
    },
    modalDate: {
        textAlign: 'center',
        fontSize: 15,
        color: "#fff",
    },
    modalLocation: {
        marginTop: -13,
        color: "#fff",
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
    },
    closeButton: {
        marginVertical: 20,
        flex: 1,
        minHeight: 30,
        justifyContent: 'flex-end',
    },
    close: {
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        fontFamily: Platform.OS === 'android' ? 'sans-serif-light' : undefined,
        fontSize: 18,
    },
});
