import React, { useState, useCallback } from 'react';
import { ADD_OPERATION } from '../store/volunteers-actions';
import {
    ScrollView,
    View,
    Button,
    Text,
    TextInput,
    StyleSheet,
    Alert
} from 'react-native';
import { useDispatch } from 'react-redux';
import moment from "moment";

import Colors from '../constants/Colors';
import * as placesActions from '../store/volunteers-actions';
import { fetchVolunteers } from '../constants/api';
import { insertVolunteer } from '../helpers/db';

const Filled = props => {
    const volunteerId = props.navigation.getParam('volunteerId');
    const status = props.navigation.getParam('volunteerStatus');
    const [nameValue, setNameValue] = useState('');
    const [statusValue, setStatusValue] = useState(status);
    const [statusPassengers, setPassengersValue] = useState(0);
    const [statusDriver, setDriverValue] = useState('');
    const [statusPaint, setPaintValue] = useState('');
    const [statusCapacity, setCapacityValue] = useState(0);
    const currentDate = new Date();
    const dispatch = useDispatch();

    const nameChangeHandler = text => {
        // you could add validation
        setNameValue(text);
    };

    const statusHandler = text => {
        // you could add validation
        setStatusValue(text);
    };

    const passengersHandler = text => {
        // you could add validation
        setPassengersValue(text);
    };

    const driverHandler = text => {
        // you could add validation
        setDriverValue(text);
    };

    const paintHandler = text => {
        // you could add validation
        setPaintValue(text);
    };

    const capacityHandler = text => {
        // you could add validation
        setCapacityValue(text);
    };


    const isAvailable = (data) => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 300, 'Request timed out');
        });

        const request = fetch('http://10.0.2.2:2902/change');

        return Promise
            .race([timeout, request])
            .then(response => {
                alert('Action is supported in the server :)')
                fetch("http://10.0.2.2:2902/change", {
                    method: "POST",
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(response => response.json())
                    .then((res) => {
                        alert(res.name + ' was updated')
                        dispatch(placesActions.loadVolunteersFromServer());
                        props.navigation.goBack();
                    }).catch(
                        (err) => {
                            console.log("errorrrrrr: ", err)
                        }
                    );
            })
            .catch(error => {
                Alert.alert(
                    'Action is not supported in the server, only in the local db'
                ),
                    dispatch({ type: ADD_OPERATION, name: "createVolunteer", data: data })
                //dispatch(placesActions.loadVolunteersFromDb())
                props.navigation.goBack()
            });
    }


    const savePlaceHandler = async () => {

        const data = {
           id: volunteerId, status: statusValue, cost: statusPassengers
        }
        isAvailable(data)
        console.log("data: ", data);

    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Status</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={statusHandler}
                    value={statusValue}
                />
                <Text style={styles.label}>Cost</Text>
                <TextInput
                    keyboardType={'numeric'}
                    style={styles.textInput}
                    onChangeText={passengersHandler}
                    value={statusPassengers.toString()}
                />
                <Button
                    title="Save Volunteer"
                    color={Colors.primary}
                    onPress={savePlaceHandler}
                />
            </View>
        </ScrollView>
    );
};

Filled.navigationOptions = {
    headerTitle: 'Add Volunteer'
};

const styles = StyleSheet.create({
    form: {
        margin: 30
    },
    label: {
        fontSize: 18,
        marginBottom: 15
    },
    textInput: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingVertical: 4,
        paddingHorizontal: 2
    }
});

export default Filled;
