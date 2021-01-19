import React from "react";
import { Platform } from 'react-native';
import { View, Button, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useSelector, useDispatch } from 'react-redux';

import * as placesActions from '../store/volunteers-actions';
import Colors from '../constants/Colors';

const Book = props => {

    const user = useSelector(state => state.volunteers.name);
    const id = props.navigation.getParam('volunteerId');
    console.log(user)
    console.log(id)
    const dispatch = useDispatch();
    const isAvailable = (id, user) => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 300, 'Request timed out');
        });

        const request = fetch('http://10.0.2.2:2502/book');

        return Promise
            .race([timeout, request])
            .then(response => {
                alert('Its connected :)')
                console.log(id)
                console.log(user)
                dispatch(placesActions.bookGames(id, user));
                dispatch(placesActions.loadVolunteersFromServer());
                //dispatch(placesActions.deleteVolunteerDb(id));
                // dispatch(placesActions.loadVolunteersFromServer());
                props.navigation.navigate('Volunteers');
            })
            .catch(error => {
                alert('Its not connected :(')
                console.log(id)
                dispatch(placesActions.loadVolunteersFromServer());
                // dispatch(placesActions.deleteVolunteerDb(id));
                // dispatch({ type: ADD_OPERATION, name: "deleteVolunteerForm", data: { id: id } });
                // dispatch(placesActions.loadVolunteersFromServer());
                props.navigation.navigate('Volunteers');
            });
    }


    const onPress1 = () => {
        isAvailable(id, user)
    }

    

    return (
        <View>
            <TouchableOpacity onPress={onPress1} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Book a game</Text>
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

export default Book;