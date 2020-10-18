import React, { useState, useCallback } from 'react';
import {
    ScrollView,
    View,
    Button,
    Text,
    TextInput,
    StyleSheet
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as placesActions from '../store/volunteers-actions';

const UpdateScreen = props => {
    const id = props.navigation.getParam('id');
    const name = props.navigation.getParam('name');
    const phoneNumber = props.navigation.getParam('phoneNumber');
    const [nameValue, setNameValue] = useState(name);
    const [phoneNumberValue, setPhoneNumberValue] = useState(phoneNumber);

    const dispatch = useDispatch();

    const nameChangeHandler = text => {
        setNameValue(text);
    };

    const phoneChangeHandler = text => {
        setPhoneNumberValue(text);
    };

    const updateVolunteerHandler = () => {
        dispatch(placesActions.updateVolunteer(id, nameValue, phoneNumberValue));
        props.navigation.navigate('Places');
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
