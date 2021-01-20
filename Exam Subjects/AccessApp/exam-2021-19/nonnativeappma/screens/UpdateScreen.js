import React, { useState, useCallback } from 'react';
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

import Colors from '../constants/Colors';
import * as placesActions from '../store/volunteers-actions';
import { ADD_OPERATION } from '../store/volunteers-actions';
import { updateVolunteerFrom } from '../helpers/db';

const UpdateScreen = props => {
    const id = props.navigation.getParam('id');
    const name = props.navigation.getParam('name');
    const level = props.navigation.getParam('level');
    const status = props.navigation.getParam('status');
    const from = props.navigation.getParam('from');
    const to = props.navigation.getParam('to')
    const [nameValue, setNameValue] = useState(name);
    const [statusValue, setStatusValue] = useState(status);
    const [statusPassengers, setPassengersValue] = useState(from);
    const [statusDriver, setDriverValue] = useState(level);
    const [statusPaint, setPaintValue] = useState('');
    const [statusCapacity, setCapacityValue] = useState(to);
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

    const isReachable = async () => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 5000, 'Request timed out');
        });
        const request = fetch('http://10.0.2.2:2019/update');
        try {
            const response = await Promise
                .race([timeout, request]);
            return true;
        }
        catch (error) {
            return false;
        }
    }

    const isAvailable = (data) => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 300, 'Request timed out');
        });

        const request = fetch('http://10.0.2.2:2019/update');

        return Promise
            .race([timeout, request])
            .then(response => {
                alert('It worked :)')
                fetch("http://10.0.2.2:2019/update", {
                    method: "POST",
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then((res) => {
                    dispatch(placesActions.loadVolunteersFromServer())
                    props.navigation.navigate('Volunteers');
                }).catch(
                    (err) => console.log(err),
                );
            })
            .catch(error => {
                alert('It timed out :(')
                Alert.alert('Action is not supported in the server, only in the local db'),
                    //dispatch({ type: ADD_OPERATION, name: "updateVolunteerForm", data: data }),
                    dispatch(placesActions.loadVolunteersFromServer()),
                    props.navigation.navigate('Volunteers');
            });
    }


    const updateVolunteerHandler = () => {
        console.log("id", id);
        const data = {
            id: id, name: nameValue, level: statusDriver, status: statusValue, from: statusPassengers, to: statusCapacity
        }
        isAvailable(data);  
    };

    return (
        <ScrollView>
            <View style={styles.form}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={nameChangeHandler}
                    value={nameValue}
                />
                <Text style={styles.label}>Level</Text>
                <TextInput
                    keyboardType={'numeric'}
                    style={styles.textInput}
                    onChangeText={driverHandler}
                    value={statusDriver.toString()}
                />
                <Text style={styles.label}>Status</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={statusHandler}
                    value={statusValue}
                />
                <Text style={styles.label}>From</Text>
                <TextInput
                    keyboardType={'numeric'}
                    style={styles.textInput}
                    onChangeText={passengersHandler}
                    value={statusPassengers.toString()}
                />
                <Text style={styles.label}>To</Text>
                <TextInput
                    keyboardType={'numeric'}
                    style={styles.textInput}
                    onChangeText={capacityHandler}
                    value={statusCapacity.toString()}
                />
                <Button
                    title="Save Volunteer"
                    color={Colors.primary}
                    onPress={updateVolunteerHandler}
                />
            </View>
        </ScrollView>
    );
};

UpdateScreen.navigationOptions = {
    headerTitle: 'Update Volunteer'
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

export default UpdateScreen;
