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
    const phoneNumber = props.navigation.getParam('phoneNumber');
    const date = props.navigation.getParam('date');
    const [nameValue, setNameValue] = useState(name);
    const [phoneNumberValue, setPhoneNumberValue] = useState(phoneNumber);

    const dispatch = useDispatch();

    const nameChangeHandler = text => {
        setNameValue(text);
    };

    const phoneChangeHandler = text => {
        setPhoneNumberValue(text);
    };

    const isReachable = async () => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 5000, 'Request timed out');
        });
        const request = fetch('http://10.0.2.2:5000/volunteers');
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

        const request = fetch('http://10.0.2.2:5000/volunteers');

        return Promise
            .race([timeout, request])
            .then(response => {
                alert('It worked :)')
                fetch("http://10.0.2.2:5000/volunteers", {
                    method: "PUT",
                    cache: 'no-cache',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then((res) => {
                    dispatch(placesActions.loadVolunteersFromDb())
                    props.navigation.navigate('Volunteers');
                }).catch(
                    (err) => console.log(err),
                );
            })
            .catch(error => {
                alert('It timed out :(')
                Alert.alert('Action is not supported in the server, only in the local db'),
                dispatch({ type: ADD_OPERATION, name: "updateVolunteerForm", data: data }),
                dispatch(placesActions.loadVolunteersFromDb()),
                props.navigation.navigate('Volunteers');
            });
    }


    const updateVolunteerHandler = () => {
        console.log("id", id);
        data = { id: id, name: nameValue, phoneNumber: phoneNumberValue, date: date }
        console.log(data);
        updateVolunteerFrom(id, nameValue, phoneNumberValue);
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
                <Text style={styles.label}>Phonenumber</Text>
                <TextInput
                    style={styles.textInput}
                    onChangeText={phoneChangeHandler}
                    value={phoneNumberValue}
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
