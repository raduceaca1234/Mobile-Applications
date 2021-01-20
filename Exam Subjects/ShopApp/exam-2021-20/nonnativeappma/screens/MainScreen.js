import React from "react";
import { Platform } from 'react-native';
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";

import Colors from '../constants/Colors';

const MainScreen = props => {
    const onPress1 = () => {
        props.navigation.navigate('Volunteers');
    }

    const onPress2 = () => {
        props.navigation.navigate('DesiredOrNeeded');
    }

    const onPress3 = () => {
        props.navigation.navigate('SecondMainScreen');
    }

    const onPress4 = () => {
        props.navigation.navigate('ThirdMainScreen');
    }

    return (
        <View>
            <TouchableOpacity onPress={onPress1} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Registration Section</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress2} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Desired Or Needed</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress3} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Reports Section</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress4} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Driver Section</Text>
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

export default MainScreen;