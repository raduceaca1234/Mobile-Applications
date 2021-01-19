import React, { useEffect, useState } from "react";
import { Platform } from 'react-native';
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useSelector, useDispatch } from 'react-redux';

import * as placesActions from '../store/volunteers-actions';
import Colors from '../constants/Colors';

const ThirdMainScreen = props => {
    const name = useSelector(state => state.volunteers.name);
    const dispatch = useDispatch();
    const onPress1 = () => {
        props.navigation.navigate('RecordDriverName');
    }

    const onPress2 = () => {
        props.navigation.navigate('AllVechicles');
    }

    useEffect(() => {
        dispatch(placesActions.loadName());
    }, []);

    return (    
        <View>
            <Text style={styles.appButtonContainer}>{name}</Text>
            <TouchableOpacity onPress={onPress1} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Record driver name</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress2} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>All vechicles</Text>
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

export default ThirdMainScreen;