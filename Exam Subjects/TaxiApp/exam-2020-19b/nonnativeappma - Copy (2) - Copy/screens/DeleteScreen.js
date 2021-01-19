import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';
import { useDispatch } from 'react-redux';

import { ADD_OPERATION } from '../store/volunteers-actions';
import Colors from '../constants/Colors';
import * as placesActions from '../store/volunteers-actions';

const DeleteScreen = props => {
    const id = props.navigation.getParam('id');
    const name = props.navigation.getParam('name');
    const dispatch = useDispatch();

    const isAvailable = (id) => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 300, 'Request timed out');
        });

        const request = fetch('http://10.0.2.2:2019/vehicle/' + id);

        return Promise
            .race([timeout, request])
            .then(response => {
                alert('Its connected :)')
                dispatch(placesActions.deleteVolunteer(id));
                dispatch(placesActions.deleteVolunteerDb(id));
                dispatch(placesActions.loadVolunteersFromServer());
                props.navigation.navigate('FilteredVechicles');
            })
            .catch(error => {
                alert('Its not connected :(')
                console.log(id)
                dispatch(placesActions.deleteVolunteerDb(id));
                dispatch({ type: ADD_OPERATION, name: "deleteVolunteerForm", data: { id: id } });
                dispatch(placesActions.loadVolunteersFromServer());
                props.navigation.navigate('FilteredVechicles');
            });
    }

    return (
        <ScrollView>
            <Text style={styles.name}>Name: {name}</Text>
            <Text style={styles.question}>Are you sure you want to delete this volunteer?</Text>
            <View style={styles.actions}>
                <Button
                    color={Colors.primary}
                    title="DELETE"
                    onPress={() => {

                        isAvailable(id);
                    }}
                />
            </View>
        </ScrollView>
    );
};

export const screenOptions = () => {
    return {
        headerTitle: 'Delete Screen'
    };
};

const styles = StyleSheet.create({
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    name: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 10,
    },
    phoneNumber: {
        fontSize: 18,
        textAlign: 'center',
        marginHorizontal: 20
    },
    question: {
        fontSize: 15,
        textAlign: 'center',
        marginTop: 30
    }
});

export default DeleteScreen;
