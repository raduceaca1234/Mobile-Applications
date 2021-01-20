import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import VolunteerItem from '../components/VolunteerItem';
import * as placesActions from '../store/volunteers-actions';
import { fetchVolunteers, deleteVolunteerForm, createVolunteer, updateVolunteerForm } from '../constants/api';

const Top10Vechicles = props => {
    const volunteers = useSelector(state => state.volunteers.bought);
    const operationsQueue = useSelector(state => state.volunteers.operationsQueue);
    const data = volunteers.sort((a, b) => (a.quantity > b.quantity) ? 1 : ((b.quantity > a.quantity) ? -1 : 0));
    const data2 = data.slice(0, 10);
    const dispatch = useDispatch();
    const [state, setState] = useState();

    const isAvailable = (operationsQueue) => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 300, 'Request timed out');
        });
        console.log("Operations queue", operationsQueue);
        const request = fetch('http://10.0.2.2:2020/bought');

        return Promise
            .race([timeout, request])
            .then(response => {
                alert('Its connected :)')
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
                dispatch(placesActions.boughtItem());
            })
            .catch(error => {
                console.log(error)
                alert('Its not connected :(')
                //dispatch(placesActions.deleteOperations())
                dispatch(placesActions.boughtItem());
                //dispatch(placesActions.loadVolunteersFromDb());
            });
    }


    useEffect(() => {
        isAvailable(operationsQueue);
    }, []);

    return (
        <FlatList
            data={data2}
            keyExtractor={(item, index) => {
                return item.id.toString();
            }}
            renderItem={itemData => (
                <VolunteerItem
                    name={itemData.item.name}
                    status={itemData.item.status}
                    passengers={itemData.item.quantity}
                    capacity={itemData.item.price}
                    onSelect={() => {
                        props.navigation.navigate('VolunteerDetail', {
                            volunteerName: itemData.item.name,
                            volunteerId: itemData.item.id,
                            volunteerStatus: itemData.item.status,
                            volunteerPassengers: itemData.item.size,
                            volunteerDriver: itemData.item.location,
                            volunteerCapacity: itemData.item.usage
                        });
                    }}
                />
            )}
        />
    );
};

Top10Vechicles.navigationOptions = navData => {
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

export default Top10Vechicles;
