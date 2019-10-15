import React from 'react';
import {ScrollView, StyleSheet, View, Text} from 'react-native';
import Member from '../components/Member';
import Members from "../data/Members";

export default function TeamScreen() {
    return (
        <ScrollView style={styles.container}>
            {Members.map((group, indexA) => (
                <View key={indexA} style={{flex: 1, paddingVertical: 10}}>
                    <Text style={styles.pole}>{group.name}</Text>
                    <View style={styles.memberViewer}>
                        {group.members.map((member, indexB) => (
                            <Member key={indexB} memberInfo={member}/>
                        ))}
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pole: {
        textAlign: 'center',
        fontFamily: 'clarendon-condensed',
        fontWeight: undefined,
        fontSize: 25,
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 10,
        color: "#ffffff"
    },
    memberViewer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#000"
    },
});

