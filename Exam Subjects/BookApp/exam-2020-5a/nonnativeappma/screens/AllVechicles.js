import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import VolunteerItem from '../components/VolunteerItem';
import * as placesActions from '../store/volunteers-actions';
import { fetchVolunteers, deleteVolunteerForm, createVolunteer, updateVolunteerForm } from '../constants/api';

const AllVechicles = props => {
    const volunteers = useSelector(state => state.volunteers.mine);
    console.log(volunteers.length)
    const driver = useSelector(state => state.volunteers.name);
    console.log(driver)
    const operationsQueue = useSelector(state => state.volunteers.operationsQueue);
    const dispatch = useDispatch();
    const [state, setState] = useState();

    const isAvailable = (operationsQueue) => {
        const timeout = new Promise((resolve, reject) => {
            setTimeout(reject, 300, 'Request timed out');
        });
        const request = fetch('http://10.0.2.2:2501/books/' + driver);

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
                dispatch(placesActions.loadMe(driver));
                //dispatch(placesActions.loadVolunteersFromDb());
            })
            .catch(error => {
                console.log(error)
                alert('Its not connected :(')
                //dispatch(placesActions.deleteOperations())
                dispatch(placesActions.loadMe(driver));
                //dispatch(placesActions.loadVolunteersFromDb());
            });
    }


    useEffect(() => {
        isAvailable(operationsQueue);
    }, []);


    return (
        <FlatList
            data={volunteers}
            keyExtractor={(item, index) => {
                return item.id.toString();
            }}
            renderItem={itemData => (
                <VolunteerItem
                    name={itemData.item.title}
                    status={itemData.item.status}
                    passengers={itemData.item.pages}
                    driver={itemData.item.student}
                    capacity={itemData.item.usedCount}
                    onSelect={() => {
                        props.navigation.navigate('VolunteerDetail', {
                            volunteerName: itemData.item.name,
                            volunteerId: itemData.item.identifier,
                            volunteerStatus: itemData.item.status,
                            volunteerPassengers: itemData.item.passengers,
                            volunteerDriver: itemData.item.driver,
                            volunteerPaint: itemData.item.paint,
                            volunteerCapacity: itemData.item.capacity
                        });
                    }}
                />
            )}
        />
    );
};

AllVechicles.navigationOptions = navData => {
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

export default AllVechicles;
