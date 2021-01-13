import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import VolunteerItem from '../components/VolunteerItem';
import * as placesActions from '../store/volunteers-actions';
import { fetchVolunteers, deleteVolunteerForm, createVolunteer, updateVolunteerForm } from '../constants/api';

const VolunteersListScreen = props => {
    const volunteers = useSelector(state => state.volunteers.volunteers);
    const operationsQueue = useSelector(state => state.volunteers.operationsQueue);
    const dispatch = useDispatch();

    const isAvailable = (operationsQueue) => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 300, 'Request timed out');
        });
        console.log("Operations queue", operationsQueue);
        const request = fetch('http://10.0.2.2:5000/volunteers');

        return Promise
            .race([timeout, request])
            .then(response => {
                alert('It worked :)')
                for (let op in operationsQueue) {
                    if (op.name === "createVolunteer") {
                        console.log(op.data)
                        createVolunteer(op.data)
                    }
                    else if (op.name === "deleteVolunteerForm")
                        deleteVolunteerForm(op.data)
                    else if (op.name === "updateVolunteerForm")
                        updateVolunteerForm(op.data)
                }
                dispatch(placesActions.deleteOperations())
                dispatch(placesActions.loadVolunteersFromDb());
            })
            .catch(error => {
                console.log(error)
                alert('It timed out :(')
                //dispatch(placesActions.deleteOperations())
                dispatch(placesActions.loadVolunteersFromServer());
                dispatch(placesActions.loadVolunteersFromDb());
            });
    }


    useEffect(() => {
        // if (isAvailable == true) {

        //     for (op in operationsQueue) {
        //         if (op.name === "createVolunteer") {
        //             console.log(op.data)
        //             createVolunteer(op.data)
        //         }
        //         else if (op.name === "deleteVolunteerForm")
        //             deleteVolunteerForm(op.data)
        //         else if (op.name === "updateVolunteerForm")
        //             updateVolunteerForm(op.data)
        //     }
        //     dispatch(placesActions.deleteOperations())
        //     dispatch(placesActions.loadVolunteersFromDb());
        // }
        // else {
        //     dispatch(placesActions.deleteOperations())
        //     dispatch(placesActions.loadVolunteersFromServer());
        //     dispatch(placesActions.loadVolunteersFromDb());
        // }
        isAvailable(operationsQueue);

    }, []);

    console.log(volunteers)

    return (
        <FlatList
            data={volunteers}
            keyExtractor={(item, index) => {
                return item.id;
            }}
            renderItem={itemData => (
                <VolunteerItem
                    name={itemData.item.name}
                    phoneNumber={itemData.item.phoneNumber}
                    date={itemData.item.date}
                    onSelect={() => {
                        props.navigation.navigate('VolunteerDetail', {
                            volunteerName: itemData.item.name,
                            volunteerId: itemData.item.id,
                            volunteerPhoneNumber: itemData.item.phoneNumber,
                            volunteerDate: itemData.item.date
                        });
                    }}
                />
            )}
        />
    );
};

VolunteersListScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Volunteers',
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Add Volunteer"
                    iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
                    onPress={() => {
                        navData.navigation.navigate('NewVolunteer');
                    }}
                />
            </HeaderButtons>
        )
    };
};

const styles = StyleSheet.create({});

export default VolunteersListScreen;
