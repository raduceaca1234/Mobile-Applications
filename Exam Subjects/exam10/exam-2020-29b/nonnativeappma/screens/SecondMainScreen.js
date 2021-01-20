import React from "react";
import { Platform } from 'react-native';
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";

import Colors from '../constants/Colors';

const SecondMainScreen = props => {
    const onPress1 = () => {
        props.navigation.navigate('All');
    }

    const onPress2 = () => {
        props.navigation.navigate('Top10Drivers');
    }

    const onPress3 = () => {
        props.navigation.navigate('Top5Cars');
    }

    const onPress4 = () => {
        props.navigation.navigate('PaintList');
    }

    return (
        <View>
            <TouchableOpacity onPress={onPress1} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Top 10 vechicles</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress2} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Top 10 drivers</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress3} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Top 5 vechicles</Text>
            </TouchableOpacity>
        </View>

    )
};

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        justifyContent: "center",
        padding: 16
    },
    appButtonContainer: {
        marginTop: 50,
        elevation: 8,
        backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12
    },
    appButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
})

export default SecondMainScreen;