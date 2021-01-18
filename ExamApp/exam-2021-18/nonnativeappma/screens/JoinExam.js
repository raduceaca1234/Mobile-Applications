import React, { useEffect, useState } from "react";
import { Platform } from 'react-native';
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useSelector, useDispatch } from 'react-redux';

import { joinExam } from '../constants/api';
import * as placesActions from '../store/volunteers-actions';
import Colors from '../constants/Colors';

const JoinExam = props => {
    const volunteerId = props.navigation.getParam('volunteerId');
    const onPress1 = () => {
        isAvailable(volunteerId)
    }

    const dispatch = useDispatch();

    const isAvailable = (id) => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 300, 'Request timed out');
        });

        const request = fetch('http://10.0.2.2:2018/join');

        return Promise
            .race([timeout, request])
            .then(response => {
                alert('Its connected :)')
                dispatch(placesActions.joinExams(id));
                dispatch(placesActions.loadDrafts());
                //dispatch(placesActions.deleteVolunteerDb(id));
                // dispatch(placesActions.loadVolunteersFromServer());
                props.navigation.navigate('Exams');
            })
            .catch(error => {
                alert('Its not connected :(')
                console.log(id)
                // dispatch(placesActions.deleteVolunteerDb(id));
                // dispatch({ type: ADD_OPERATION, name: "deleteVolunteerForm", data: { id: id } });
                // dispatch(placesActions.loadVolunteersFromServer());
                props.navigation.navigate('Exams');
            });
    }


    return (
        <View>
            <TouchableOpacity onPress={onPress1} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Join Exam</Text>
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

export default JoinExam;